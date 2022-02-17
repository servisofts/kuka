const initialState = {
    estado: "Not Found",
    data: {}, // {key_sucursal: {key_tipo_pago: data}}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "sucursalTipoPagoCuentaBanco") {
        switch (action.type) {
            case "getByKeySucursal":
                getByKeySucursal(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getByKeySucursal = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data[action.key_sucursal] = action.data;
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.data.key_sucursal]) {
            state.data[action.data.key_sucursal][action.data.key_tipo_pago] = action.data;
        }
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data[action.data.key_sucursal]) {
            state.data[action.data.key_sucursal][action.data.key_tipo_pago] = action.data;
        }
    }
}
