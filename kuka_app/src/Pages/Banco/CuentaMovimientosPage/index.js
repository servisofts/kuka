import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page';
import FloatButtom from '../../../Component/FloatButtom/index';
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import { SScrollView2, SView } from '../../../SComponent';
import { SText } from '../../../SComponent/SText/index';
import CuentaBancoLista from '../CuentaBancoLista/index';
import BancoItem from '../BancoItem/index';
import CuentaBancoItem from '../CuentaBancoItem';
import Svg from '../../../Svg';
import SDate from '../../../SComponent/SDate/index';
import SOrdenador from '../../../Component/SOrdenador/index';
let component = "cuentaBancoMovimiento";
let ReducerName = "cuentaBancoMovimientoReducer";

class CuentaMovimientosPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        var key = props.navigation.getParam("key", null);
        this.key_banco = props.navigation.getParam("key_banco", null);
        if (!key) {
            this.data = {};
        } else {
            this.data = this.props.state["cuentaBancoReducer"].data[this.key_banco][key];
        }


    }

    getAll = () => {
        var reducer = this.props.state[ReducerName];
        if (!reducer.data[this.data.key]) {
            if (reducer.estado == "cargando") {
                return <Text>Carfando</Text>;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: component,
                type: "getAllByKeyCuentaBanco",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_cuenta_banco: this.data.key,
                estado: "cargando"
            }, true);
            return <View />
        }

        var data = reducer.data[this.data.key];

        return new SOrdenador([
            { key: "fecha_on", order: "desc", peso: 1 }
        ]).ordernarObject(data).map((key) => {
            var obj = data[key];
            var monto = obj.monto;
            if (monto) {
                if (monto % 1 != 0) monto = parseFloat(monto).toFixed(2);
            }
            return (
                <SView col={"xs-12"} key={obj.key} style={{
                    borderRadius: 4,
                    marginBottom: 8,
                    backgroundColor: "#66000044",
                }} row center>
                    <SView style={{
                        width: 50,
                        height: 50,
                    }} center >
                        <SView style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            overflow: "hidden",
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + obj.key_usuario, {
                            })}
                        </SView>
                    </SView>
                    <SView style={{
                        flex: 1,
                        height: "100%",
                        padding: 4,
                    }}
                        props={{ direction: "row" }}
                    >
                        <SView col={"xs-12"} >
                            <Text style={{ color: "#fff", fontSize: 16 }}>{obj.descripcion}</Text>
                            <Text style={{ color: "#fff", fontSize: 10 }}>{new SDate(obj.fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
                        </SView>

                    </SView>
                    <SView style={{
                        width: 34,
                    }} center>
                        <SView>
                            <Svg name={(obj.monto >= 0 ? "arrg" : "arrr")} style={{ width: 34 }} />
                        </SView>
                    </SView>
                    <View style={{
                        width: 100,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{ color: "#fff", fontSize: 16, }}>Bs. {monto}</Text>
                    </View>
                </SView>
            );
        })

    }
    render() {
        return (
            <Page
                navigation={this.props.navigation}
                title={"Movimientos de cuenta"}>

                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView col={"xs-12"} center>
                        <BancoItem key_banco={this.key_banco} />
                        <CuentaBancoItem key_banco={this.key_banco} key_cuenta_banco={this.data.key} />

                        <SView col={"xs-11 md-7 xl-6"} center>
                            <SView col={"xs-12"} style={{ height: 36, justifyContent: "flex-end" }}>
                                <SText>Movimientos</SText>
                            </SView>
                            {this.getAll()}

                        </SView>
                    </SView>
                </SScrollView2>
                <FloatButtom label={"+"} onPress={() => {
                    this.props.navigation.navigate("CuentaBancoMovimientoRegistroPage", {
                        key_banco: this.key_banco,
                        key_cuenta_banco: this.data.key,
                    });
                }} />
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaMovimientosPage);
