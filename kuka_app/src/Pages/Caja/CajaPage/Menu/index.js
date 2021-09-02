import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import { SView } from '../../../../SComponent/SView/index';

class Menu extends Component {
    constructor(props) {
        super(props)

    }
  
    render() {
        this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!this.activa) return <View />;
        return (
            <SView style={{
                width: "100%",
                height: 50,
            }} props={{
                direction: "row",
            }}>

            </SView>
        )
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Menu);