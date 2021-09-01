const initialState = {
    estado: "Not Found",
    data: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "usuarioPage") {
        switch (action.type) {
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

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data;
    }
}

