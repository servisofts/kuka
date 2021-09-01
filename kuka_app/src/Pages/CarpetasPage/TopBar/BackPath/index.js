import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg';

class BackPath extends Component {
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
        var routes = this.props.state.fileReducer.routes;
        if (routes.length <= 0) {
            return <View />
        }
        return (
            <TouchableOpacity style={{
                margin: 4,
                width: 40,
                height: 35,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#ddd",
                backgroundColor:"#000",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.props.dispatch({
                    component: "file",
                    type: "backFolder",
                    estado: "cargando",
                })
            }}>
                <Svg resource={require('../../../../img/arrow.svg')}
                    style={{
                        width: "50%",
                        height: "50%",
                        fill: "#000"
                    }} />
                {/* <Text style={{
                    fontSize: 10,
                    color: "#aaa",
                    fontWeight: "bold",
                    // textAlign: "center"
                }}> BACK </Text> */}
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BackPath);