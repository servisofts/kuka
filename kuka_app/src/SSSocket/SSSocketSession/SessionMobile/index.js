import { AsyncStorage, Platform } from 'react-native';
import AppParams from '../../../Params/index.json'
import TcpSocket from 'react-native-tcp-socket';
var DEBUG = false;
const delay = ms => new Promise(res => setTimeout(res, ms));

class SessionMobile {
    config;
    socket;
    dataTemporal;
    currentPing;
    store;
    insertInReducer;
    ultimaComunicacion;
    colaMensaje;
    ultimoPing;
    lastReconect;
    cantidadIntentos;
    identificado;
    lastSendIdentificado;
    constructor(config, store, insertInReducer) {
        this.store = store;
        this.config = config;
        this.lastReconect = new Date().getTime();
        this.lastSendIdentificado = new Date().getTime();
        this.insertInReducer = insertInReducer;
        this.identificado = false;
        this.cantidadIntentos = 0;

        var error = false;
        this.currentPing = {};
        this.ultimaComunicacion = new Date().getTime();
        this.dataTemporal = "";
        if (!config["nombre"]) {
            Log("No se encontro NOMBRE");
            return;
        }
        if (!config.native["ip"]) {
            Log("::" + config["nombre"] + ":: No se encontro IP");
            error = true;
        }
        if (!config.native["puerto"]) {
            Log("::" + config["nombre"] + "::No se encontro PUERTO");
            error = true;
        }
        if (!config.native["cert"]) {
            Log("::" + config["nombre"] + "::No se encontro CERTIFICADO");
            error = true;
        }
        if (error) {
            return;
        }


    }
    setStore(_store) {
        this.store = _store;
    }
    isActivo() {
        if (this.socket) {
            if (!this.socket._destroyed) {
                return true;
            }
        }
        return false;
    }
    open() {
        if (this.isActivo()) {
            Log("YA SE ENCUENTRA CONECTADO " + this.config["nombre"] + "@" + this.config.native["ip"] + ":" + this.config.native["puerto"] + " ::open");
            this.insertInReducer();
            return
        }
        var _instance = this;
        var cert_begin = "-----BEGIN CERTIFICATE-----\n";
        var end_cert = "\n-----END CERTIFICATE-----";
        var cerdata = this.config.native["cert"];
        var pem = cert_begin + cerdata + end_cert;
        Log("Itentando conectar con " + this.config["nombre"] + "@" + this.config.native["ip"] + ":" + this.config.native["puerto"] + " ::open");
        this.socket = TcpSocket.createConnection({
            nombre: this.config["nombre"],
            port: this.config.native["puerto"],
            host: this.config.native["ip"],
            timeout: 2000,
            tls: true,
            tlsCert: { uri: pem }
        }, () => {
            _instance.onOpen();
        });
        this.socket.on('timeout', function () {
            _instance.onTimeout();
        });
        this.socket.on('data', function (data) {
            _instance.onMensaje(data);
        });
        this.socket.on('error', function (error) {

            _instance.onError(error);
        });
        this.socket.on('close', function () {
            _instance.onClose();
        });
    }
    onOpen() {
        // this.socket.setTimeout(10000);
        Log("::" + this.config["nombre"] + ":: onOpen ::");
        this.cantidadIntentos = 0;
        this.identificado = false;
        this.identificarse();
        this.insertInReducer();
    }

    onError(error) {
        if (error.includes("BAD_BASE64_DECODE")) {
            Log("::" + this.config["nombre"] + ":: onError :: ERROR AL CONVERTIR CERTIFICADO A B64");
            return;
        }
        if (error.includes("closed")) {
            this.onClose();
        }
        Log("::" + this.config["nombre"] + ":: onError ::" + JSON.stringify(error));

    }
    onClose() {
        Log("::" + this.config["nombre"] + ":: onClose ::");
        this.socket.end();
        this.socket.destroy();
        this.reconect();
        this.insertInReducer();
    }
    reconect() {
        if (!this.config["timeReconect"]) {
            return false;
        }
        if (this.config["timeReconect"] <= 0) {
            return false;
        }
        var _instance = this;
        const reconectAsync = async (timeReconet) => {
            await delay(timeReconet / 2);
            var curTime = new Date().getTime();
            if (_instance.isActivo()) {
                _instance.cantidadIntentos = 0;
                return;
            }
            if (curTime - _instance.lastReconect > _instance.config["timeReconect"]) {
                if (!_instance.isActivo()) {
                    _instance.lastReconect = new Date().getTime();
                    _instance.cantidadIntentos += 1;
                    _instance.open();
                    Log("::" + _instance.config["nombre"] + ":: reconect ::");
                    return;
                }
            }
            await delay(timeReconet / 2);
            reconectAsync(timeReconet);

        };
        reconectAsync(this.config["timeReconect"]);

    }
    onTimeout() {
        Log("::" + this.config["nombre"] + ":: onTimeout ::");
        if (this.socket._destroyed) {
            this.socket.end();
        }
    }
    hiloTimeOut = async (data) => {
        await delay(5000)
        data.estado = "timeout"
        this.store.dispatch(data)
    }
    send(mensaje, isDispatch) {
        // this.colaMensaje.setMensaje(mensaje);
        this.socket.write(JSON.stringify(mensaje) + "\n");
        // console.log(mensaje)
        if (isDispatch) this.store.dispatch(mensaje);
        if (isDispatch) this.hiloTimeOut(mensaje)
    }
    getConfig() {
        return this.config;
    }
    getUltimaComunicacion() {
        return new Date().getTime() - this.ultimaComunicacion;
    }

    onMensaje(data) {
        this.ultimaComunicacion = new Date().getTime();
        var decoderdata = data.toString();
        // Log("::" + this.config["nombre"] + ":: onMensaje ::" + decoderdata);
        var re = /---SSofts---/;
        var isFinal = re.test(decoderdata);
        if (isFinal) {
            decoderdata = decoderdata.replace(re, "");
            decoderdata = decoderdata.split("---SSkey---")[0];
            var mensajeFinal = this.dataTemporal + decoderdata;
            this.dataTemporal = "";
            var datajson = false;
            try {
                datajson = JSON.parse(mensajeFinal);
            } catch (e) {
                Log("ON MENSAJE ERROR:: " + e)
                Log("DATA:: " + mensajeFinal)
                return true;
            }
            if (this.recivePing(datajson)) {
                return true;
            }
            if (this.reciveIdentificacion(datajson)) {
                return true;
            }
            if (typeof datajson == "object") {
                Log("ON MENSAJE:" + mensajeFinal);
                this.store.dispatch(datajson);
            }
        } else {
            this.dataTemporal = this.dataTemporal + decoderdata;
        }
    }
    ping() {
        if (!this.isActivo()) {
            Log("No se puede hacer ping socket cerrado.")
            return false;
        }
        var objSend = {
            component: "socketTest",
            type: "ping",
            timeOut: new Date().getTime(),
            estado: "cargando",
        }
        this.currentPing[objSend.timeOut] = objSend;
        this.send(objSend);
        var _instance = this;
        const testPing = async (timeOut) => {
            await delay(5000);
            if (_instance.currentPing[timeOut]) {
                Log("EL PING NO SE REPONDIO EN 5 segundos.")
                this.onClose();
                delete _instance.currentPing[timeOut];
            }
        };
        testPing(objSend.timeOut);
    }
    recivePing(datajson) {
        try {
            if (datajson.component && datajson.type) {
                if (datajson.component == "socketTest" && datajson.type == "ping") {
                    var ping = new Date().getTime() - datajson.timeOut;
                    this.ultimoPing = ping;
                    if (this.currentPing[datajson.timeOut]) {
                        delete this.currentPing[datajson.timeOut];
                        this.store.dispatch({
                            component: "SSSocket",
                            type: "dataChange",
                        })

                        // Log("PING AL SERVIDOR :: " + ping);
                        return true;
                    }

                }
            }
        } catch (e) {
            Log("ERROR al leer el ping recivido :: " + e);
            return false;
        }

    }

    identificarse() {
        var _instance = this;
        const reintent = async () => {
            await delay(3000);
            if (_instance.identificado) {
                return;
            }
            if (!_instance.identificado) {
                var curTime = new Date().getTime();
                if (curTime - _instance.lastSendIdentificado > 3000) {
                    _instance.lastSendIdentificado = new Date().getTime();
                    AsyncStorage.getItem(AppParams.storage.urlLog).then((strUsuario) => {
                        AsyncStorage.getItem(AppParams.storage.fbtoken).then((strFirebase) => {
                            Log("Intentando identificarse");
                            var usuario = {};
                            if (strUsuario) {
                                try {
                                    usuario = JSON.parse(strUsuario);
                                } catch (error) {
                                    Log("No existe usuario");
                                }
                            }
                            var token = "void";
                            try {
                                var objToken = JSON.parse(strFirebase);
                                token = objToken.token;
                            } catch (error) {
                                token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                    return v.toString(16);
                                });
                                AsyncStorage.setItem(AppParams.storage.fbtoken, JSON.stringify({
                                    token: token,
                                    type: "SS UUID"
                                }))
                            }

                            var objSend = {
                                component: "usuario",
                                type: "identificacion",
                                data: usuario,
                                deviceKey: token,
                                fbapp: "proeycto_android",
                                estado: "cargando",
                                platform: {
                                    OS: Platform.OS,
                                    version: Platform.Version
                                }
                            };
                            _instance.send(objSend);


                        });
                    });
                }
            }
            reintent();
        };
        reintent();
    }

    reciveIdentificacion(datajson) {
        try {
            if (datajson.component && datajson.type) {
                if (datajson.component == "usuario" && datajson.type == "identificacion") {
                    if (datajson.estado == "exito") {
                        this.identificado = true;
                        Log("Identificado con exito");
                        return true;
                    }

                }
            }
        } catch (e) {
            Log("ERROR al leer el la identificacion :: " + e);
        }
        return false;
    }
    getLastPing() {
        return this.ultimoPing;
    }
}
const Log = (mensaje) => {
    if (DEBUG) {
        console.log("\x1b[34m" + "SSSocketNative::SSSession:: " + mensaje + "\x1b[39m");
    }
}
export default SessionMobile;