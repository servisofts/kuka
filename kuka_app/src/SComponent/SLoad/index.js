import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { STheme, SView } from '..';

export default class SLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} height center>
                <ActivityIndicator color={STheme().colorSecondary} />
            </SView>
        );
    }
}
