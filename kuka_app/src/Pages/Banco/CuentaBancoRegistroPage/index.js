import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page/index';
import { SButtom, SForm } from '../../../SComponent'
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import FotoPerfilComponent from '../../../Component/FotoPerfilComponent/index';
import { SView } from '../../../SComponent/SView/index';
import CuentaBanco from '../CuentaBanco';

let ReducerName = "cuentaBancoReducer";
let component = "cuentaBanco";

class CuentaBancoRegistroPage extends Component {
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
            this.data = this.props.state[ReducerName].data[this.key_banco][key];
        }

    }
    getEliminar() {
        if (!this.data.key) return null;
        return <SView col={"xs-12"} center style={{
            height: 60,
        }}>
            <SButtom props={{
                type: "danger",
                variant: "confirm"
            }} onPress={() => {
                var object = {
                    component: component,
                    type: this.data.key ? "editar" : "registro",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                        key_banco: this.key_banco,
                        ...this.data,
                        estado: 0,
                    },
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            }}> Eliminar</SButtom>
        </SView>
    }
    render() {
        var reducer = this.props.state[ReducerName]
        if (reducer.estado == "exito" && reducer.type == "registro") {
            reducer.estado = "";
            this.props.navigation.goBack();
        }
        if (reducer.estado == "exito" && reducer.type == "editar") {
            reducer.estado = "";
            this.props.navigation.goBack();
        }
        return (
            <Page title={"Registro de " + component}
                navigation={this.props.navigation}
            >
                <SView col={"xs-12"} center >
                    <FotoPerfilComponent data={this.data} component={component} style={{
                        width: 150,
                        height: 150,
                    }} />
                </SView>
                <SForm
                    props={{
                        variant: "center",
                        col: "xs-12"
                    }}
                    inputProps={{
                        customStyle: "calistenia",
                    }}
                    inputs={{
                        descripcion: {
                            type: 'text',
                            label: 'Descripcion',
                            defaultValue: this.data.descripcion,
                            isRequired: true,
                            col: "xs-11 md-8 xl-6"
                        },
                        codigo: {
                            type: 'text',
                            label: 'Codigo',
                            defaultValue: this.data.codigo,
                            isRequired: true,
                            col: "xs-11 md-8 xl-6"
                        },
                        // moneda: {
                        //     type: 'text',
                        //     label: 'Moneda',
                        //     defaultValue: this.data.moneda,
                        //     isRequired: true,
                        //     col: "xs-11 md-8 xl-6"
                        // }
                    }}
                    onSubmitProps={{
                        type: "outline"
                    }}
                    onSubmit={(data) => {
                        var object = {
                            component: component,
                            type: this.data.key ? "editar" : "registro",
                            estado: "cargando",
                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                            data: {
                                key_banco: this.key_banco,
                                ...this.data,
                                ...data,
                            },
                        }
                        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                    }}
                    onSubmitName={this.data.key ? "Editar" : "Registro"}
                />
                {this.getEliminar()}
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaBancoRegistroPage);