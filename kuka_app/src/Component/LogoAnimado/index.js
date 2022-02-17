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
                width: "80%",
                maxWidth: 500,
                minHeight: 100,
                padding:8
            }}>
                <Svg name={"Kuka_line"} style={{
                    fill: "#000"
                }} />
            </View>
        );
    }
}
