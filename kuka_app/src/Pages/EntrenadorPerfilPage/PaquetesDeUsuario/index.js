import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SDateFormat, SFechaFormat } from '../../../Component/SFecha';
import AppParams from '../../../Params';
import SOrdenador from '../../../Component/SOrdenador';
class PaquetesDeUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getPaquete(key) {
        let reducer = this.props.state.paqueteReducer;
        let data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            var object = {
                component: "paquete",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return false;
        }
        return data[key];
    }
    getLista() {
        let reducer = this.props.state.paqueteUsuarioReducer;
        let data = reducer.data[this.props.key_usuario];
        if (!data) {
            if (reducer.estado == "cargando") return <ActivityIndicator color={"#fff"} />
            if (reducer.estado == "error") return <Text>ERROR</Text>
            var object = {
                component: "paqueteUsuario",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.key_usuario
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }

        return new SOrdenador([
            { key: "Peso", order: "desc", peso: 4 },
            { key: "fecha_inicio", order: "desc", peso: 1 },
        ]).ordernarObject(
            data
        ).map((key) => {
            let obj = data[key];
            let paquete = this.getPaquete(obj.key_paquete);
            var urlImagePaquete = AppParams.urlImages + "paquete_" + obj.key_paquete;
            if (!paquete) {
                return <Text>{JSON.stringify(obj)}</Text>
            }
            return <TouchableOpacity style={{
                width: "96%",
                backgroundColor: "#66000044",
                height: 50,
                marginBottom: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
            }} onPress={() => {
                // if (obj.url) {
                // console.log(obj)
                // this.props.navigation.navigate("PaqueteRegistroPage", {
                //     key: key,
                // });
                // }
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    flexDirection: "row",
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 4,
                        overflow: "hidden",
                        width: 40,
                        height: 40,
                        backgroundColor: "#ff999933"
                    }}>
                        {this.props.state.imageReducer.getImage(urlImagePaquete, {
                            resizeMode: "cover",
                            objectFit: "cover"
                        })}
                    </View>
                    <View style={{
                        flex: 4,
                        height: 20,
                        justifyContent: "center",
                        // alignItems: "center"
                        paddingStart: 8,
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 14,
                        }}>{paquete.descripcion}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        height: 20,
                        justifyContent: "center",
                        // alignItems: "center"
                        paddingStart: 8,
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 14,
                        }}>Bs. {(paquete.precio).toLocaleString('en-IN')}</Text>
                    </View>

                    <View style={{
                        flex: 2,
                        justifyContent: "center",
                        // alignItems: "center"
                        paddingStart: 8,
                    }}>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 10,
                        }}>Desde: {SDateFormat(obj.fecha_inicio)}</Text>
                        <Text style={{
                            color: "#ffffff",
                            fontSize: 10,
                        }}>Hasta: {SDateFormat(obj.fecha_fin)}</Text>
                    </View>
                </View>



            </TouchableOpacity>
        })
    }
    getBtnAdd = () => {
        return <TouchableOpacity style={{
            width: "96%",
            backgroundColor: "#66000044",
            height: 50,
            marginBottom: 8,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
        }} onPress={() => {
            this.props.navigation.navigate("PaquetePage", {
                type: "registro_paquete",
                key_usuario: this.props.key_usuario,
            });
        }}>
            <Text style={{
                color: "#fff",
                textDecorationLine: "underline",
            }}>Nuevo paquete</Text>
        </TouchableOpacity>
    }
    render() {

        return (
            <View style={{
                width: "100%",
                alignItems: "center",
                marginTop: 16,
            }}>
                {this.getBtnAdd()}
                {this.getLista()}
            </View>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PaquetesDeUsuario);