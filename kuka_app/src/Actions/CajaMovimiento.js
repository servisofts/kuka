import AppParams from "../Params";
export default class index {
    static component = "cajaMovimiento"
    static reducerName = "cajaMovimientoReducer";

    static getByKeyCaja(key_caja, props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data[key_caja];
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: index.component,
                type: "getByKeyCaja",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_caja: key_caja,
                estado: "cargando"
            }, true)
            return;
        }
        return data;
    }
    
}