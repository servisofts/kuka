import AppParams from "../Params";
export default class index {
    static component = "jornada"
    static reducerName = `${this.component}Reducer`;
    static getAll(props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data;
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
    static registro({ descripcion, fecha_inicio, fecha_fin }, props) {
        props.state.socketReducer.session[AppParams.socket.name].send({
            component: index.component,
            type: "registro",
            estado: "cargando",
            data: {
                descripcion,
                fecha_inicio,
                fecha_fin,
            },
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }, true)
    }
    static editar(data, props) {
        props.state.socketReducer.session[AppParams.socket.name].send({
            component: index.component,
            type: "editar",
            estado: "cargando",
            data: data,
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }, true)
    }

}