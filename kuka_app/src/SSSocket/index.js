import { Platform } from 'react-native';
import { Log } from '../SSLog';
import Config from './config.json';
import * as SSSOcket from './SSSocketSession'
var store;
var SESSIONES = {};
var LOGS = [];
var orgLog = console.log;
// console.log = function (message) {
//     LOGS.push(message);
//     return orgLog(message);
// }
export const getLog = () => {
    return LOGS;
}


export const init = (_store) => {
    store = _store;
    Log("Socket inicializado desde " + Platform.OS, "34");

    insertInReducer();
}


export const insertInReducer = () => {
    var states = store.getState();
    Object.keys(Config).map((key) => {
        if (Config[key].alwaysOpen) {
            var sessionOpen = getSession(key);
            if (sessionOpen) {
                if (sessionOpen.isActivo()) {
                    states.socketReducer.session[key] = {
                        isOpen: true,
                        estado: "conectado",
                        send: (json, isDispatch) => {
                            sessionOpen.send(json, isDispatch);
                        }
                    }
                    return;
                }
            }
        }
        states.socketReducer.session[key] = {
            ...Config[key],
            isOpen: false,
            estado: "Desconectado",
            send: (json, isDispatch) => {
                Log("No se envio el mensaje socket desconectado", "34")
            }
        }
    });
    store.dispatch({
        component: "SSSocket",
        type: "dataChange",
    })
}
export const getSession = (_SocketName) => {
    if (!SESSIONES[_SocketName]) {
        Log("NO EXISTE LA SESSION " + _SocketName + " ::getSession", "34");
        open(_SocketName);
    }
    SESSIONES[_SocketName].setStore(store);
    return SESSIONES[_SocketName];
}
export const getSessionConfig = (_SocketName) => {
    if (!Config[_SocketName]) {
        Log("No existen configuraciones para el socket " + _SocketName + " ::getSessionConfig", "34");
        return false;
    }
    Config[_SocketName]["nombre"] = _SocketName;
    return Config[_SocketName];
}
export const open = (_SocketName) => {
    var sessionConfig = getSessionConfig(_SocketName);
    if (!sessionConfig) {
        Log("ERROR: Configuracion no encontrada " + _SocketName + " ::open", 34);
        return false;
    }
    if (!SESSIONES[_SocketName]) {
        Log("Nueva Session creada ::open", 34);
        SESSIONES[_SocketName] = SSSOcket.create(sessionConfig, store, insertInReducer);
        var states = store.getState();
        states.socketReducer.SESSIONES = SESSIONES;

    } else {
        Log("La session ya existe ::open", 34);
    }
    SESSIONES[_SocketName].open();
    return true;
}

