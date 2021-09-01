import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Sound from 'react-native-sound';
import Delele from '../../sound/delete.mp3'
export default class SSound extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.sonido = new Sound(Delele, (error) => {
        //     if (error) {
        //         console.log('failed to load the sound', error); return;
        //     } // loaded successfully
        //     this.sonido.play();
        // });

    }
    play() {
        // this.sonido.play((succes) => {
        //     console.log(succes);
        // })
    }
    render() {
        return (
            <View></View>
        );
    }
}
