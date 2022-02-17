import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../Component/Page';
import ConfirmarPaquete from './ConfirmarPaquete';

export default class ClientePaqueteRegistroConfirmacion extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Page
                navigation={this.props.navigation}
                title={"Verifica los datos."}
                style={{
                    alignItems: "center"
                }}
            >
                <ConfirmarPaquete
                    {...this.props}
                    data={this.props.navigation.getParam("data")} />
            </Page>
        );
    }
}
