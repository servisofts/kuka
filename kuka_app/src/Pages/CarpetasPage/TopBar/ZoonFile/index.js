import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../../Svg';

class ZoonFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{
                width: 43,
                height: 43,
                // borderWidth: 1, 
                // borderRadius: 8,
                // backgroundColor:"#000",
                borderColor: "#ddd",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {

                this.props.zoom(this.props.val);
                // this.props.navigation.navigate("DescargaPage")
            }}>
                {this.props.val > 0 ? (
                    <Svg resource={require('../../../../img/zoon.svg')} style={{
                        width: 28,
                        height: 28,
                    }} />
                ) : (
                    <Svg resource={require('../../../../img/zoono.svg')} style={{
                        width: 28,
                        height: 28,
                    }} />
                )}

                {/* <Text style={{
                    fontSize:10,    
                    color: "#aaa",
                    fontWeight: "bold",
                    textAlign: "center"
                }}> Subir archibo </Text> */}
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ZoonFile);