import React from 'react'
import AppParams from "../Params";

export const getFilesInPath = (props) => {
    var dataFinal = false;
    var data = props.state.fileReducer.data;
    if (!data) {
        if (props.state.fileReducer.estado == "cargando") { return false }
        if (props.state.fileReducer.estado == "error") { return false }
        var object = {
            component: "file",
            type: "getAll",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key
        }
        // alert(JSON.stringify(object));
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    dataFinal = data;
    var routes = props.state.fileReducer.routes;
    if (routes.length > 0) {
        routes.map((curRoute, key1) => {
            dataFinal = dataFinal[curRoute.key].data;
            if (!dataFinal) {
                if (props.state.fileReducer.estado == "cargando") { return false }
                if (props.state.fileReducer.estado == "error") { return false }
                var object = {
                    component: "file",
                    type: "getAll",
                    estado: "cargando",
                    path: routes
                }
                // alert(JSON.stringify(object));
                props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            }

        })
    }
    return dataFinal;
}


export const getPosicionDisponible = ({ curFile, props }) => {
    var widthContainer = props.widthContainer;
    var heightContainer = props.heightContainer;
    var size = 90;
    var margin = 5;

    var x = props.x || 0;
    var y = props.y || 0;

    var x2 = 0;
    var y2 = 0;
    const validatePosition = () => {
        var keys = Object.keys(curFile)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            var obj = curFile[key];
            x2 = obj.posx;
            y2 = obj.posy;
            var isValid = true;
            var difx = x2 + ((size) / 2) - (x + ((size) / 2))
            var dify = y2 + ((size) / 2) - (y + ((size) / 2))
            if (Math.abs(difx) <= size - margin && Math.abs(dify) <= size - margin) {
                return false
            }
        }
        return true;
    }
    var isValidate = false;
    var incremet = 10;
    var i = 0;
    while (!isValidate) {
        i++;
        if ((x + size + margin) >= widthContainer) {
            x = 0;
            y += size + margin
        }
        isValidate = validatePosition();

        if (!isValidate) {
            if ((x + size + margin) >= widthContainer) {
                x = 0;
                y += incremet*i
            } else {
                x += incremet*i
            }
        }
    }
    return { x: x, y: y }
}