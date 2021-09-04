import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import Page from '../../Component/Page';
import AppParams from '../../Params';
import { SDate, SForm, SInput, SPopup, SText, STheme, SView, SScrollView2, SLoad } from '../../SComponent';
import SOrdenador from '../../Component/SOrdenador';
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
        var key_jornada = this.props.navigation.getParam("key_jornada");
        var tipoMesas = Actions.Mesa.getTipoMesa(this.props);
        var mesas = Actions.Mesa.mesaGetAll(this.props);
        var mesasReservas = Actions.Mesa.reservarMesaGetAll(this.props);
        if (!tipoMesas) return <ActivityIndicator color={"#fff"} />
        if (!mesas) return <ActivityIndicator color={"#fff"} />
        if (!mesasReservas) return <ActivityIndicator color={"#fff"} />
        var mesasData = mesas[key_tipo_mesa];
        var tipoMesa = tipoMesas[key_tipo_mesa];

        // return  Object.keys(mesasData).map((key) => {
        return new SOrdenador([
            { key: "codigo", order: "asc", peso: 1, },
            {
                key: "key", order: "asc", peso: 2, render: (key) => {
                    var res = ""
                    if (!mesasReservas[key_tipo_mesa]) return ""
                    Object.keys(mesasReservas[key_tipo_mesa]).map((keyReserva) => {
                        var reserva = mesasReservas[key_tipo_mesa][keyReserva];
                        if (reserva.estado == 0) return;
                        if (reserva.key_jornada != key_jornada) return;
                        if (reserva.key_mesa != key) return;
                        res = reserva.key_usuario;
                    })
                    return res;
                }
            },
        ]).ordernarObject(mesasData).map((key) => {
            var obj = mesasData[key];
            // var mesa = mesas[key];
            var reserva_select;
            if (!mesasReservas[key_tipo_mesa]) mesasReservas[key_tipo_mesa] = {};
            Object.keys(mesasReservas[key_tipo_mesa]).map((keyReserva) => {
                var reserva = mesasReservas[key_tipo_mesa][keyReserva];
                if (reserva.estado == 0) return;
                if (reserva.key_jornada != key_jornada) return;
                if (reserva.key_mesa != key) return;
                reserva_select = reserva;
            })
            const getContenido = () => {
                if (reserva_select) {
                    var usuario = Actions.Usuario.getByKey(reserva_select.key_usuario, this.props);
                    if (!usuario) return <SLoad />
                    var relacionador = Actions.Usuario.getByKey(reserva_select.key_relacionador, this.props);
                    if (!relacionador) return <SLoad />
                    return <SView col={"xs-12"} height center>
                        <SView col={"xs-12"} row center>
                            <SView col={"xs-4"} props={{ variant: "col-square" }} style={{
                                backgroundColor: "#ff999933",
                                borderRadius: 100,
                                overflow: "hidden"
                            }} center>
                                {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + usuario.key, {
                                    width: "100%",
                                    objectFit: "cover",
                                    resizeMode: "cover",

                                })}
                            </SView>
                            <SView col={"xs-8"}>
                                <SText style={{ fontSize: 10, textAlign: "center" }}>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>

                            </SView>
                        </SView>

                        <SView flex center>
                            <SText style={{
                                fontSize: 10,
                            }}>{`${tipoMesa.descripcion} ${obj.descripcion}${obj.codigo}`}</SText>
                        </SView>
                        {/* <SText style={{ fontSize: 10, textAlign: "center" }}>{`${usuario.Telefono}`}</SText> */}
                        <SView>
                            <SText style={{ fontSize: 8, textAlign: "center", color: "#666" }}>{`Relacionador:`}</SText>
                            <SView col={"xs-12"} row center>
                                <SView col={"xs-2"} props={{ variant: "col-square" }} style={{
                                    backgroundColor: "#ff999933",
                                    borderRadius: 100,
                                    overflow: "hidden"
                                }} center>
                                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + relacionador.key, {
                                        width: "100%",
                                        objectFit: "cover",
                                        resizeMode: "cover",

                                    })}
                                </SView>
                                <SView col={"xs-10"}>
                                    <SText style={{ fontSize: 10, textAlign: "center", color: "#666" }}>{`${relacionador.Nombres} ${relacionador.Apellidos}`}</SText>
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                }
                return <SView col={"xs-12"} height center>
                    <SText style={{
                        fontSize: 10,
                    }}>{`${tipoMesa.descripcion} ${obj.descripcion}${obj.codigo}`}</SText>
                </SView>
            }
            return <SView col={"xs-4 md-2 xl-1"} props={{ variant: "col-square" }} center style={{
                padding: 4,
            }}>
                < SView col={"xs-12"} card height row center style={{
                    padding: 2,
                }} onPress={() => {
                    if (reserva_select) return;
                    this.props.navigation.navigate("ClientesPage", {
                        onSelect: (usr) => {
                            Actions.Mesa.reservarMesa(
                                {
                                    key_mesa: key,
                                    key_usuario: usr.key,
                                    fecha: new SDate().toString("yyyy-MM-dd"),
                                    key_tipo_mesa: key_tipo_mesa,
                                    key_jornada: key_jornada
                                },

                                this.props);
                            this.props.navigation.goBack();
                        }
                    });
                }}>

                    {getContenido()}
                </SView>
            </SView >
        })
    }
    render() {

        return (
            <Page navigation={this.props.navigation}
                title={"Registro de mesa"}
            >
                <SView col={"xs-12"} center height>
                    <SScrollView2
                        disableHorizontal
                    >
                        <SView col={"xs-12"} center row>
                            {this.getLista()}
                        </SView>
                    </SScrollView2>

                </SView>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ReservaPage);