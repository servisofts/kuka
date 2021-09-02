const initialState = {
    estado: "Not Found",
    data: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "old") {
        switch (action.type) {
            case "getClientesPorZona":
                getClientesPorZona(state, action);
                break;
            case "bdInfo":
                bdInfo(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}
const getClientesPorZona = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.zona = action.data;
    }
}
const bdInfo = (state, action) => {
    state.estado = action.estado
    console.log(action)
    if (action.estado === "error") {
        state.bdInfo = {};
    }
    if (action.estado === "exito") {
        state.bdInfo = action.data;
    }
}
