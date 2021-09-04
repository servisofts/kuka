import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import FloatButtom from '../../Component/FloatButtom';
import Page from '../../Component/Page';
import SOrdenador from '../../Component/SOrdenador';
import { SDate, SInput, SLoad, SText, STheme, SView } from '../../SComponent';
class ListaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getProgress(obj, cant, cantReservas) {
        if (!obj) return <View />
        if (!this.anim) this.anim = {};
        if (!this.anim[obj.key]) this.anim[obj.key] = new Animated.Value(0);
        new Animated.timing(this.anim[obj.key], {
            toValue: cantReservas / cant,
            duration: 100,
        }).start();
        return <View style={{
            height: 8,
            borderRadius: 8,
            backgroundColor: STheme().card,
            width: "100%",
            overflow: "hidden",
        }}>
            <Animated.View style={{
                flex: 1,
                backgroundColor: this.anim[obj.key].interpolate({
                    inputRange: [0, 1],
                    outputRange: [STheme().colorDanger, STheme().colorSuccess],
                }),
                width: this.anim[obj.key].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                }),
            }}>
            </Animated.View>
        </View>
    }
    getLista() {
        if (!this.state.jornada) return <SText>Seleccione una jornada</SText>;

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

            // if(new SDate(this.state.jornada.fecha_inicio).isBefore(new SDate())){

            if (mesa) { if (typeof mesa == "object") { cant = Object.keys(mesa).length; } }
            if (reservas) {
                Object.keys(reservas).map((key) => {
                    var obj = reservas[key];
                    if (obj.estado == 0) return;
                    if (obj.key_jornada != this.state.jornada.key) return;
                    cantReservas++;
                })
            }


            return <SView col={"xs-11"} card center style={{
                marginTop: 16,
                height: 70,
            }} onPress={() => {
                this.props.navigation.navigate("ReservaPage", { key_tipo_mesa: key, key_jornada: this.state.jornada.key });
                // this.props.navigation.navigate("ClientesPage", {
                //     onSelect: (usr) => {

                //     }
                // });
            }}>
                <SView row col={"xs-12"} height flex>
                    <SView style={{ width: 40 }} center height>

                    </SView>
                    <SView col={"xs-8"} center height>
                        <SText style={{
                            fontSize: 16,
                            width: "90%",
                        }}>{obj.descripcion}</SText>
                    </SView>
                    <SView flex center height>
                        <SText style={{
                            textAlign: "right",
                            fontSize: 16,
                            width: "90%",
                        }}>{`${cantReservas}/${cant}`}</SText>

                    </SView>
                </SView>
                <SView col={"xs-11"} height={20}>
                    {this.getProgress(obj, cant, cantReservas)}
                </SView>
            </SView>
        })
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
        return <SView col={"xs-12"} center height={40}>
            <SInput
                defaultValue={this.state.jornada ? this.state.jornada.key : ""}
                props={{
                    col: "xs-11 md-8 xl-6",
                    customStyle: "outline",
                    type: "select",
                    options: options,
                }}
                styleInput={{
                    color: "#fff"
                }}
                onChangeText={(value) => {
                    this.setState({ jornada: jornadas[value] });
                }}
                placeholder={"Selecciona el dia"} />
        </SView>
    }
    render() {

        return (
            <Page
                navigation={this.props.navigation}
                title={"Mesas"}
            >
                <SView col={"xs-12"} center>
                    <SView col={"xs-12"} height={8} />
                    {this.getJornada()}
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