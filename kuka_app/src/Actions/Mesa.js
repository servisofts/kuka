import AppParams from "../Params";
export default class index {
    static mesaGetAll = (props) => {
        if (!props.state.mesaReducer.data) {
            if (props.state.mesaReducer.estado == "cargando") {
                return;
            }
            var object = {
                component: "mesa",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            }
            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return;
        }
        return props.state.mesaReducer.data
    }

    static getTipoMesa = (props) => {
        if (!props.state.tipoMesaReducer.data) {
            if (props.state.tipoMesaReducer.estado == "cargando") {
                return;
            }
            var object = {
                component: "tipoMesa",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }
            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return;
        }
        return props.state.tipoMesaReducer.data
    }
    static reservarMesaGetAll = (props) => {
        if (!props.state.reservaMesaReducer.data) {
            if (props.state.reservaMesaReducer.estado == "cargando") {
                return;
            }
            var object = {
                component: "reservaMesa",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            }
            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return;
        }
        return props.state.reservaMesaReducer.data
    }
    static reservarMesa = ({ key_mesa, key_usuario, fecha, key_tipo_mesa }, props) => {
        var object = {
            component: "reservaMesa",
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                key_mesa: key_mesa,
                key_usuario: key_usuario,
                fecha_reserva: fecha
            },
            key_tipo_mesa
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return;
    }

}