import AppParams from "../Params";
export default class index {
    static component = "cuentaBanco"
    static reducerName = "cuentaBancoReducer";
    static getAll(props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.dataAll;
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: index.component,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }, true)
            return;
        }
        return data;
    }

}