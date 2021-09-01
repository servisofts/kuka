import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg from '../../Svg';

export default class LogoAnimado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                maxWidth: 500,
                minHeight: 100,
            }}>
                <Svg resource={require("../../img/calisteniaw.svg")} style={{
                    fill: "#000"
                }} />
            </View>
        );
    }
}
