import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../Component/Page';
import AppParams from '../../Params';
import { SForm, SInput, SPopup, SText, STheme, SView } from '../../SComponent';

class RegistroMesa extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getTipoMesa = () => {
        if (!this.props.state.tipoMesaReducer.data) {
            if (this.props.state.tipoMesaReducer.estado == "cargando") {
                return;
            }
            var object = {
                component: "tipoMesa",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return;
        }
        return this.props.state.tipoMesaReducer.data
    }
    mesaGetAll = () => {
        if (!this.props.state.mesaReducer.data) {
            if (this.props.state.mesaReducer.estado == "cargando") {
                return;
            }
            var object = {
                component: "mesa",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return;
        }
        return this.props.state.mesaReducer.data
    }
    getForm() {
        var tipoMesa = this.getTipoMesa();
        if (!tipoMesa) return <ActivityIndicator color={"#fff"} />
        var mesas = this.mesaGetAll();
        if (!mesas) return <ActivityIndicator color={"#fff"} />
        this.input = {}
        return Object.keys(tipoMesa).map((key) => {
            var obj = tipoMesa[key];
            var mesa = mesas[key];
            var cant = 0;
            if (mesa) {
                if (typeof mesa == "object") {
                    cant = Object.keys(mesa).length;
                }
            }
            return <SView col={"xs-11"} card style={{
                marginTop: 16,
                height: 40,
            }} row>
                <SView style={{ width: 40 }} height center>

                </SView>
                <SView col={"xs-8"} height center>
                    <SText style={{
                        fontSize: 16,
                        width: "90%",
                    }}>{obj.descripcion}</SText>
                </SView>
                <SView flex height>
                    <SInput props={{
                        col: "xs-12",
                        type: "number",
                    }}
                        ref={ref => this.input[key] = ref}
                        styleInput={{
                            color: STheme().colorSecondary,
                            textAlign: "center"
                        }}
                        style={{
                            height: "100%",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: STheme().colorSecondary + "44",
                            borderRadius: 4,
                        }}
                        selectTextOnFocus
                        defaultValue={cant+""}
                        onBlur={() => {
                            if (this.input[key]) {
                                if (this.input[key].getValue() == cant) {
                                    return;
                                }
                            }


                            SPopup.confirm("Esta seguro de modificar la cantidad?", () => {
                                var data = {
                                    key_tipo_mesa: key,
                                    cantidad: this.input[key].getValue(),
                                }
                                this.props.state.socketReducer.session[AppParams.socket.name].send({
                                    component: "mesa",
                                    type: "registro",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data
                                }, true);
                            }, () => {
                                this.input[key].setValue(0)
                            })

                        }}
                        placeholder={0} />
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
                    {this.getForm()}
                </SView>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroMesa);