import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SView, SText } from '../../../SComponent';
import AppParams from '../../../Params/index';
let component = "cuentaBanco";

class CuentaBancoLista extends Component {
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
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_banco: this.props.data.key,
                estado: "cargando"
            }, true);
            return <Text></Text>;
        }

        var data = reducer.data[keyBanco];
        if (!data) {
            return <Text></Text>;
        }
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) return <View />
            return (
                <SView col={"xs-6 md-4"} key={obj.key} style={{
                    height: 50,
                    padding: 4,
                }} onPress={() => {
                    if (this.props.onSelect) {
                        this.props.onSelect(obj);
                        return;
                    }
                    this.props.navigation.navigate("CuentaMovimientosPage", { key_banco: this.props.data.key, key: obj.key });
                }}>
                    <SView style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 4,
                        backgroundColor: "#66000044",
                    }} row>
                        <SView style={{
                            flex: 1,
                            height: "100%",
                            justifyContent: "center",
                            paddingStart: 4,
                            // alignItems: "center",
                        }}>
                            <SText style={{
                            }} >{obj.descripcion}</SText>
                            <SText style={{
                                fontSize: 10,
                            }} >{obj.codigo}</SText>
                        </SView>
                      
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
            <SView col={"xs-12"} center row >
                {this.getAll()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaBancoLista);