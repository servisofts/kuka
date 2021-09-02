import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg';

class ModoVista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <TouchableOpacity style={{
                    margin: 4,
                    width: 45,
                    height: 35,
                    // borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#ddd",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    
                    this.props.changeVista(this.props.vista);
                }}>
                    <Svg resource={require('../../../../img/list.svg')} style={{
                        width: "100%",
                        height: "100%",
                    }} />   
                    <Text style={{
                        position:"absolute",
                        fontSize: 10,
                        color: "#aaa",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}> {this.props.vista} </Text>
                </TouchableOpacity>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ModoVista);