import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../../Component/BackgroundImage';
import AppParams from '../../../Params';
import { SButtom, SInput, SScrollView2, SText, SView } from '../../../SComponent';
import SPopup, { SPopupClose, SPopupOpen } from '../../../SComponent/SPopup';
import Svg from '../../../Svg/index';
type TiposDePagoType = {
    value: String,
    onChange: (tipoPago) => {}
}
class TiposDePago extends Component<TiposDePagoType> {
    constructor(props) {
        super(props);
        this.state = {

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
    getListaCamposRequeridos() {
        if (!this.state.tipoPago) {
            return <View />
        }
        this.camposInputs = {};
        return this.state.tipoPago.data.map((campo) => {
            var value = "";
            if (this.props.tipoPago) {
                var obj = this.state.tipoPago;
                if (this.props.tipoPago[obj.key]) {
                    value = this.props.tipoPago[obj.key][campo.dato];
                }
            }
            if (!value) {
                if (campo.dato == "monto") {
                    if (this.props.calcularFaltante) {
                        value = parseFloat(this.props.paquete.precio) - this.props.calcularFaltante();
                    }
                }
            }
            if (value) {
                value = parseFloat(value);
                if (value % 1 != 0) { value = value.toFixed(2) }
            }
            return <SInput
                ref={(ref) => { this.camposInputs[campo.dato] = ref; }}
                defaultValue={value + ""}
                selectTextOnFocus={true}
                props={{
                    col: "xs-12",
                    label: campo.dato,
                    customStyle: "calistenia",
                    type: campo.type,
                    isRequired: campo.requerido
                }}
            />
        })
    }
    getCamposRequeridos() {
        if (!this.state.tipoPago) return <View />
        return (<SView props={{
            col: "xs-12",
            direction: "row",
        }} center>
            {this.getListaCamposRequeridos()}
            <SView style={{ width: "100%", height: 16 }}></SView>
            <SView col={"xs-12"} row >
                <SView col={"xs-6"} center>
                    <SButtom props={{
                        type: "danger"
                    }} onPress={() => {
                        this.state.value[this.state.tipoPago.key] = false;
                        this.props.setTipoPago(false);
                        SPopupClose("dataPago")
                    }}>
                        Limpiar
                    </SButtom>
                </SView>
                <SView col={"xs-6"} center>
                    <SButtom props={{
                        type: "outline"
                    }} onPress={() => {
                        var IsValid = true;
                        var dataFinal = {};
                        var key_tipo_pago = null;
                        // if (this.paquete.precio > 0) {
                        key_tipo_pago = this.state.tipoPago.key
                        this.state.tipoPago.data.map((campo) => {
                            var imput: SInput = this.camposInputs[campo.dato];
                            if (!imput.verify()) {
                                IsValid = false;
                            }
                            dataFinal[campo.dato] = imput.getValue();
                        })
                        if (!IsValid) {
                            // alert("Faltan Datos");
                            return;
                        }
                        if (this.props.setTipoPago) {
                            this.state.value[key_tipo_pago] = dataFinal;
                            this.props.setTipoPago(this.state.value);
                            SPopupClose("dataPago")
                        }
                        // }
                    }}>Confirmar</SButtom>
                </SView>

            </SView>
            <SView style={{ width: "100%", height: 16 }}></SView>
        </SView>)
    }
    openPopup(tipoPago) {
        this.state.tipoPago = tipoPago;
        SPopupOpen({
            key: "dataPago",
            content: (<SView col={"xs-11 md-8 xl-6"} style={{
                height: 600,
                maxHeight: "90%",
                borderRadius: 8,
                overflow: "hidden"
            }} center withoutFeedback>
                <BackgroundImage />
                <SScrollView2 disableHorizontal>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11"} center>
                            {this.getCamposRequeridos()}
                        </SView>
                    </SView>
                </SScrollView2>
            </SView>)
        })
    }
    getSelect(obj) {
        if (this.props.tipoPago) {
            if (this.props.tipoPago[obj.key]) {
                // if (obj.key == this.props.value.key) {
                return <SView style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 50,
                    height: 20,
                    backgroundColor: "#66000066",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                }} onPress={() => {
                    // this.props.onChange(obj)
                    this.openPopup(obj)
                }}>
                    <SText>Bs. {this.props.tipoPago[obj.key].monto}</SText>
                </SView>
                // }
            }
        }

        // if (this.state.value[obj.key]) {
        //     return <View />
        // }

        return <SView style={{
            position: "absolute",
            width: "90%",
            height: "90%",
            backgroundColor: "#000000aa",
            borderRadius: 8,
        }} onPress={() => {
            // this.props.onChange(obj)
            this.openPopup(obj)
        }}>

        </SView>
    }
    getLista() {
        var data = this.getAll();
        if (!data) return <ActivityIndicator color={"#fff"} />
        if (!this.state.value) {
            this.state.value = {};
        }
        return Object.keys(data).map((key) => {
            // this.state.tipoPago[]
            if (!this.state.value[key]) {
                this.state.value[key] = false
            }
            var obj = data[key];
            if (obj) {
                var Icono;
                switch (obj.key) {
                    case "1": Icono = <Svg name={"money"} style={{ width: "100%", height: "100%" }} />; break;
                    case "2": Icono = <Svg name={"card"} style={{ width: "100%", height: "100%" }} />; break;
                    case "3": Icono = <Svg name={"qr"} style={{ width: "100%", height: "100%" }} />; break;
                    case "4": Icono = <Svg name={"cheque"} style={{ width: "100%", height: "100%" }} />; break;
                }

                return <SView props={{
                    col: "xs-3",
                    variant: ["col-square", "center"]
                }} style={{
                }}>
                    <SView
                        props={{
                            variant: "center"
                        }}
                        onPress={() => {
                            // this.props.onChange(obj)
                            this.openPopup(obj)
                        }}
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "60%",
                            height: "60%",
                            borderRadius: 4,
                            backgroundColor: "#66000044"
                        }}>
                        {Icono}
                    </SView >
                    <SText style={{
                        color: "#fff",
                        textAlign: "center"
                    }}>{obj.descripcion}</SText>

                    {this.getSelect(obj)}
                </SView>
            }
        })
    }
    render() {
        if (!this.props.usuario) return <View />
        if (!this.props.paquete) return <View />
        if (!this.props.paquete.precio) return <View />
        if (this.props.paquete.precio <= 0) return <View />
        return (
            <SView props={{
                col: "xs-12",
                variant: "center",
                direction: "row",
            }}>
                {this.getLista()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDePago);