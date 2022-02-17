import AppParams from "../Params";
export default class Sucursal {
    static component = "sucursal"
    static reducerName = "sucursalReducer";
    static getAll(props) {
        var reducer = props.state[Sucursal.reducerName];
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return;
            props.state.socketReducer.session[AppParams.socket.name].send({
                component: Sucursal.component,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }, true)
            return;
        }
        return data;
    }
}