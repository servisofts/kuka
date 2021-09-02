import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import { connect } from 'react-redux';
import SSCrollView from '../../Component/SScrollView';
import ProcesoPerfil from './ProcesoPerfil';
import ProcesoMovimientos from './ProcesoMovimientos';
import ProcesoMensaje from './ProcesoMensaje';
import ProcesoTipoSeguimiento from './ProcesoTipoSeguimiento';

class ProcesoPerfilPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.data = props.navigation.state.params.data;
    }
    render() {
        var data= this.props.state.procesoReducer.data[this.data.key_modulo][this.data.key];
        if(!data || !data.estado){
            this.props.navigation.goBack();
        }
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
            }}>
                <BarraSuperior duration={500} title={"Proceso"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <BackgroundImage />
                    {/* <View style={{
                        width: "95%",
                        borderRadius: 8,
                        height: "95%",
                        maxWidth: 600,
                        backgroundColor: "#66000022",
                        alignItems: "center",
                        position: "absolute",
                        overflow: "hidden",

                    }}> */}
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={keyboardVerticalOffset} style={{
                        flex: 1,
                        height: "100%",
                        width: "100%",
                    }}>
                        <SSCrollView>
                            <ProcesoPerfil data={this.data} navigation={this.props.navigation} />
                            <View style={{
                                height:30,
                            }}></View>
                            <ProcesoMovimientos data={this.data} navigation={this.props.navigation} />
                            <View style={{
                                height:100,
                            }}></View>
                            <ProcesoMensaje data={this.data} navigation={this.props.navigation} />

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
export default connect(initStates)(ProcesoPerfilPage);