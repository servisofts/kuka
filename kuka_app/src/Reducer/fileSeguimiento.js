const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "fileSeguimiento") {
        switch (action.type) {
            case "getByKey":
                getByKey(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getByKey = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data[action.key_file] = action.data;
    }
}
