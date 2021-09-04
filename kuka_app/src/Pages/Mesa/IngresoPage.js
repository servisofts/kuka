import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import Page from '../../Component/Page';
import AppParams from '../../Params';
import { SDate, SForm, SInput, SPopup, SScrollView2, SText, STheme, SView } from '../../SComponent';

class IngresoPage extends Component {
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
        var reservas = Actions.Mesa.reservarMesaGetAll(this.props);
        if (!tipoMesa) return <ActivityIndicator color={"#fff"} />
        if (!mesas) return <ActivityIndicator color={"#fff"} />
        if (!reservas) return <ActivityIndicator color={"#fff"} />
        return Object.keys(tipoMesa).map((key_tipo_mesa) => {
            var reservasData = reservas[key_tipo_mesa];
            var mesasData = mesas[key_tipo_mesa];
            var tipo = tipoMesa[key_tipo_mesa];
            if(!mesasData) mesasData={};
            if(!reservasData) return <View/>
            return Object.keys(reservasData).map((key) => {
                var obj = reservasData[key];
                if(!obj.key_mesa){
                    return <View/>
                }
                var mesa = mesasData[obj.key_mesa];
                return <SView col={"xs-11"} card style={{
                    marginTop: 16,
                    height: 100,
                }} row onPress={() => {
                    this.props.navigation.navigate("ClientesPage", {
                        onSelect: (usr) => {
                            Actions.Mesa.reservarMesa(
                                {
                                    key_mesa: key,
                                    key_usuario: usr.key,
                                    fecha: new SDate().toString("yyyy-MM-dd"),
                                    key_tipo_mesa: key_tipo_mesa
                                },

                                this.props);
                            this.props.navigation.goBack();
                        }
                    });
                }}>
                    <SView style={{ width: 40 }} height center>

                    </SView>
                    <SView col={"xs-8"} height center>
                        <SText style={{
                            fontSize: 10,
                            width: "90%",
                        }}>{`${JSON.stringify(obj)}`}</SText>
                        <SText style={{
                            fontSize: 10,
                            width: "90%",
                        }}>{`${obj.key_usuario}`}</SText>
                        <SText style={{
                            fontSize: 10,
                            width: "90%",
                        }}>{`${tipo.descripcion}`}</SText>
                        <SText style={{
                            fontSize: 10,
                            width: "90%",
                        }}>{`${mesa.descripcion+mesa.codigo}`}</SText>
                    </SView>
                </SView>
            })
        })
    }
    render() {

        return (
            <Page navigation={this.props.navigation}
                title={"Registro de mesa"}
            >
                <SScrollView2 disableHorizontal>

                    <SView col={"xs-12"} center>
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
export default connect(initStates)(IngresoPage);