import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import { SText, SView } from '../../../SComponent';
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
    getSelect(obj) {
        if (!this.props.onChange) {
            return <View />
        }
        if (this.props.value) {
            if (obj.key == this.props.value.key) {
                return <View />
            }
        }

        return <SView style={{
            position: "absolute",
            width: "90%",
            height: "90%",
            backgroundColor: "#000000aa",
            borderRadius: 8,
        }} onPress={() => {
            this.props.onChange(obj)
        }}>

        </SView>
    }
    getLista() {
        var data = this.getAll();
        if (!data) return <ActivityIndicator color={"#fff"} />

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

                return <SView props={{
                    col: "xs-3",
                    variant: ["col-square", "center"]
                }} style={{
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
                            backgroundColor: "#66000044"
                        }}>
                        {Icono}
                    </SView>
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