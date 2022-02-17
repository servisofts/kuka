import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import { connect } from 'react-redux';
import SSCrollView from '../../Component/SScrollView';
import ProcesoTipoSeguimiento from './ProcesoTipoSeguimiento';
import STextImput from '../../Component/STextImput';
import ActionButtom from '../../Component/ActionButtom';

class ProcesoSeguimietoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.data = props.navigation.state.params.data;
        var styleImput = {
            width: "80%",
            padding: 8,
            height: 50,
            margin: 8,
            color: "#fff",
            backgroundColor: "#66000022",
            borderWidth: 1,
            borderColor: "#ffffff11",
            borderRadius: 8,
        }

        this.imputs = {
            descripcion: new STextImput({
                placeholder: "Titulo",
                // defaultValue: this.data["Nombres"].dato,
                // autoCapitalize: "none",
            
                style: styleImput
            }),
            observacion: new STextImput({
                placeholder: "Observacion",
                // defaultValue: this.data["Nombres"].dato,
                // autoCapitalize: "none",
                multiline: true,
                style: { ...styleImput, height: 100 }
            }),
            precio: new STextImput({
                placeholder: "Precio en $",
                type: "Monto",
                
                // defaultValue: this.data["Nombres"].dato,
                // autoCapitalize: "none",
                style: { ...styleImput, width: 120 }
            }),
        }
    }
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0

        if (this.props.state.procesoSeguimientoReducer.estado == "exito" && this.props.state.procesoSeguimientoReducer.type == "registro") {
            this.props.state.procesoSeguimientoReducer.estado = "";
            this.props.navigation.goBack();
        }
        if (this.props.state.procesoSeguimientoReducer.estado == "exito" && this.props.state.procesoSeguimientoReducer.type == "editar") {
            this.props.state.procesoSeguimientoReducer.estado = "";
            this.props.navigation.goBack();
        }
        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
            }}>
                <BarraSuperior duration={500} title={"Negociacion"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <BackgroundImage />
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={keyboardVerticalOffset} style={{
                        flex: 1,
                        height: "100%",
                        width: "100%",
                    }}>
                        <SSCrollView>
                            {/* <ProcesoTipoSeguimiento/> */}
                            {Object.keys(this.imputs).map((key) => {
                                return this.imputs[key].getComponent();
                            })}
                            <ProcesoTipoSeguimiento data={this.data} onChange={(value) => {
                                this.tipoSeguimiento = value;
                            }} />
                            <ActionButtom label={this.props.state.procesoSeguimientoReducer.estado == "cargando" ? "cargando" : "Crear"}
                                onPress={() => {
                                    if (this.props.state.procesoSeguimientoReducer.estado == "cargando") {
                                        return;
                                    }
                                    var isValid = true;
                                    var objectResult = {};

                                    Object.keys(this.imputs).map((key) => {
                                        if (this.imputs[key].verify() == false) isValid = false;
                                        if(this.imputs[key].getValue()){
                                            objectResult[key] =this.imputs[key].getValue() ;
                                        }
                                        
                                    })
                                    if (!this.tipoSeguimiento) {
                                        alert("Seleccione un tipo de seguimineto");
                                        isValid = false;
                                    }
                                    if (!isValid) {
                                        this.setState({ ...this.state });
                                        return;
                                    }
                                    objectResult.key_proceso = this.data.key;
                                    objectResult.key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
                                    objectResult.key_tipo_seguimiento = this.tipoSeguimiento.key;
                                    var object = {
                                        component: "procesoSeguimiento",
                                        type: "registro",
                                        estado: "cargando",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_proceso: this.data.key,
                                        data: objectResult,
                                    }
                                    // alert(JSON.stringify(object));
                                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                                }}
                            />
                        </SSCrollView>
                    </KeyboardAvoidingView>
                    {/* </View> */}
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesoSeguimietoRegistroPage);