const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "cuentaBancoMovimiento") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "getAllByKeyCuentaBanco":
                getAllByKeyCuentaBanco(state, action);
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
        if (action.key_cuenta_banco) {
            Object.keys(action.data).map((key) => {
                var obj = action.data[key];
                if (!state.data[obj.key_cuenta_banco]) {
                    state.data[obj.key_cuenta_banco] = {};
                }
                state.data[obj.key_cuenta_banco][obj.key] = obj;
            });

        }

    }
}
const getAllByKeyCuentaBanco = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.key_cuenta_banco) {
            state.data[action.key_cuenta_banco] = action.data;
        }

    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.data.key_cuenta_banco]) {
            state.data[action.data.key_cuenta_banco][action.data.key] = action.data;
        }
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.data.key_cuenta_banco]) {
            state.data[action.data.key_cuenta_banco][action.data.key] = action.data;
        }
    }
}
