import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../../../Actions';
import AppParams from '../../../../Params';
import { SInput, SPopup, SPopupClose, SPopupOpen, SText, SView } from '../../../../SComponent';
import Svg from '../../../../Svg/index';
import BancoSelect from '../../../Banco/BancoSelect';
type TiposDePagoType = {
    value: String,
    preventEdit: Boolean,
    onChange: (tipoPago) => {},
    movimientos?: any,
}
class TiposDePago extends Component<TiposDePagoType> {
    constructor(props) {
        super(props);
        this.state = {
            cuenta: {}
        };
    }
    getAll() {
        var reducer = this.props.state.tipoPagoReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            var object = {
                component: "tipoPago",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return false;
        }
        return data;
    }
    getMonto(obj) {
        var total = 0;
        if (!this.props.movimientos) {
            return <View />
        }

        Object.keys(this.props.movimientos).map((key) => {
            var mov = this.props.movimientos[key];
            if (mov.data.key_tipo_pago == obj.key) {
                total += mov.monto;
            }
        })
        return <SView style={{
            width: "100%",
            height: 50,
            backgroundColor: "#66000088",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
        }} >
            <SText>Bs. {total}</SText>
        </SView>
    }
    getLista() {
        var data = this.getAll();
        var sucursalTipoPagoCuentaBanco = Actions.SucursalTipoPagoCuentaBanco.getByKeySucursal(this.props.key_sucursal, this.props);
        var cuentaBanco = Actions.CuentaBanco.getAll(this.props);
        if (!data) return <ActivityIndicator color={"#fff"} />
        if (!sucursalTipoPagoCuentaBanco) return <ActivityIndicator color={"#fff"} />
        if (!cuentaBanco) return <ActivityIndicator color={"#fff"} />

        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj) {
                var Icono;
                switch (obj.key) {
                    case "1": Icono = <Svg name={"money"} style={{ width: "100%", height: "100%" }} />; break;
                    case "2": Icono = <Svg name={"card"} style={{ width: "100%", height: "100%" }} />; break;
                    case "3": Icono = <Svg name={"qr"} style={{ width: "100%", height: "100%" }} />; break;
                    case "4": Icono = <Svg name={"cheque"} style={{ width: "100%", height: "100%" }} />; break;
                }

                if (!this.state.cuenta[key]) this.state.cuenta[key] = {};
                var cuenta = sucursalTipoPagoCuentaBanco[obj.key];
                if (cuenta) {
                    if (cuentaBanco[cuenta.key_cuenta_banco]) {
                        this.state.cuenta[key] = cuentaBanco[cuenta.key_cuenta_banco];
                    }
                }
                return <SView col={"xs-12"} row style={{
                    marginTop: 8,
                }}>
                    <SView props={{
                        col: "xs-3 md-2",
                        variant: ["center"]
                    }} style={{
                        height: 95,
                    }}>
                        <SView
                            props={{
                                variant: "center"
                            }}
                            style={{
                                padding: 0,
                                margin: 0,
                                width: "60%",
                                height: "60%",
                                borderRadius: 4,
                                // backgroundColor: "#66000044"
                            }}>
                            {Icono}
                        </SView>
                        <SText style={{
                            color: "#fff",
                            textAlign: "center",
                            textTransform: "capitalize"
                        }}>{obj.descripcion}</SText>

                    </SView>
                    <SView flex style={{
                        height: "100%",
                    }}>
                        <SInput
                            props={{
                                label: `${this.state.cuenta[key].descripcion}`,
                                type: "select",
                                customStyle: "calistenia",
                                isRequired: true,
                                placeholder: "Cuenta",
                                style: {
                                    height: 50,
                                },
                                value: this.state.cuenta[key].codigo,
                                col: "xs-11.5",
                                onPress: () => {
                                    if (this.props.preventEdit) return;
                                    SPopupOpen({
                                        key: "selectbanco",
                                        content: <BancoSelect onSelect={(cuenta_banco) => {
                                            SPopupClose("selectbanco");
                                            if (!this.props.preventEdit) {
                                                if (!cuenta) {
                                                    Actions.SucursalTipoPagoCuentaBanco.registro({
                                                        key_sucursal: this.props.key_sucursal,
                                                        key_tipo_pago: obj.key,
                                                        key_cuenta_banco: cuenta_banco.key
                                                    }, this.props)
                                                } else {
                                                    Actions.SucursalTipoPagoCuentaBanco.editar({
                                                        ...cuenta,
                                                        key_cuenta_banco: cuenta_banco.key
                                                    }, this.props)
                                                }
                                            }

                                            this.state.cuenta[key] = cuenta_banco;
                                            this.setState({ ...this.state });
                                        }} />
                                    })
                                    // this.props.navigation.navigate("BancoPage", {
                                    //     onSelect: (cuenta) => {

                                    //     }
                                    // });
                                },
                            }} />
                    </SView>
                    <SView col={"xs-2"} center style={{
                        height: "100%",
                        paddingTop:16,
                    }}>
                        {this.getMonto(obj)}
                    </SView>
                </SView>
            }
        })
    }
    render() {
        return (
            <SView props={{
                col: "xs-11.8",
                variant: "center",
            }} center>
                {this.getLista()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDePago);