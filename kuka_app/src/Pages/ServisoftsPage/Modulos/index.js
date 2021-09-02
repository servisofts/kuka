import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import Svg from '../../../Svg';

class Modulos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var data = this.props.state.moduloReducer.data;

        if (!data) {
            if (this.props.state.moduloReducer.estado == "cargando") {
                return <View />
            }
            if (this.props.state.moduloReducer.estado == "error") {
                return <View />
            }
            var object = {
                component: "modulo",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) {
                return <View />
            }
            return <TouchableOpacity style={{
                width: 100,
                height: 100,
                margin: 4,
                justifyContent:"center",
                alignItems:"center"
            }} onPress={() => {
                this.props.navigation.navigate("ModuloPerfilPage", { data: obj });
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#66000022",
                    borderRadius: 10,
                    overflow: "hidden",
                    width: 80,
                    height: 80,
                }}>
                    {/* <Svg name={"Ajustes"} style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }} /> */}
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "modulo_" + obj.key, {
                        width: "100%",
                        height: "100%",
                        resizeMode:"center"
                    })}
                </View>
                <View style={{
                    height: 20,
                    width: "90%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        width: "100%",
                        color: "#ffffff",
                        fontSize: 10,
                        // backgroundColor:"#fff",
                        textAlign: "center"
                        // fontFamily: "myFont"
                    }}>{obj.descripcion}</Text>
                </View>
            </TouchableOpacity>
        })

    }
    render() {

        return (
            <View style={{
                width: "100%",
            }}>
                <Text style={{
                    color: "#fff"
                }}>Modulos</Text>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>

                    <TouchableOpacity style={{
                        width: 100,
                        height: 100,
                        margin: 4,
                    }} onPress={() => {
                        this.props.navigation.navigate("ModuloRegistroPage");
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Svg name={"Add"} style={{
                                width: "90%",
                                height: "90%",
                            }} />
                        </View>
                        <View style={{
                            height: 20,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                color: "#ffffff",
                                fontSize: 10,
                                textAlign: "center"
                                // fontFamily: "myFont"
                            }}>{"Solicitar modulo"}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.getLista()}
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Modulos);