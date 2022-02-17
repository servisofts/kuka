import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../../Component/Page';
import AppParams from '../../../Params';
import { SScrollView2, SText, SView } from '../../../SComponent';
import Svg from '../../../Svg/index';
class TipoPagoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
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
                    col: "xs-11 md-7 xl-4",
                    direction: "row"
                }} style={{
                    marginTop: 8,
                    height: 50,
                    backgroundColor: "#66000044",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView
                        props={{
                            variant: "center"
                        }}
                        style={{
                            padding: 0,
                            margin: 0,
                            width: 45,
                            height: 45,
                            borderRadius: 4,
                            backgroundColor: "#66000044"
                        }}>
                        {Icono}
                    </SView>
                    <SView style={{
                        flex: 1,
                    }}>
                        {/* <SText style={{ marginStart: 8, color: "#fff" }}>{obj.key}</SText> */}
                        <SText style={{ marginStart: 8, color: "#fff" }}>{obj.descripcion}</SText>
                    </SView>
                </SView >
            }
        })

    }
    render() {

        return (<Page navigation={this.props.navigation} title={"Tipos de pago"}>
            <SScrollView2 disableHorizontal>
                <SView props={{
                    variant: "center"
                }}>
                    {this.getLista()}
                </SView>
            </SScrollView2>
        </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TipoPagoPage);