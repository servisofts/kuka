const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "paqueteUsuario") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            // case "editar":
            //     editar(state, action);
            //     break;
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
            state.data[action.data.key_usuario][action.data.key] = action.data;
        }
        state.lastRegister = action.data;
    }
}
// const editar = (state, action) => {
//     state.estado = action.estado
//     if (action.estado === "exito") {
//         if (state.data) {

//             state.data[action.data.key_paquete][action.data.key_servicio] = action.data;
//             if (action.data.estado == 0) {
//                 delete state.data[action.data.key_paquete][action.data.key_servicio]
//             }
//         }
//         state.lastRegister = action.data;
//     }
// }
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.key_usuario) {
            state.data[action.key_usuario] = action.data;
        }
    }
}

