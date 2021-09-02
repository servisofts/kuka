import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../../Svg';

class Relaod extends Component {
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
                this.props.dispatch({
                    component:"file",
                    type:"reload",
                })
                // this.props.navigation.navigate("DescargaPage")
            }}>

                <Svg resource={require('../../../../img/reload.svg')} style={{
                    width: 28,
                    height: 28,
                }} />

            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Relaod);