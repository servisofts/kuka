import AppParams from "../Params";
export default class index {
    static component = "caja"
    static reducerName = "cajaReducer";
    // static getAll(props) {
    //     var reducer = props.state[index.reducerName];
    //     var data = reducer.data["registro_administrador"];
    //     if (!data) {
    //         if (reducer.estado == "cargando") return;
    //         props.state.socketReducer.session[AppParams.socket.name].send({
    //             component: index.component,
    //             type: "getAll",
    //             estado: "cargando",
    //         }, true)
    //         return;
    //     }
    //     return data;
    // }
    static getByKey(props, key_caja) {
        var reducer = props.state[index.reducerName];
        var data = reducer.keys[key_caja];
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: index.component,
                type: "getByKey",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key: key_caja,
            }, true)
            return;
        }
        return data;
    }
}