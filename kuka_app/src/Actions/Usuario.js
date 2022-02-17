import AppParams from "../Params";
export default class index {
    static component = "usuario"
    static reducerName = "usuarioReducer";
    static getByKey(key_usuario, props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data["registro_administrador"];
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: index.component,
                version: "2.0",
                type: "getAll",
                estado: "cargando",
                cabecera: "registro_administrador",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }, true)
            return;
        }
        return data[key_usuario];
    }
    static getAll(props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data["registro_administrador"];
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: index.component,
                version: "2.0",
                type: "getAll",
                estado: "cargando",
                cabecera: "registro_administrador",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }, true)
            return;
        }
        return data;
    }
}