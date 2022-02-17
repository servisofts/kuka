import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Delele from '../../sound/delete.mp3'
export default class SSound extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.sonido = new Audio(Delele);
        // this.sonido.play();

    }
    play() {
        this.sonido.play((succes) => {
            console.log(succes);

        })
    }
    render() {
        return (
            <View></View>
        );
    }
}
