import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// var RNFS = require("react-native-fs");
export default class TestRNF extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    width: 100,
                    height: 50,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    // backgroundColor: SThemeStyle().colorPrimary
                }} onPress={() => {

                }}>
                    <Text>Crear</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
