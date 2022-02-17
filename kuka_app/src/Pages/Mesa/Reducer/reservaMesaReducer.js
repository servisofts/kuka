
const initialState = {
    estado: "",
    data: false
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "reservaMesa") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "ingreso":
                ingreso(state, action);
                break;
        }
        state.type = action.type;
        state.estado = action.estado;
        if (action.estado == "error") {
            state.error = action.error;
        }
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            if (state.data[action.key_tipo_mesa]) {
                state.data[action.key_tipo_mesa][action.data.key] = action.data;
            }
        }

    }
}
const editar = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            if (state.data[action.key_tipo_mesa]) {
                if (action.data.estado == 0) {
                    if (state.data[action.key_tipo_mesa][action.data.key]) {
                        delete state.data[action.key_tipo_mesa][action.data.key];
                    }
                }
            }
        }

    }
}
const ingreso = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            if (state.data[action.key_tipo_mesa]) {
                state.data[action.key_tipo_mesa][action.data.key] = action.data;
            }
        }

    }
}
const getAll = (state, action) => {
    if (action.estado === "exito") {
        state.data = action.data;
    }
}
