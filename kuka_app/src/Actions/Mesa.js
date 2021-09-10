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
    static cancelarReserva = (reserva,key_tipo_mesa, props) => {
        var object = {
            component: "reservaMesa",
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...reserva,
                estado: 0,
            },
            key_tipo_mesa
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return;
    }
    static reservarMesa = ({ key_mesa, key_usuario, fecha, key_tipo_mesa, key_jornada }, props) => {
        var object = {
            component: "reservaMesa",
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                key_mesa: key_mesa,
                key_usuario: key_usuario,
                fecha_reserva: fecha,
                key_jornada: key_jornada,
                key_relacionador: props.state.usuarioReducer.usuarioLog.key,
            },
            key_tipo_mesa
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return;
    }
    static ingreso = ({ key_reserva_mesa, cantidad, key_tipo_mesa }, props) => {
        if (props.state.reservaMesaReducer.data) {
            if (props.state.reservaMesaReducer.data[key_tipo_mesa]) {
                if (props.state.reservaMesaReducer.data[key_tipo_mesa][key_reserva_mesa]) {
                    props.state.reservaMesaReducer.data[key_tipo_mesa][key_reserva_mesa].cantidad += cantidad;
                    if (props.state.reservaMesaReducer.data[key_tipo_mesa][key_reserva_mesa].cantidad <= 0) {
                        props.state.reservaMesaReducer.data[key_tipo_mesa][key_reserva_mesa].cantidad = 0;
                        return;
                    }
                }
            }
        }

        var object = {
            component: "reservaMesa",
            type: "ingreso",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                key_reserva_mesa: key_reserva_mesa,
                cantidad: cantidad,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            },
            key_tipo_mesa
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return;
    }

}