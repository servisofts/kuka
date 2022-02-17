import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import FilePreview from '../CarpetasPage/FilePreview';
import * as SImageImput from '.././../Component/SImageImput';
import { connect } from 'react-redux';
import moment from 'moment';
import SImage from '../../Component/SImage';
import Ventanas from '../../Component/Ventanas';
import ProcesosAprovados from './ProcesosAprovados';



class ModuloPerfilPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.data = props.navigation.state.params.data;
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
    getPerfil(key) {
        var modulo = this.props.state.moduloReducer.data[this.data.key];
        this.data = modulo;
        if (!modulo) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (modulo.estado == 0) {
            this.props.navigation.goBack();
            return <View />
        }

        // var usuario_creador = this.getUsuario(this.data.key_usuario);
        // if (!usuario_creador) {
        //     return <ActivityIndicator color={"#fff"} />
        // }
        return (<>
            <View style={{
                width: "98%",
                height: 130,
                borderBottomWidth: 1,
                borderColor: "#aaa",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <View style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        width: "90%",
                        height: "90%",
                        backgroundColor: "#ffffff55",
                        borderRadius: 8,
                        // overflow: "hidden",
                    }} onPress={() => {
                        SImageImput.choseFile({
                            component: "modulo",
                            type: "subirFoto",
                            estado: "cargando",
                            key: this.data.key,
                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
                        }, (resp) => {
                            this.props.dispatch({
                                component: "image",
                                type: "cambio",
                                url: AppParams.urlImages + "modulo_" + this.data.key,
                            })
                            // this.state.repaint = new Date().getTime()
                            // this.setState({ ...this.state });
                        });
                    }}>
                        {/* {"foto"} */}
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + "modulo_" + this.data.key, {
                            width: "100%",
                            height: "100%",
                        })}

                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    // backgroundColor:"#000"
                }}>
                    <View style={{
                        width: "100%",
                        height: 20,
                        // backgroundColor:"#fff",
                    }}>
                        <View style={{
                            width: "95%",
                            flex: 1,
                            alignItems: "center",
                            // justifyContent:"center",
                            flexDirection: "row"
                        }}>
                            <Text style={{
                                flex: 5,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#fff"
                            }}>{modulo.descripcion} </Text>
                            <Text style={{
                                fontSize: 10,
                                color: "#bbb"
                            }}>{moment(new Date(modulo.fecha_on)).format("DD/MM/YYYY")} </Text>
                        </View>
                    </View>
                    <Text style={{
                        height: 40,
                        width: "95%",
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#999"
                    }}>{modulo.observacion} </Text>
                    <View style={{
                        width: "90%",
                        height: 40,
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        // backgroundColor: "#fff",
                    }}>
                        <TouchableOpacity style={{
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            alignItems: "center"
                        }} onPress={() => {
                            modulo.estado = 0;
                            var object = {
                                component: "modulo",
                                type: "editar",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: modulo
                            }
                            // alert(JSON.stringify(object));
                            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        }}>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                width: "90%",
                                height: "90%",
                            }}>
                                <Svg name={"Delete"} style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                }} />
                            </View>
                            <View style={{
                                height: 10,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    color: "#ffffff",
                                    fontSize: 9,
                                    textAlign: "center"
                                    // fontFamily: "myFont"
                                }}>{"Eliminar"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {/* <View style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                // backgroundColor: "#fff",
            }}>

                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 4,
                    backgroundColor: "#ffffff22"
                }}>
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + this.data.key_usuario, {
                        width: "100%",
                        height: "100%",
                    })}
                </View>
             <Text style={{
                        fontSize: 14,
                        color: "#bbb"
                    }}>{"Creador por: "} </Text> 
                <Text style={{
                    fontSize: 14,
                    color: "#bbb"
                }}>{usuario_creador.Nombres} {usuario_creador.Apellidos} </Text>
            </View> */}
        </>
        )
    }
    render() {

        return (
            <View style={{
                width: "100%",
                height: "100%",
            }}>
                <BackgroundImage
                // source={require("../../img/fondos/color/1.jpg")}
                />
                <BarraSuperior duration={500} title={"Modulo"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <View style={{
                        width: "95%",
                        height: "95%",
                        borderRadius: 8,
                        maxWidth: 500,
                        backgroundColor: "#ffffff09",
                        alignItems: "center",
                        // overflow: "hidden",

                    }}>
                        {this.getPerfil()}
                        <View style={{
                            width: "100%",
                            flex: 1,
                            // overflow:"hidden",
                        }}>
                            <Ventanas ref={(ref) => { this.ventanas = ref }} default={"Procesos"} ventanas={{
                                "Procesos": <ProcesosAprovados navigation={this.props.navigation} data={this.data} />,
                                "Estadisticas": <View />
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ModuloPerfilPage);