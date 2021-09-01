const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "permiso") {
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
        if (!state.data[action.data.key_page]) {
            state.data[action.data.key_page] = {};
        }
        state.data[action.data.key_page][action.data.key] = action.data;

        state.lastRegister = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data[action.data.key_page]) {
            state.data[action.data.key_page] = {};
        }
        state.data[action.data.key_page][action.data.key] = action.data;

        state.lastEdit = action.data;
    }
}
// const getAll = (state, action) => {
//     state.estado = action.estado
//     if (action.estado === "exito") {
//         state.data[action.key_page] = action.data;
//     }
// }


const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        Object.keys(action.data).map((key) => {
            var obj = action.data[key];
            if (!state.data[obj.key_page]) {
                state.data[obj.key_page] = {};
            }
            state.data[obj.key_page][key] = obj;
        })
    }
}

