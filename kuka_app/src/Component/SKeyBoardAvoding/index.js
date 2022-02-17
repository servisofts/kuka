import React, { Component } from 'react';
import { View, Text, Keyboard } from 'react-native';

export default class SKeyBoardAvoding extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }   

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        console.log("Keyboard Shown")
        // alert('Keyboard Shown');
    }

    _keyboardDidHide() {
        console.log("Keyboard Hidden")
        // alert('Keyboard Hidden');
    }

    render() {
        return (
            <View {...this.props}>
                {this.props.children}
            </View>
        );
    }
}
