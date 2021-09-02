import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Themas, { propsType } from './Themas';

let INSTANCE = false;

// export const SThemeStyle = (): propsType => {
//     if (!INSTANCE) return Themas["default"];
//     return INSTANCE.getTheme();
// }
export const STheme = (): propsType => {
    if (!INSTANCE) return Themas["default"];
    return INSTANCE.getTheme();
}

export const SThemeChange = (Theme) => {
    if (!INSTANCE) return;
    INSTANCE.changeTheme(Theme);
}

export class SThemeClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "default",
        };
        INSTANCE = this;

    }
    changeTheme(theme) {
        if (!Themas[theme]) {
            return false;
        }
        this.state.theme = theme;
        this.props.repaint();
    }
    getTheme() {
        return Themas[this.state.theme];
    }
    render() {
        INSTANCE = this;
        return <View/>
        return (
            <TouchableOpacity style={{
                position: "absolute",
                top: 0,
                right: 8,
                width: 30,
                height: 30,
                backgroundColor: STheme().colorSecondary,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
            }} onPress={() => {
                if (this.state.theme != "default") {
                    this.changeTheme("default")
                } else {
                    this.changeTheme("dark")
                }
            }}>

            </TouchableOpacity>
        );
    }
}