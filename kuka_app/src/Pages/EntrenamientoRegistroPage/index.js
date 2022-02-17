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
import SSCrollView from '../../Component/SScrollView';



class EntrenamientoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            usuario: false,
            sucursal: false,
        };
    }
    componentDidMount() {
        this.props.dispatch({
            component: "image",
            type: "cambio",
            url: AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key,
        })
    }

    getUsuario() {
        return <TouchableOpacity style={{
            width: "100%",
            height: 50,
            marginTop: 8,
            backgroundColor: "#ffffff66",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => {
            this.props.navigation.navigate("EntrenadorPage", {
                onSelect: (data) => {
                    this.setState({ usuario: data })
                }
            })
        }}>
            <Text>{(!this.state.usuario ? "Click para seleccionar el entrenador" : this.state.usuario["Nombres"])}</Text>
        </TouchableOpacity>
    }
    getSucursal() {
        return <TouchableOpacity style={{
            width: "100%",
            height: 50,
            marginTop: 8,
            backgroundColor: "#ffffff66",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => {
            this.props.navigation.navigate("SucursalPage", {
                onSelect: (data) => {
                    this.setState({ sucursal: data })
                }
            })
        }}>
            <Text>{(!this.state.sucursal ? "Click para seleccionar la sucursal" : this.state.sucursal["descripcion"])}</Text>
        </TouchableOpacity>
    }
    getHoraInicio() {
        return <TouchableOpacity style={{
            width: "100%",
            height: 50,
            marginTop: 8,
            backgroundColor: "#ffffff66",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => {

        }}>
            <Text>{"HORA"}</Text>
        </TouchableOpacity>
    }
    getIniciar() {
        return <TouchableOpacity style={{
            width: 100,
            height: 50,
            marginTop: 8,
            backgroundColor: "#66000099",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => {
            var isValid = true;
            if (!this.state.usuario) {
                alert("Inserte el entrenador")
                isValid = false;
            }
            if (!this.state.sucursal) {
                alert("Inserte la sucursal")
                isValid = false;
            }
            if (!isValid) {
                return false;
            }

            var objSend = {
                component: "entrenamiento",
                type: "registro",
                estado: "cargando",
                data: {
                    key_usuario: this.state.usuario.key,
                    key_sucursal: this.state.sucursal.key,
                    fecha_inicio: "2020-07-06 03:30"
                }
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(objSend, true);
        }}>
            <Text style={{
                color: "#fff"
            }}>{"Iniciar"}</Text>
        </TouchableOpacity>
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
                <BarraSuperior duration={500} title={"Agregar entrenamiento"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />

                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <SSCrollView>
                        <Text style={{
                            color: "#fff"
                        }}>Programa un nuevo entrenamiento</Text>

                        {this.getUsuario()}
                        {this.getSucursal()}
                        {this.getHoraInicio()}
                        {this.getIniciar()}

                    </SSCrollView>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EntrenamientoRegistroPage);