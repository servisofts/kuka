import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';

class SharePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (this.props.file.tipo_observador != 2) {
            return <View />
        }
        console.log(this.props.file)
        return (
            <View style={{
                position: "absolute",
                width: "40%",
                height: "40%",
                borderWidth: 2,
                borderColor: "#fff",
                top: "-5%",
                right: "-10%",
                borderRadius: 100,
                overflow: 'hidden',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffffcc",
            }}>
                {this.props.state.imageReducer.getImage(AppParams.urlImages + this.props.file.key_usuario_compartio, {
                    width: "100%",
                    height: "100%",
                })}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SharePreview);