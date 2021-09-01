const initialState = {
    estado: "Not Found",
    usuario: {},
    data: false,
    keys: {},
    activas: false,
    fechas: {
        fecha_inicio: false,
        fecha_fin: false,
    },
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "caja") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "getByKey":
                getByKey(state, action);
                break;
                break;
            case "getActivas":
                getActivas(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "cierre":
                cierre(state, action);
                break;
            case "getActiva":
                getActiva(state, action);
                break;
            case "getByFecha":
                getByFecha(state, action);
                break;
        }
        state.type = action.type;
        state.estado = action.estado;
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
const getByFecha = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.dataFechas = {};
        state.fechas = {
            fecha_inicio: action.fecha_inicio,
            fecha_fin: action.fecha_fin,
        }
        state.dataFechas = action.data;
    }
}
const getActivas = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        Object.keys(action.data).map(key => {
            var obj = action.data[key];
            state.usuario[obj.key_usuario] = obj;
        })
        state.activas = true;
    }
}
const getByKey = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.keys = {
            ...state.keys,
            ...action.data
        };
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        console.log(action.data);
        state.usuario[action.data.key_usuario] = action.data;
        state.lastRegister = action.data;
    }
}
const getActiva = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuario[action.data.key_usuario] = action.data;
        state.lastRegister = action.data;
    }
}
const cierre = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        delete state.usuario[action.data.key_usuario];
        // state.lastRegister = action.data;
    }
}
