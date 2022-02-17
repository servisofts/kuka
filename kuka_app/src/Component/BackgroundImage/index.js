import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import SImage from '../SImage';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
type type = {
    source: Object,
    contraste: String

}
export default class BackgroundImage extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getGradient() {
        if (!this.state.layout) return <View />
        return <Svg viewBox={`0 0 ${this.state.layout.width} ${this.state.layout.height}`} height="100%" width="100%">
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#E94380" stopOpacity="1" />
                    <Stop offset="1" stopColor="#A94392" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Rect
                x="0"
                y="0"
                width={this.state.layout.width}
                height={this.state.layout.height}
                fill="url(#grad)"
            />
        </Svg>
    }
    getBackground = () => {
        var source = this.props.source;
        if (!source) {
            source = require("./fondo.png");
        }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            // opacity: 0.8,
            backgroundColor: "#A94392",
            ...this.props.style,
        }} onLayout={(evt) => {
            this.setState({
                layout: evt.nativeEvent.layout
            })
        }}>
            <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
            }}>
                {this.getGradient()}
            </View>
            <SImage source={source} style={{
                width: "100%",
                height: "100%",
                resizeMode: "stretch",
                opacity: 0.6,
            }} />

            <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                opacity: (0.8 + (Platform.OS == "web" ? -0.2 : 0)),
                backgroundColor: "#000"
            }}>

            </View>
        </View>
    }
    render() {
        // if (!this.props.source) {
        //     return <View />
        // }
        return this.getBackground()
    }
}
