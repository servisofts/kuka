import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SView, SText } from '../../../SComponent';
import AppParams from '../../../Params/index';
let component = "cuentaBanco";

class CuentaBancoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAllMovimientos = (key_cuenta_banco) => {
        var reducer = this.props.state["cuentaBancoMovimientoReducer"];
        if (!reducer.data[key_cuenta_banco]) {
            if (reducer.estado == "cargando") {
                return false;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "cuentaBancoMovimiento",
                type: "getAllByKeyCuentaBanco",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_cuenta_banco: key_cuenta_banco,
                estado: "cargando"
            }, true);
            return false;
        }
        var data = reducer.data[key_cuenta_banco];
        return data;
    }
    getTotal(key_cuenta_banco) {
        var data = this.getAllMovimientos(key_cuenta_banco);
        if (!data) return "0";
        var total = 0;
        Object.keys(data).map((key) => {
            total += data[key].monto;
        })
        return total + "";
    }
    getAll = () => {
        var reducer = this.props.state.cuentaBancoReducer;
        var keyBanco = this.props.key_banco;
        if (!reducer.data[keyBanco]) {
            if (reducer.estado == "cargando") {
                return <Text>Cargando</Text>;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: component,
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_banco: this.props.key_banco,
                estado: "cargando"
            }, true);
            return <Text></Text>;
        }

        var data = reducer.data[keyBanco];
        if (!data) {
            return <Text></Text>;
        }
        // return Object.keys(data).map((key) => {
        var obj = data[this.props.key_cuenta_banco];
        if (obj.estado == 0) return <View />
        return (
            <SView col={"xs-11 md-7 xl-6"} key={obj.key} style={{
                height: 50,
                padding: 4,
            }} onPress={() => {
                // this.props.navigation.navigate("CuentaMovimientosPage", { key_banco: this.props.data.key, key: obj.key });
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
                    <SView style={{
                        width: 60,
                        height: 40,
                    }} center >
                        <SView style={{
                            width: 55,
                            height: 35,
                            borderRadius: 4,
                            borderWidth: 1,
                            overflow: "hidden",
                            borderColor: "#ffffff44"
                        }} center>
                            <SText>{this.getTotal(obj.key)}</SText>
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
        // })

    }
    render() {
        if (!this.props.key_banco) {
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
export default connect(initStates)(CuentaBancoItem);