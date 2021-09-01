import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../../../../../Actions';
import AppParams from '../../../../../../Params';
import { SButtom, SInput, SPopup, SPopupClose, SPopupOpen, SText, SView } from '../../../../../../SComponent';
import Svg from '../../../../../../Svg/index';
import BancoSelect from '../../../../../Banco/BancoSelect';
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
            cantDecimal: 2,
            cuenta: {},
            total_salvar: {},
            total_depocito: {},
            enabledClose: true,
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
    getMontoTotalEnDepocito() {
        var total = 0;
        if (!this.state.total_depocito) {
            return 0;
        }
        Object.keys(this.state.total_depocito).map((key) => {
            total += parseFloat(this.state.total_depocito[key]);
        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getMontoTotalSalvar() {
        var total = 0;
        if (!this.state.total_salvar) {
            return 0;
        }
        Object.keys(this.state.total_salvar).map((key) => {
            total += parseFloat(this.state.total_salvar[key]);
        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getMontoTotalEnCaja() {
        var total = 0;
        if (!this.props.movimientos) {
            return 0;
        }

        Object.keys(this.props.movimientos).map((key) => {
            var mov = this.props.movimientos[key];
            total += mov.monto;
        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getMonto(obj) {
        var total = 0;
        if (!this.props.movimientos) {
            return 0;
        }

        Object.keys(this.props.movimientos).map((key) => {
            var mov = this.props.movimientos[key];
            if (!mov.data) {
                if ("1" == obj.key) {
                    total += parseFloat(mov.monto);
                }
            } else {
                if (mov.data.key_tipo_pago == obj.key) {
                    total += parseFloat(mov.monto);
                }
            }

        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getEnabledClose() {
        if (!this.state.enabledClose) {
            return <SText>
                <Text>
                    {"No existen cuentas para esta sucursal."}
                </Text>
            </SText>
        }
        return <SButtom props={{
            type: "danger",
            variant: "confirm",
        }} onPress={() => {
            if (this.props.onPress) this.props.onPress();
        }}>Cerrar</SButtom>
    }
    getDetallePago(obj) {
        if (obj.key == "2" || obj.key == "3" || obj.key == "4") {
            this.state.total_depocito[obj.key] = 0;
            if (obj.key == "4") {
                this.state.total_depocito[obj.key] = this.getMonto(obj);
            }
            return <SView col={"xs-12"} style={{
                justifyContent: "flex-end",
            }} row>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {this.getMonto(obj)}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto en caja`}</SText>
                </SView>
                <SView col={"xs-4"} center>
                </SView>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {this.state.total_depocito[obj.key]}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto a depocitar`}</SText>
                </SView>
            </SView>
        } else {
            var monto = this.getMonto(obj);
            var montoASalvar = 200;
            if (monto < montoASalvar) {
                montoASalvar = monto;
            }

            this.state.total_salvar[obj.key] = montoASalvar;
            this.state.total_depocito[obj.key] = monto - montoASalvar;
            if (this.state.total_depocito[obj.key] % 1 > 0) {
                this.state.total_depocito[obj.key] = this.state.total_depocito[obj.key].toFixed(this.state.cantDecimal);
            }
            return <SView col={"xs-12"} style={{
                justifyContent: "flex-end",
            }} row>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {monto}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto en caja`}</SText>
                </SView>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {montoASalvar}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto a salvar`}</SText>
                </SView>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {this.state.total_depocito[obj.key]}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto a depocitar`}</SText>
                </SView>
            </SView>
        }

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
                        if(!cuentaBanco[cuenta.key_cuenta_banco]){
                            this.state.enabledClose = false;
                        }
                    }
                }
                return <SView col={"xs-12"} >
                    <SView col={"xs-12"} row style={{
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
                            {/* 
                        ${this.state.cuenta[key].descripcion} 
                        ${this.state.cuenta[key].codigo} 
                        */}
                            <SText style={{ fontSize: 14 }}>{`${this.state.cuenta[key].codigo}`}</SText>
                            <SText style={{ fontSize: 10 }}>{`${this.state.cuenta[key].descripcion}`}</SText>
                            <SView col={"xs-12"} style={{
                                height: 50,
                                justifyContent: "flex-end"
                            }} >
                                {this.getDetallePago(obj)}
                            </SView>
                        </SView>
                        {/* <SView col={"xs-2"} center style={{
                        height: "100%",
                        paddingTop: 16,
                    }}>
                        <SView style={{
                            width: "100%",
                            height: 50,
                            backgroundColor: "#66000088",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                        }} >
                            <SText>Bs. {this.getMonto(obj)}</SText>
                        </SView>

                    </SView> */}

                    </SView>
                    <SView col={"xs-12"} style={{ height: 16, borderTopWidth: 1, borderColor: "#66666644" }} />
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

                <SView col={"xs-12"} >
                    <SView col={"xs-12"} row style={{
                    }}>
                        <SView props={{
                            col: "xs-3 md-2",

                        }} center style={{
                            height: "100%",
                        }}>
                            <SText style={{ fontSize: 20 }}>Total</SText>
                        </SView>
                        <SView flex style={{
                            height: "100%",
                        }}>

                            <SView col={"xs-12"} style={{
                                height: 50,
                                justifyContent: "center"
                            }} >
                                <SView col={"xs-12"} style={{
                                    justifyContent: "center",
                                }} row>
                                    <SView col={"xs-4"} center>
                                        <SText style={{ fontSize: 16 }}>Bs. {this.getMontoTotalEnCaja()}</SText>
                                        <SText style={{ fontSize: 10, color: "#999" }}>{`Total en caja`}</SText>
                                    </SView>
                                    <SView col={"xs-4"} center>
                                        <SText style={{ fontSize: 16 }}>Bs. {this.getMontoTotalSalvar()}</SText>
                                        <SText style={{ fontSize: 10, color: "#999" }}>{`Total a salvar`}</SText>
                                    </SView>
                                    <SView col={"xs-4"} center>
                                        <SText style={{ fontSize: 16 }}>Bs. {this.getMontoTotalEnDepocito()}</SText>
                                        <SText style={{ fontSize: 10, color: "#999" }}>{`Total a depocitar`}</SText>
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                    <SView col={"xs-12"} style={{ height: 16, borderTopWidth: 1, borderColor: "#66666644" }} />

                    <SView col={"xs-12"} center style={{
                        height: 80,
                    }}>
                        {this.getEnabledClose()}
                    </SView>
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDePago);