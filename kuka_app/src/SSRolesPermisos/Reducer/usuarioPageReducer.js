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
            case "rolPermiso":
                rolPermiso(state, action);
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
        state.usuario_rol = action.rol;
        state.key_usuario = action.key_usuario;
        console.log(action.rol);

    }
}
const rolPermiso = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        var data = action.data;
        if (state.data) {
            var pagina = data.pagina;
            var permiso = data.permiso;
            var is_activo = data.is_activo;
            if (!state.data[pagina.url]) {
                pagina["permisos"] = {};
                state.data[pagina.url] = pagina;
            }
            console.log(is_activo)

            if (is_activo) {
                state.data[pagina.url].permisos[permiso.type] = permiso;
            } else {
                delete state.data[pagina.url].permisos[permiso.type];
            }
        }
    }
}

