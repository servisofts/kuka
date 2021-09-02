import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';

export default class BTNEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 30,
        height: 30,
    }}>
        <Svg name={"Editar"} style={{
            width: 25,
            height: 25,
        }} />
    </TouchableOpacity>
    );
  }
}
