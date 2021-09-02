import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SFechaDiff, SFechaFormat } from '../../../Component/SFecha';
import SImageFetch from '../../../Component/SImageFetch';
import SOrdenador from '../../../Component/SOrdenador';
import SSwipeList from '../../../Component/SSwipeList';
import AppParams from '../../../Params';
import ProcesoTipoSeguimiento from '../ProcesoTipoSeguimiento';
class ProcesosMovimientos extends Component {
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
        var data = this.props.state.procesoSeguimientoReducer.data[this.props.data.key];
        if (!data) {
            if (this.props.state.procesoSeguimientoReducer.estado == "cargando") {
                return <ActivityIndicator color={"#fff"} />
            }
            if (this.props.state.procesoSeguimientoReducer.estado == "error") {
                return <ActivityIndicator color={"#fff"} />
            }
            var object = {
                component: "procesoSeguimiento",
                type: "getAll",
                estado: "cargando",
                key_proceso: this.props.data.key,
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
            if (i > 0) {
                return <View />
            }
            i++;
            console.log(obj)
            return <View style={{
                width: "100%",
                // minHeight: 600 * i / 5,
                // padding: 8,
                marginBottom: 8,
            }} obj={obj}>

                <View style={{
                    flex: 1,
                    // width: "100%",
                    // height: "100%",
                    backgroundColor: "#66000033",
                    borderRadius: 16,
                }}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        padding: 8,

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
                                // }}>{SFechaFormat(obj.fecha_on)}</Text>
                            }}>{SFechaFormat(obj.fecha_on)}</Text>
                        </View>
                        <View style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            width: 60,
                            height: 40,
                            borderRadius: 8,
                            backgroundColor: "#66000066",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                // position: "absolute",
                                fontSize: 14,
                                color: "#fff",
                                letterSpacing: -1.5
                            }}>$ {obj.precio.toLocaleString('en-IN')}</Text>
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
                                // this.props.navigation.navigate("ProcesoPerfilPage", { data: obj });

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


                    </View>


                    <View style={{
                        width: "100%",
                        // position: "absolute",
                        bottom: 0,
                        right: 0,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <View style={{
                            // flex: 1,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                            // height:"100%",
                        }}>
                            <ProcesoTipoSeguimiento data={obj} />
                            {/* <Text style={{
                                color: "#fff"
                            }}>
                                {SFechaFormat(obj.fecha_on)}
                            </Text>
                            <Text style={{
                                color: "#fff"
                            }}>
                                {SFechaFormat(obj.fecha_expiracion)}
                            </Text> */}
                            <Text style={{
                                color: "#999"
                            }}>
                                Faltan {SFechaDiff(obj.fecha_on, obj.fecha_expiracion)} para terminar el proceso
                            </Text>
                        </View>


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
                        }}>ESTE ES EL MENU </Text>
                    </View> */}
                </View>
            </View>
        })
    }
    render() {
        if (!this.props.data) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (this.props.state.procesoSeguimientoReducer.estado == "exito" && this.props.state.procesoSeguimientoReducer.type == "editar") {
            this.props.state.procesoSeguimientoReducer.estado = "";
            this.setState({ ...this.state });
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>
                <TouchableOpacity style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "#66000022",
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    this.props.navigation.navigate("ProcesoSeguimietoRegistroPage", { data: this.props.data });
                }}>
                    <Text style={{
                        color: "#fff"
                    }}>NEGOCIAR</Text>
                </TouchableOpacity>
                {this.getLista()}

            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesosMovimientos);