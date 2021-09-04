
const initialState = {
    estado: "",
    data: false
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "jornada") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
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
const registro = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
    }
}
const editar = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
    }
}
