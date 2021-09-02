import AppParams from "../Params";
export default class index {
    static component = "sucursalTipoPagoCuentaBanco"
    static reducerName = "sucursalTipoPagoCuentaBancoReducer";
    static getByKeySucursal(key_sucursal, props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data[key_sucursal];
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: index.component,
                type: "getByKeySucursal",
                estado: "cargando",
                key_sucursal: key_sucursal,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }, true)
            return;
        }
        return data;
    }

    static registro({ key_sucursal, key_cuenta_banco, key_tipo_pago }, props) {
        var reducer = props.state[index.reducerName];
        if (reducer.estado == "cargando") return;
        props.state.socketReducer.session[AppParams.socket.name].send({
            component: index.component,
            type: "registro",
            estado: "cargando",
            data: {
                key_sucursal: key_sucursal,
                key_cuenta_banco: key_cuenta_banco,
                key_tipo_pago: key_tipo_pago,
            },
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }, true)
        return;
    }
    static editar(data, props) {
        var reducer = props.state[index.reducerName];
        if (reducer.estado == "cargando") return;
        props.state.socketReducer.session[AppParams.socket.name].send({
            component: index.component,
            type: "editar",
            estado: "cargando",
            data,
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }, true)
        return;
    }
}