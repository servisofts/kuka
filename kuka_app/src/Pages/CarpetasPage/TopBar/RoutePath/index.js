import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';

class RoutePath extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getPath() {
        var routes = this.props.state.fileReducer.routes;
        var path = "/"
        routes.map((obj, key) => {
            path += obj.descripcion + "/"
        })
        return path;
    }
    render() {
        return (
            <View style={{
                margin: 2,
                width: 150,
                height: 35,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#aaa",
                justifyContent: "center",
                // alignItems: "center"
            }} >
                <Text style={{
                    color: "#aaa",
                    fontWeight: "bold",
                    // textAlign: "center"
                }}> {this.getPath()} </Text>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RoutePath);