import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import Page from '../../Component/Page';
import AppParams from '../../Params';
import { SDate, SForm, SInput, SPopup, SText, STheme, SView } from '../../SComponent';

class ReservaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var key_tipo_mesa = this.props.navigation.getParam("key_tipo_mesa");
        var tipoMesa = Actions.Mesa.getTipoMesa(this.props);
        var mesas = Actions.Mesa.mesaGetAll(this.props);
        if (!tipoMesa) return <ActivityIndicator color={"#fff"} />
        if (!mesas) return <ActivityIndicator color={"#fff"} />
        var mesasData = mesas[key_tipo_mesa];
        return Object.keys(mesasData).map((key) => {
            var obj = mesasData[key];
            // var mesa = mesas[key];

            return <SView col={"xs-11"} card style={{
                marginTop: 16,
                height: 40,
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
                        fontSize: 16,
                        width: "90%",
                    }}>{`${obj.descripcion}${obj.codigo}`}</SText>
                </SView>
            </SView>
        })
    }
    render() {

        return (
            <Page navigation={this.props.navigation}
                title={"Registro de mesa"}
            >
                <SView col={"xs-12"} center>
                    {this.getLista()}
                </SView>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ReservaPage);