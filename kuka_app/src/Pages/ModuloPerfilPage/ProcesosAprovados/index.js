import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SFechaFormat } from '../../../Component/SFecha';
import SImageFetch from '../../../Component/SImageFetch';
import SOrdenador from '../../../Component/SOrdenador';
import SSwipeList from '../../../Component/SSwipeList';
import AppParams from '../../../Params';
class ProcesosAprovados extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
            marginStart: 10,
        }}>
            <Text style={{
                color: "#ffff",
                fontSize: 16,

            }}>{usuario["Nombres"] + " " + usuario["Apellidos"]}</Text>
        </View>
    }
    getLista() {
        var data = this.props.state.procesoReducer.data[this.props.data.key];

        if (!data) {
            if (this.props.state.procesoReducer.estado == "cargando") {
                return <ActivityIndicator color={"#fff"} />
            }
            if (this.props.state.procesoReducer.estado == "error") {
                return <ActivityIndicator color={"#fff"} />
            }
            var object = {
                component: "proceso",
                type: "getAll",
                estado: "cargando",
                key_modulo: this.props.data.key,
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <ActivityIndicator color={"#Fff"} />
        }
        var i = 0;
        return new SOrdenador({ data: data }).ordernarObject([
            { key: "fecha_on", order: "desc" }
        ]).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) {
                return false;
            }
            i++;
            return <View style={{
                width: "100%",
                // minHeight: 600 * i / 5,
                padding: 8,
                marginBottom: 20,
            }} obj={obj}>

                <View style={{
                    flex: 1,
                    // width: "100%",
                    // height: "100%",
                    backgroundColor: "#66000033",
                    borderRadius: 16,
                    padding: 8,
                }}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            overflow: "hidden",
                            // borderWidth: 1,
                            // borderColor: "#666"
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + obj.key_usuario, {
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover"
                            })}
                        </View>
                        <View style={{
                            flex: 1,
                            // backgroundColor: "#f0f",
                            height: 50
                        }}>
                            {this.getUsuarioCreador(obj.key_usuario)}
                            <Text style={{
                                fontSize: 10,
                                color: "#666",
                                marginStart: 10,
                            }}>{SFechaFormat(obj.fecha_on)}</Text>
                        </View>
                    </View>
                    <View style={{
                        width: "100%"
                    }}>
                        {/* // }} onPress={() => {
                        this.props.navigation.navigate("ProcesoPerfilPage", { data: obj });
                  }}> */}
                        <View style={{
                            flex: 1,
                            width: "100%",
                            marginStart: 8,
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate("ProcesoPerfilPage", { data: obj });

                            }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 16,
                                    marginTop: 16,

                                }}>{obj.descripcion}</Text>
                            </TouchableOpacity>
                            <Text style={{
                                marginTop: 16,
                                fontSize: 14,
                                color: "#666",
                                width: "100%",
                            }}>{obj.observacion}</Text>

                        </View>

                        {/* <TouchableOpacity activeOpacity={0.9} style={{
                            width: "100%",
                            borderRadius: 8,
                            height: 300,

                            // backgroundColor: "#ff0",
                        }} onPress={() => {
                            this.props.navigation.navigate("ProcesoPerfilPage", { data: obj });
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + "proceso_" + obj.key, {
                                width: "100%",
                                height: "100%",
                                resizeMode: 'cover',
                            })}
                        </TouchableOpacity> */}

                    </View>
                    {/* <View style={{
                        flex: 1,
                        // backgroundColor: "#f0f",
                        borderTopColor: "#66000044",
                        borderTopWidth: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>ESTE ES EL MENU --TODO---</Text>
                    </View> */}
                </View>
            </View>
        })
    }
    render() {
        if (!this.props.data) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (this.props.state.procesoReducer.estado == "exito" && this.props.state.procesoReducer.type == "editar") {
            this.props.state.procesoReducer.estado = "";
            this.setState({ ...this.state });
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={{
                width: "100%",
                flex: 1,
                paddingBottom: 200,
            }}>

                {this.getLista()}

            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesosAprovados);