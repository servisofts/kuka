
const initialState = {
    estado: "",
    data: false
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "mesa") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
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

const getAll = (state, action) => {
    if (action.estado === "exito") {
        state.data = action.data;
    }
}
