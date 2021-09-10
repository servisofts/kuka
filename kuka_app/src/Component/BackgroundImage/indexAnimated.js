import React, { Component } from 'react';
import { View, Text, Platform, Animated, Dimensions } from 'react-native';
import SImage from '../SImage';
import LogoAnimated from './LogoAnimated.js';
type type = {
    source: Object,
    contraste: String,

}
export default class BackgroundImage extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.size = new Animated.ValueXY({ x: 0, y: 0 })
    }
    getBackground = () => {
        if (!this.props.debug) return <View />
        return <View style={{
            width: "100%",
            flex: 1,
            position: "absolute",
        }} onLayout={(evt) => {
            this.size.setValue({
                x: evt.nativeEvent.layout.width,
                y: evt.nativeEvent.layout.height
            })
        }}>
            <LogoAnimated size={this.size}  />
        </View>
    }
    render() {
        // if (!this.props.source) {
        //     return <View />
        // }
        return this.getBackground()
    }
}
