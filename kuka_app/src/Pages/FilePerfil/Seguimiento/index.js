import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';

class Seguimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    ordenador = (dataObj) => {
        //hacer metodo de ordenamiento
        var data = dataObj;
        var listaKeys = Object.keys(dataObj)
        var dirOrder = "desc";
        var instance = this;
        listaKeys.sort(function (a, b) {
            var textA = new Date(data[a].fecha).getTime();
            var textB = new Date(data[b].fecha).getTime();
            if (dirOrder == "asc") {
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            } else {
                return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
            }
        });
        return listaKeys;
    }
    componentDidMount() {
        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "fileSeguimiento",
            type: "getByKey",
            estado: "cargando",
            tipos: [
                "crear_file",
                "crear_carpeta",
                "cambiar_posicion",
                "enviar_papelera",
                "cambiar_nombre",
                "compartir"
            ],
            key_file: this.props.file.key,
        }, true);
    }
    getUsuario(key) {
        var usr = this.props.state.usuarioReducer.data[key];
        if (!usr) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return false
            }
            var object = {
                component: "usuario",
                type: "getById",
                version: "2.0",
                estado: "cargando",
                cabecera: "registro_administrador",
                key: key
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return false;
        }
        return usr;
    }
    render() {
        var seguimiento = this.props.state.fileSeguimiento.data[this.props.file.key];
        if (!seguimiento) {
            if (this.props.state.fileSeguimiento.estado == "cargando") {
                return <ActivityIndicator color={"#fff"} />
            }
            if (this.props.state.fileSeguimiento.estado == "error") {
                return <Text>Error</Text>
            }
            return <ActivityIndicator color={"#fff"} />
        }
        var Lista = this.ordenador(seguimiento).map((key) => {
            var obj = seguimiento[key];
            var texto = "";
            if (obj.descripcion == "cambiar_posicion") {
                return <View />
            }
            switch (obj.descripcion) {
                case "crear_file":
                    texto = "Subio el archivo.";
                    break;
                case "crear_carpeta":
                    texto = "Creo la carpeta.";
                    break;
                case "cambiar_posicion":
                    texto = "Movio de posicion.";
                    break;
                case "enviar_papelera":
                    texto = "Envio a papelera.";
                    break;
                case "cambiar_nombre":
                    var data = JSON.parse(obj.data);
                    var newName = data.descripcion;
                    texto = "Cambio el nombre a \""+newName+"\"";
                    break;
                case "compartir":
                    var usrShare = this.getUsuario(obj.key_ref);
                    if (!usrShare) {
                        return <ActivityIndicator color={"#fff"} />
                    }
                    texto = "Compartio a \"" + usrShare.datos["Correo"] + "\"";
                    break;
                case "ver_file":
                    texto = "Descargo el archivo";
                    break;
                default:
                    texto = obj.descripcion
            }

            if (!obj.key_usuario) {
                return <View />
            }
            var usr = this.getUsuario(obj.key_usuario);
            if (!usr) {
                return <ActivityIndicator color={"#fff"} />
            }
            return <View style={{
                width: "100%",
                height: 50,
                backgroundColor: "#ffffff22",
                margin: 4,
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",

            }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 4,
                }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}>
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + usr.key, {
                            width: "100%",
                            height: "100%",
                        })}
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row"
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                color: "#fff",
                                padding: 4,
                            }}>{usr.datos["Nombres"]}</Text>
                        </View>
                        <View style={{
                            flex: 3,
                        }}>
                            <Text style={{
                                color: "#fff",
                            }}>{texto}</Text>
                            <Text style={{
                                color: "#ccc",
                                fontSize: 10,
                            }}>{new Date(obj.fecha).toLocaleString()}</Text>
                        </View>


                    </View>
                </View>
            </View>
        })
        return (
            <View style={{
                width: "95%",
                flex: 1,
                // backgroundColor: "#ffffff44",
                borderRadius: 8,
                marginTop: 4,
            }}>
                <ScrollView style={{
                    width: "100%",
                    flex: 1,
                }}>
                    {Lista}
                </ScrollView>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Seguimiento);