import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page';
import ListaCajas from './ListaCajas';

export default class CajasPage extends Component {
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
                title="Historico de cajas"
            >
                <ListaCajas navigation={this.props.navigation} />
            </Page>
        );
    }
}
