const initialState = {
    estado: "Not Found",
    usuarioLog: false,
    listaBusqueda: false,
    region: {
        latitude: -17.78629,
        longitude: -63.18117,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    },
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "locationGoogle") {
        switch (action.type) {
            case "geocode":
                geocode(state, action);
                break;
            case "autoComplete":
                autoComplete(state, action);
                break;
            case "route":
                route(state, action);
                break;
            case "repaintUbicacion":
                repaintUbicacion(state, action);
                break;
            case "detail":
                detail(state, action);
                break;
            case "Miubicacion":
                Miubicacion(state, action);
                break;
        }
        state.type = action.type
        state = { ...state };
    }
    return state;
}
const geocode = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data = action.data
    }

}
const route = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.route = action.data

    }

}

const autoComplete = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.listaBusqueda = action.data
    }
}

const repaintUbicacion = (state, action) => {
    var valor = action.data
    // console.log(valor)
    // state.region = {
    //     latitude: action.lat,
    //     longitude: action.lng,
    //     latitudeDelta: 0.08,
    //     longitudeDelta: 0.08,
    // }
}

const detail = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.datosDetail = {
            ...action.data,
            direccion: action.dirSearch
        }
    }
}


const Miubicacion = (state, action) => {
    state.region = action.data
}