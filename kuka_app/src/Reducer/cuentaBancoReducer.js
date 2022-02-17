const initialState = {
    estado: "Not Found",
    data: {},
    dataAll: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "cuentaBanco") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "getAllByKeyBanco":
                getAllByKeyBanco(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
                break;

        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.dataAll = action.data;
        if (action.key_banco && !state.data[action.key_banco]) {
            state.data[action.key_banco] = {};
        }
        Object.keys(action.data).map((key) => {
            var obj = action.data[key];
            if (!state.data[obj.key_banco]) {
                state.data[obj.key_banco] = {};
            }
            state.data[obj.key_banco][obj.key] = obj;
        });

    }
}
const getAllByKeyBanco = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.key_banco) {
            state.data[action.key_banco] = action.data;
        }

    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.data.key_banco]) {
            state.data[action.data.key_banco][action.data.key] = action.data;
        }
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.data.key_banco]) {
            state.data[action.data.key_banco][action.data.key] = action.data;
        }
    }
}
