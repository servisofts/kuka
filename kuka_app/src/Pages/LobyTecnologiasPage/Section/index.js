import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import SCarrusel from '../../../Component/SCarrusel';
import SImage from '../../../Component/SImage';
import Svg from '../../../Svg';

export default class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };
    }

    startAnimation() {
        Animated.timing(this.state.anim, {
            toValue: 100,
            duration: 1000,
        }).start();
    }
    componentDidMount() {
        this.startAnimation();
    }

    render() {
        return (
            <Animated.View style={{
                width: "100%",
                
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                transform: [
                    {
                        translateX: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [Dimensions.get("window").width * (this.props.direction != "left" ? 1 : -1), 0]
                        })
                    }
                ]
            }}>
                <Animated.View style={{
                    // width: "90%",
                    // height: "90%",
                    margin:8,
                    maxWidth: 500,
                    padding: 8,
                    borderRadius: 10,
                    // justifyContent: "center",
                    // alignItems: "center",
                    overflow: "hidden",
                    backgroundColor: this.state.anim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["#000", "#fff"]
                    }),
                }}>

                    <Text style={{
                        zIndex: 9,
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#000",
                        textShadowColor: "#666",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 3,
                    }}>{this.props.titulo}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: "#000",
                        textAlign: "justify"
                    }}>{this.props.detalle}</Text>
                    {this.props.children}
                </Animated.View>
            </Animated.View>
        );
    }
}
