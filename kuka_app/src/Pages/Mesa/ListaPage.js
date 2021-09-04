import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import FloatButtom from '../../Component/FloatButtom';
import Page from '../../Component/Page';
import { SText, SView } from '../../SComponent';
class ListaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var tipoMesa = Actions.Mesa.getTipoMesa(this.props);
        var mesas = Actions.Mesa.mesaGetAll(this.props);
        var mesasReserva = Actions.Mesa.reservarMesaGetAll(this.props);
        if (!tipoMesa) return <ActivityIndicator color={"#fff"} />
        if (!mesas) return <ActivityIndicator color={"#fff"} />
        if (!mesasReserva) return <ActivityIndicator color={"#fff"} />
        return Object.keys(tipoMesa).map((key) => {
            var obj = tipoMesa[key];
            var mesa = mesas[key];
            var reservas = mesasReserva[key];
            var cant = 0;
            var cantReservas = 0;
            if (mesa) { if (typeof mesa == "object") { cant = Object.keys(mesa).length; } }
            if (reservas) { if (typeof reservas == "object") { cantReservas = Object.keys(reservas).length; } }
            return <SView col={"xs-11"} card style={{
                marginTop: 16,
                height: 40,
            }} row onPress={() => {
                this.props.navigation.navigate("ReservaPage", { key_tipo_mesa: key })
                // this.props.navigation.navigate("ClientesPage", {
                //     onSelect: (usr) => {

                //     }
                // });
            }}>
                <SView style={{ width: 40 }} height center>

                </SView>
                <SView col={"xs-8"} height center>
                    <SText style={{
                        fontSize: 16,
                        width: "90%",
                    }}>{obj.descripcion}</SText>
                </SView>
                <SView flex height center>
                    <SText style={{
                        textAlign: "right",
                        fontSize: 16,
                        width: "90%",
                    }}>{`${cantReservas}/${cant}`}</SText>

                </SView>
            </SView>
        })
    }
    render() {

        return (
            <Page
                navigation={this.props.navigation}
                title={"Mesas"}
            >
                <SView col={"xs-12"} center>
                    {this.getLista()}
                </SView>
                {/* <FloatButtom label={"+"} onPress={() => {
                    this.props.navigation.navigate("RegistroMesa");
                }} /> */}
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaPage);