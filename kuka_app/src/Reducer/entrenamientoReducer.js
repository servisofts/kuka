const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "entrenamiento") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAll":
                getAll(state, action);
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
            state.data[action.data.key] = action.data;
        }
    }
}

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        console.log("ecito");
        if (action.key_usuario) {
            state.data[action.key_usuario] = action.data;
        }
    }
}

