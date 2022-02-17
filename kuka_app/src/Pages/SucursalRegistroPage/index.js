import React, { Component } from 'react';
import { View, Text } from 'react-native';
import InputDireccion from '../BuscarDireccionPage/InputDireccion';
import ActionButtom from '../../Component/ActionButtom';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import FotoPerfilComponent from '../../Component/FotoPerfilComponent';
import SSCrollView from '../../Component/SScrollView';
import { connect } from 'react-redux';
import Parametros from './Parametros';

var styleImput = {
    width: "80%",
    padding: 8,
    height: 50,
    margin: 8,
    color: "#fff",
    backgroundColor: "#ffffff22",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
}

class SucursalRegistroPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        }
    }
    constructor(props) {
        super(props);
        this.state = {
        };

        var key = this.props.navigation.getParam("key", false);
        this.TextButom = "CREAR";
        this.data = {};
        if (key) {
            this.TextButom = "EDITAR";
            this.data = this.props.state.sucursalReducer.data[key];
            this.data.key = key;
            if (!this.data) {
                alert("NO HAY DATA");
            }
        }
        console.log(this.data)
        this.imputs = {
            descripcion: new STextImput({
                placeholder: "descripcion",
                defaultValue: this.data["descripcion"],
                style: styleImput
            }),
        }
    }

    render() {
        if (this.props.state.sucursalReducer.estado == "exito" && this.props.state.sucursalReducer.type == "registro") {
            this.props.state.sucursalReducer.estado = ""
            this.props.navigation.goBack();
        }
        if (this.props.state.sucursalReducer.estado == "exito" && this.props.state.sucursalReducer.type == "editar") {
            this.props.state.sucursalReducer.estado = ""
            this.props.navigation.goBack();
        }
        return (
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "#000"
            }}>
                <BackgroundImage />

                <BarraSuperior duration={500} title={(!this.data.key ? "Registro de " : "Editar") + " sucursal"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} {...this.props} />
                <View style={{
                    width: "100%",
                    flex: 1,
                }}>

                    <SSCrollView style={{
                        width: "100%",
                        height: "100%"

                    }} >

                        <View style={{
                            width: "100%",
                            // maxWidth: 600,
                            alignItems: 'center',
                            // justifyContent: 'center',
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 16,
                            }}>{!this.data.key ? "Registra " : "Edita "} una sucursal</Text>
                            <View style={{
                                width: "100%",
                                maxWidth: 600,
                                alignItems: 'center',
                                // justifyContent: 'center',
                            }}>

                                {!this.data.key ? <View /> : <View style={{
                                    width: 150,
                                    height: 150,
                                }}><FotoPerfilComponent data={this.data} component={"sucursal"} />
                                </View>}

                                {Object.keys(this.imputs).map((key) => {
                                    return this.imputs[key].getComponent();
                                })}


                            </View>
                            <InputDireccion
                                ref={(ref) => { this.direccion = ref }}
                                navigation={this.props.navigation}
                                defaultValue={this.data}
                                label={"Ubicacion de la sucursal"}
                                style={styleImput}
                            />
                            <View style={{
                                flex: 1,
                                width: "90%",
                                maxWidth: 600,
                                justifyContent: 'center',
                                flexDirection: "row",
                            }}>
                                <ActionButtom label={this.props.state.sucursalReducer.estado == "cargando" ? "cargando" : this.TextButom}
                                    onPress={() => {
                                        if (this.props.state.sucursalReducer.estado == "cargando") {
                                            return;
                                        }
                                        var isValid = true;
                                        var objectResult = {};
                                        Object.keys(this.imputs).map((key) => {
                                            if (this.imputs[key].verify() == false) isValid = false;
                                            objectResult[key] = this.imputs[key].getValue();
                                        })

                                        var direccion = this.direccion.getValue();

                                        if (!direccion) {
                                            this.direccion.setError(true);
                                            isValid = false;
                                        }
                                        objectResult = { ...objectResult, ...direccion }

                                        if (!isValid) {
                                            this.setState({ ...this.state });
                                            return;
                                        }
                                        var object = {
                                            component: "sucursal",
                                            type: !this.data.key ? "registro" : "editar",
                                            estado: "cargando",
                                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                            data: {
                                                ...this.data,
                                                ...objectResult,
                                            },
                                        }
                                        // alert(JSON.stringify(object));
                                        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                                    }}
                                />
                            </View>
                            <Parametros data={this.data} />
                        </View>
                    </SSCrollView>

                </View>

            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SucursalRegistroPage);