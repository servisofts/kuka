const initialState = {
    estado: "Not Found",
    data: false,
    usuario: {}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "tipoUsuario") {
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
            case "getAllUsuario":
                getAllUsuario(state, action);
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
        if (state.usuario) {
            if (action.data.key_usuario) {
                state.usuario[action.data.key_usuario][action.data.key_tipo_usuario] = action.data;
            }
        }
        state.lastRegister = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.usuario) {
            delete state.usuario[action.data.key_usuario][action.data.key_tipo_usuario];
        }
        state.lastEdit = action.data;
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data;
    }
}
const getAllUsuario = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuario[action.key_usuario] = action.data;
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
