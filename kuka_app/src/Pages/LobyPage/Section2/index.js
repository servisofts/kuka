import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import SCarrusel from '../../../Component/SCarrusel';
import SImage from '../../../Component/SImage';
import Svg from '../../../Svg';

export default class Section2 extends Component {
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
                height: 200,
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 2,
                alignItems: "center",
                transform: [
                    {
                        translateX: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [Dimensions.get("window").width * -1, 0]
                        })
                    }
                ]
            }}>
                <Animated.View style={{
                    width: "90%",
                    height: "90%",
                    maxWidth: 500,
                    borderRadius: 10,
                    overflow: "hidden",
                    // justifyContent: "center",
                    alignItems: "flex-end",
                    backgroundColor: this.state.anim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["#fff", "#000"]
                    }),
                }}>

                    <View style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                    }} >
                        <SCarrusel time={3000} direction={"left"}>
                            <SImage source={require('../../../img/tecnologi1.jpg')} style={{
                                width: "100%",
                                height: "100%",
                                opacity: 0.8,
                                resizeMode: "cover"
                            }} />
                            <SImage source={require('../../../img/tecnologi2.jpg')} style={{
                                width: "100%",
                                height: "100%",
                                opacity: 0.8,
                                resizeMode: "cover"
                            }} />
                        </SCarrusel>
                    </View>
                    <Text style={{
                        zIndex: 9,
                        fontSize: 32,
                        fontWeight: "bold",
                        color: "#fff",
                        textShadowColor: "#666",
                        textShadowOffset: { width: -2, height: 2 },
                        textShadowRadius: 3,
                        padding: 4,
                        // paddingRight: 50,
                    }}>Tecnologias</Text>
                    <TouchableOpacity style={{
                        bottom: 0,
                        zIndex: 99,
                        position: "absolute",
                        width: "100%",
                        height: 30,
                        backgroundColor: "#ffffff44",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }} onPress={() => {
                        if (this.props.onPress) this.props.onPress();
                    }}>
                        <Text style={{
                            zIndex: 9,
                            fontSize: 12,
                            fontWeight: "100",
                            color: "#ffffff",
                            padding: 4,
                            textDecorationLine: "underline"
                        }}>ver mas</Text>
                        {/* <Svg name="see" style={{
                            fill: "#fff",
                            width: 15,
                            height: 15,
                        }} /> */}
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        );
    }
}
