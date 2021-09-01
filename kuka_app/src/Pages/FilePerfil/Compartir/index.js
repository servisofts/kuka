import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SThread from '../../../Component/SThread';
import AppParams from '../../../Params';

class Compartir extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.props.state.usuarioReducer.dataBuscar = false;
    }
    send() {
        if (!this.text) {
            return;
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "usuario",
            type: "buscar",
            estado: "cargando",
            data: this.text,

        }, true);
    }


    getSend() {
        var inner = <Text style={{ color: "#fff" }}>Aceptar</Text>;
        if (this.props.state.usuarioReducer.estadoBuscar == "cargando") {
            inner = <ActivityIndicator colo={"#000"} />
        }
        return (<TouchableOpacity style={{
            width: 100,
            height: 40,
            borderRadius: 8,
            backgroundColor: "#ffffff88",
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => {
            this.send()
        }}>
            {inner}
        </TouchableOpacity>)
    }
    aceptShare(key) {
        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "file",
            type: "compartir",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            key_usuario_to: key,
            key_file: this.props.file.key
        }, true);
        this.props.close();
    }
    getSujest() {
        var data = this.props.state.usuarioReducer.dataBuscar;
        var lista = <View></View>
        if (data) {
            delete data[this.props.state.usuarioReducer.usuarioLog.key];
            lista = Object.keys(data).map((key) => {
                var obj = data[key];
                return <TouchableOpacity style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#ffffffcc",
                    margin: 2,
                    borderRadius: 4,
                }} onPress={() => {
                    this.aceptShare(key)
                }}>
                    <View style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 4,
                    }}>
                        <View style={{
                            width: 35,
                            height: 35,
                            backgroundColor: "#fff",
                            borderRadius: 4,
                            overflow: 'hidden',
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + key, {
                                width: "100%",
                                height: "100%",
                            })}
                        </View>
                        <View style={{
                            flex: 1,
                            borderRadius: 4,
                            marginStart: 8,
                        }}>
                            <Text>{obj["Correo"]}</Text>
                            <Text>{obj["Telefono"]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            });
        }

        return <View style={{
            width: "100%",
            // backgroundColor: "#ffffff99",
            height: 250,
            padding: 4,
            // margin: 2,
        }}>
            <ScrollView>
                {lista}
            </ScrollView>
        </View>
    }
    render() {
        return (
            <>
                <View style={{
                    width: "100%",
                    height: "100%",
                    height: 400,
                    alignItems: "center",
                    padding: 8,
                }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 16,
                        padding: 8,
                        textAlign: "center",
                        textAlignVertical: "center"
                    }}>Compartir</Text>

                    <View style={{
                        width: "100%",
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        // padding: 4,
                        // backgroundColor:"#fff"
                    }}>
                        <TextInput
                            style={{
                                width: "100%",
                                height: 50,
                                backgroundColor: "#ffffffcc",
                                borderRadius: 4,
                                padding: 4,
                                textAlign: "center",
                            }}
                            onKeyPress={(evt) => {
                                if (evt.key === "Enter") {
                                    this.send()
                                }
                            }}
                            onChangeText={(text) => {
                                this.text = text;

                                new SThread(300, "changeBusquedaCompartir", true).start(() => {
                                    if (!text) {
                                        this.props.state.usuarioReducer.dataBuscar = false;
                                        this.setState({ ...this.state })
                                        return;
                                    }
                                    this.send();

                                })

                            }} placeholder={"Ingresa el correo o el numero de telefono."} />
                    </View>
                    {this.getSujest()}

                    <View style={{
                        width: "100%",
                        height: 45,
                        marginTop: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around"
                        // backgroundColor:"#fff"
                    }}>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 40,
                            borderRadius: 8,
                            backgroundColor: "#ff555588",
                            justifyContent: "center",
                            alignItems: "center"
                        }} onPress={() => {

                            this.props.close();
                        }}>
                            <Text style={{ color: "#fff" }}>Cerrar</Text>
                        </TouchableOpacity>
                        {/* {this.getSend()} */}
                    </View>
                </View>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Compartir);