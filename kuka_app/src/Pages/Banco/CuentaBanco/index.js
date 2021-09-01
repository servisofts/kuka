import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SView, SText } from '../../../SComponent';
import AppParams from '../../../Params/index';
let component = "cuentaBanco";

class CuentaBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAll = () => {
        var reducer = this.props.state.cuentaBancoReducer;
        var keyBanco = this.props.data.key;
        if (!reducer.data[keyBanco]) {
            if (reducer.estado == "cargando") {
                return <Text>Cargando</Text>;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: component,
                type: "getAllByKeyBanco",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_banco: this.props.data.key,
                estado: "cargando"
            }, true);
            return <View />
        }

        var data = reducer.data[keyBanco];
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) return <View />
            return (
                <SView col={"xs-12"} key={obj.key} style={{
                    height: 60,
                    borderRadius: 4,
                    marginBottom: 8,
                    backgroundColor: "#66000044",
                }} onPress={() => {
                    this.props.navigation.navigate("CuentaBancoRegistroPage", { key_banco: this.props.data.key, key: obj.key });
                }} row>
                    <SView style={{
                        width: 60,
                        height: 60,
                    }} center>
                        <SView style={{
                            width: 45,
                            height: 45,
                            borderRadius: 8,
                            overflow: "hidden"
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + component + "_" + obj.key, {
                            })}
                        </SView>

                    </SView>
                    <SView style={{
                        height: "100%",
                        justifyContent: "center",
                    }}>
                        <SText style={{
                            fontSize: 16,
                        }} >{obj.descripcion}</SText>
                        <SText style={{
                        }} >{obj.codigo}</SText>
                    </SView>
                </SView>
            );
        })

    }
    render() {
        if (!this.props.data) {
            return <View />
        }

        return (
            <SView col={"xs-12"} center style={{
                marginTop: 20,
            }}>
                <SView col={"xs-12 md-7 xl-6"} center >
                    <SView col={"xs-12"} style={{
                        height: 60,
                        borderRadius: 4,
                        marginBottom: 8,
                        backgroundColor: "#66000044",
                    }} onPress={() => {
                        this.props.navigation.navigate("CuentaBancoRegistroPage", { key_banco: this.props.data.key });
                    }} center>
                        <SText>Nueva cuenta</SText>
                    </SView>

                    {this.getAll()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaBanco);