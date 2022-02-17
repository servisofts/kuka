import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page/index';
import { SForm, SScrollView2 } from '../../../SComponent'
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import FotoPerfilComponent from '../../../Component/FotoPerfilComponent/index';
import { SView } from '../../../SComponent/SView/index';
import CuentaBanco from '../CuentaBanco';

let ReducerName = "bancoReducer";
let component = "banco";

class BancoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        var key = props.navigation.getParam("key", null);
        if (!key) {
            this.data = {};
        } else {
            this.data = this.props.state[ReducerName].data[key];
        }

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
                <SScrollView2
                    style={{ width: "100%" }}
                    disableHorizontal
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
                                label: 'Nombre',
                                defaultValue: this.data.descripcion,
                                isRequired: true,
                                col: "xs-11 md-8 xl-6"
                            }
                        }}
                        onSubmit={(data) => {
                            var object = {
                                component: component,
                                type: this.data.key ? "editar" : "registro",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: {
                                    ...this.data,
                                    ...data,
                                },
                            }
                            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        }}
                        onSubmitName={this.data.key ? "editar" : "registro"}
                    />
                    <CuentaBanco data={this.data} navigation={this.props.navigation} />
                </SScrollView2>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BancoRegistroPage);