import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import Page from '../../Component/Page';
import SOrdenador from '../../Component/SOrdenador';
import AppParams from '../../Params';
import { SDate, SForm, SInput, SLoad, SPopup, SScrollView2, SText, STheme, SView } from '../../SComponent';
import Buscador from '../../Component/Buscador'
class IngresoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getJornada() {
        var jornadas = Actions.Jornada.getAll(this.props);
        if (!jornadas) return <SLoad />
        var options = {}
        new SOrdenador([
            { key: "fecha_inicio", order: "asc", "peso": 1 }
        ]).ordernarObject(jornadas).map((key) => {
            var obj = jornadas[key];
            if (obj.estado == 0) return;
            if (new SDate(obj.fecha_inicio).isBefore(new SDate())) return;
            if (!this.state.jornada) {
                this.state.jornada = obj;
                this.setState({ ...this.state })
            };
            var format = `${new SDate(obj.fecha_inicio).toString("day, dd MONTH ")} - ${obj.descripcion}`;
            options[key] = { key, content: format, label: format };
        });
        // if (!jornada) return <ActivityIndicator color={"#fff"} />
        return <SView col={"xs-12"} center height={30}>
            <SInput
                defaultValue={this.state.jornada ? this.state.jornada.key : ""}
                props={{
                    col: "xs-11 md-8 xl-6",
                    customStyle: "outline",
                    type: "select",
                    options: options,
                }}
                styleInput={{
                    color: "#fff",
                    textAlign: "center",
                }}
                onChangeText={(value) => {
                    this.setState({ jornada: jornadas[value] });
                }}
                placeholder={"Selecciona el dia"} />
        </SView>
    }
    getLista() {
        if (!this.state.buscador) {
            return <ActivityIndicator color={"#fff"} />
        }
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
            if (!mesasData) mesasData = {};
            if (!reservasData) return <View />
            return new SOrdenador([
                { key: "Peso", order: "desc", peso: 4 },
                // { key: "Nombres", order: "asc", peso: 2 },
                // { key: "Apellidos", order: "asc", peso: 1 },
            ]).ordernarObject(
                this.state.buscador.buscar(reservasData)
            ).map((key) => {
                
                var obj = reservasData[key];
                if (!obj.key_mesa) {
                    return <View />
                }
                if (obj.estado == 0) return <View />
                var usuario = Actions.Usuario.getByKey(obj.key_usuario, this.props);
                if (!usuario) return <SLoad />
                reservasData[key].cliente = usuario; 
                var relacionador = Actions.Usuario.getByKey(obj.key_relacionador, this.props);
                if (!relacionador) return <SLoad />
                reservasData[key].relacionador = relacionador;
                if (obj.key_jornada != this.state.jornada.key) return <View />
                var mesa = mesasData[obj.key_mesa];
                return <SView col={"xs-11"} card style={{
                    marginTop: 8,
                    height: 85,
                    padding: 4,
                }}
                //  onPress={() => {
                //     this.props.navigation.navigate("ClientesPage", {
                //         onSelect: (usr) => {
                //             Actions.Mesa.reservarMesa(
                //                 {
                //                     key_mesa: key,
                //                     key_usuario: usr.key,
                //                     fecha: new SDate().toString("yyyy-MM-dd"),
                //                     key_tipo_mesa: key_tipo_mesa,
                //                     key_relacionador: this.props.state.usuarioReducer.usuarioLog.key,
                //                 },

                //                 this.props);
                //             this.props.navigation.goBack();
                //         }
                //     });
                // }}
                >
                    <SView col={"xs-12"} row height>
                        <SView col={"xs-7"} center>
                            <SView col={"xs-12"} row center>
                                <SView style={{
                                    width: 40,
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 40,
                                    padding: 4,
                                }} center>
                                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + usuario.key, {
                                        width: "100%",
                                        objectFit: "cover",
                                        resizeMode: "cover",

                                    })}
                                </SView>
                                <SView flex height style={{
                                    justifyContent: "center",
                                }}>
                                    <SText style={{ fontSize: 12, }}>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
                                    <SText style={{
                                        fontSize: 10,
                                        width: "90%",
                                        color: "#bbb"
                                    }}>{`${tipo.descripcion} ${mesa.descripcion + mesa.codigo}`}</SText>
                                </SView>
                            </SView>
                            <SView col={"xs-12"} flex></SView>
                            <SView col={"xs-12"} row center>
                                <SView col={"xs-12"} >
                                    <SText style={{
                                        color: "#999",
                                        fontSize: 8,
                                    }}>{`Relacionador:`}</SText>
                                </SView>
                                <SView style={{
                                    width: 25,
                                    borderRadius: 100,
                                    overflow: "hidden",
                                    height: 25,
                                    padding: 2,
                                }} center>
                                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + relacionador.key, {
                                        width: "100%",
                                        objectFit: "cover",
                                        resizeMode: "cover",

                                    })}
                                </SView>
                                <SView flex height style={{
                                    justifyContent: "center",
                                }}>
                                    <SText style={{ fontSize: 10, color: "#bbb" }}>{`${relacionador.Nombres} ${relacionador.Apellidos}`}</SText>
                                </SView>
                            </SView>
                        </SView>
                        <SView col={"xs-5"} height center>
                            <SView row col={"xs-12"} height={40}>
                                <SView col={"xs-3"} height center>
                                    <SInput props={{
                                        col: "xs-11",
                                        customStyle: "outline",
                                        // icon:false,
                                    }}
                                        styleInput={{
                                            textAlign: "center",
                                        }}
                                        value={"-"}
                                        editable={false}
                                        onPress={() => {
                                            Actions.Mesa.ingreso({
                                                key_reserva_mesa: obj.key,
                                                cantidad: -1,
                                                key_tipo_mesa: key_tipo_mesa,
                                            }, this.props)
                                        }}
                                        loading={this.props.state.reservaMesaReducer.estado == "cargando"}
                                    />

                                </SView>
                                <SView col={"xs-6"} height center>
                                    <SInput props={{
                                        col: "xs-11",
                                        type: "number",
                                        customStyle: "outline"
                                    }}
                                        editable={false}
                                        styleInput={{
                                            textAlign: "center",
                                        }}
                                        value={(!obj.cantidad ? 0 : obj.cantidad) + ""}
                                    // loading={this.props.state.reservaMesaReducer.estado == "cargando"}
                                    />
                                </SView>
                                <SView col={"xs-3"} height center>
                                    <SInput props={{
                                        col: "xs-11",
                                        type: "number",
                                        customStyle: "outline"
                                    }}
                                        styleInput={{
                                            textAlign: "center",
                                        }}
                                        value={"+"}
                                        editable={false}
                                        loading={this.props.state.reservaMesaReducer.estado == "cargando"}
                                        onPress={() => {
                                            Actions.Mesa.ingreso({
                                                key_reserva_mesa: obj.key,
                                                cantidad: 1,
                                                key_tipo_mesa: key_tipo_mesa,
                                            }, this.props)
                                        }}
                                    />
                                </SView>
                            </SView>

                        </SView>
                    </SView>

                </SView>
            })
        })
    }
    render() {

        return (
            <Page navigation={this.props.navigation}
                title={"Ingreso"}
            >
                <SView col={"xs-12"} height={8} />
                {this.getJornada()
                }
                < SView col={"xs-12"} height={8} />
                <Buscador ref={(ref) => { if (!this.state.buscador) this.setState({ buscador: ref }); }} repaint={() => { this.setState({ ...this.state }) }} />
                <SView col={"xs-12"} flex style={{}}>
                    <SScrollView2 disableHorizontal>

                        <SView col={"xs-12"} center>
                            {this.getLista()}
                        </SView>
                    </SScrollView2>
                </SView>


            </Page >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(IngresoPage);