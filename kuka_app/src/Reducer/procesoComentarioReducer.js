const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "procesoComentario") {
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
            case "anular":
                anular(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (state.data[action.key_proceso]) {
                state.data[action.key_proceso][action.data.key] = action.data;
            }

        }
        state.lastRegister = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (state.data[action.data.key_proceso]) {
                state.data[action.data.key_proceso][action.data.key] = action.data;
            }
        }
        state.lastEdit = action.data;
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "error") {
        state.data[action.key_proceso] = {};
    }
    if (action.estado === "exito") {
        state.data[action.key_proceso] = action.data;
    }
}

const anular = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            delete state.data[action.key];
        }
    }
}
