import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SFechaFormat } from '../../../Component/SFecha';
import SOrdenador from '../../../Component/SOrdenador';
import SSCrollView from '../../../Component/SScrollView';
import SSwipeList from '../../../Component/SSwipeList';
import STextImput from '../../../Component/STextImput';
import AppParams from '../../../Params';
import Svg from '../../../Svg';
class ProcesoMensaje extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.imputs = {
            descripcion: new STextImput({
                placeholder: "Escribe tu mensaje...",
                // defaultValue: this.data["Nombres"].dato,
                // autoCapitalize: "none",
                style: {
                    color: "#fff",
                    flex: 1,
                    padding: 4,
                    height: "100%",
                }
            })
        }
        this.data = this.props.data;

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
        if (!usr.datos) {
            return false
        }
        return usr.datos;
    }
    getUsuarioCreador(key) {
        var usuario = this.getUsuario(key);
        if (!usuario) {
            return <ActivityIndicator color={"#fff"} />
        }
        return <View style={{
            // justifyContent: "center",
            // alignContent: "center",
            flex: 1,
            // marginStart: 10,
        }}>
            <Text style={{
                color: "#ffff",
                fontSize: 12,

            }}>{usuario["Nombres"] + " " + usuario["Apellidos"]}</Text>
        </View>
    }
    getLista() {
        var data = this.props.state.procesoComentarioReducer.data[this.props.data.key];
        if (!data) {
            if (this.props.state.procesoComentarioReducer.estado == "cargando") {
                return <ActivityIndicator color={"#Fff"} />
            }
            if (this.props.state.procesoComentarioReducer.estado == "error") {
                return <ActivityIndicator color={"#Fff"} />
            }
            var object = {
                component: "procesoComentario",
                type: "getAll",
                estado: "cargando",
                key_proceso: this.props.data.key,
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <ActivityIndicator color={"#Fff"} />
        }
        var arr = new SOrdenador({ data: data }).ordernarObject([
            { key: "fecha_on", peso: 1, order: "desc" }
        ])
        return arr.map((key) => {
            var obj = data[key];
            if (obj.estado == 0) {
                return false;
            }
            return <View style={{
                width: "100%",
                minHeight: 60,
                padding: 4,
            }} obj={obj}>
                <View style={{
                    width: "100%",
                    // borderBottomColor: "#444",
                    // borderBottomWidth: 1,
                    borderRadius: 8,
                    flexDirection: "row",
                    backgroundColor: "#66000022",
                    padding: 8,
                }}>
                    <View style={{
                        width: 70,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            // borderWidth: 2,
                            // borderColor: "#66000022",
                            overflow: "hidden"
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + obj.key_usuario, {
                                width: "100%",
                                height: "100%",
                                resizeMode: 'stretch',
                            })}
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        // alignItems: "center"
                    }}>
                        <Text style={{
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            fontSize: 10,
                            color: "#999"
                        }}>{SFechaFormat(obj.fecha_on)}</Text>
                        {this.getUsuarioCreador(obj.key_usuario)}
                        <Text style={{
                            flex:4,
                            color: "#999",
                            fontSize: 12,
                        }}>{obj.descripcion}</Text>
                        {/* <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: "#999"
                            }}>{obj.observacion}</Text>
                        </View> */}
                    </View>


                </View>
            </View>
        })
    }
    render() {
        if (!this.props.data) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (this.props.state.procesoComentarioReducer.estado == "exito" && this.props.state.procesoComentarioReducer.type == "editar") {
            this.props.state.procesoComentarioReducer.estado = "";
            this.setState({ ...this.state });
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={{
                width: "100%",
            }}>

                <View style={{
                    width: "100%",
                    height: 50,
                    // padding: 4,
                }} >
                    <View style={{
                        width: "100%",
                        height: "100%",
                        borderColor: "#ffffff11",
                        // borderBottomWidth: 1,
                        // borderTopWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#66000022",
                        borderRadius: 8,
                        flexDirection: "row",
                    }}>
                        {this.imputs.descripcion.getComponent()}
                        <TouchableOpacity style={{
                            width: 50,
                            height: "90%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 8,
                            backgroundColor: "#66000022"
                        }} onPress={() => {
                            if (this.props.state.procesoComentarioReducer.estado == "cargando") {
                                return;
                            }
                            var isValid = true;
                            var objectResult = {};

                            Object.keys(this.imputs).map((key) => {
                                if (this.imputs[key].verify() == false) isValid = false;
                                objectResult[key] = this.imputs[key].getValue();
                            })

                            if (!isValid) {
                                this.setState({ ...this.state });
                                return;
                            }
                            this.imputs.descripcion.clear();
                            objectResult["key_usuario"] = this.props.state.usuarioReducer.usuarioLog.key;
                            objectResult["key_proceso"] = this.data.key;
                            var object = {
                                component: "procesoComentario",
                                type: "registro",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                key_proceso: this.data.key,
                                data: objectResult,
                            }
                            // alert(JSON.stringify(object));
                            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        }}>
                            <Svg resource={require("../../../img/send.svg")} style={{
                                fill: "#ffffff",
                                height: 20,
                                width: 20
                            }} />
                        </TouchableOpacity>
                    </View>
                </View>
                { this.getLista()}

            </View >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesoMensaje);