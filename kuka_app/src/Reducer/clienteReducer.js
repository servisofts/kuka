const initialState = {
    estado: "Not Found",
    data: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "cliente") {
        switch (action.type) {
            case "getAllActivos":
                getAllActivos(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getAllActivos = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data;
    }
}
