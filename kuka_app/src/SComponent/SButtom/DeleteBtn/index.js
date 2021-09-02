import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import SSound from '../../SSound';
import { STheme } from '../../../SComponent';
type tprop = {
    title: String,
    time: Number,
    onPress: Function,
    onCancel: Function,
    style: View.style
}
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export default class DeleteBtn extends Component<tprop> {
    constructor(props) {
        super(props);
        this.time = !props.time ? 3 : props.time;
        this.state = {
            count: this.time,
            text: props.title ? props.title : "ELIMINAR",
            anim: new Animated.Value(this.time),
        };
    }
    animEliminado() {
        this.onAnimEliminado = true;
        if (this.onAnimCancel) {
            return;
        }

        new Animated.timing(this.state.anim, {
            duration: 200,
            toValue: this.time * 2
        }).start(() => {
            if (this.onAnimCancel) {
                this.animCancel();
                return;
            }
            this.onAnimated = false;
            if (this.props.onPress) { this.props.onPress() }
            new SSound()
        });
    }
    animCancel() {
        this.onAnimCancel = true;
        Animated.timing(this.state.anim).stop();
        new Animated.timing(this.state.anim, {
            duration: 200,
            toValue: this.time
        }).start(() => {
            if (this.props.onCancel) { this.props.onCancel() }
            this.onAnimated = false;
            this.onAnimCancel = false;
            this.setState({ ...this.state })
        });
    }
    fadeIn() {
        this.onAnimated = true;
        new Animated.timing(this.state.anim, {
            duration: 1000,
            toValue: this.state.anim._value - 1
        }).start(() => {
            if (this.onAnimCancel) {
                // this.onAnimated(false);
                return;
            }
            if (this.state.anim._value > 0) {
                this.fadeIn();
            } else {
                this.onAnimated = false;
                this.animEliminado()
            }
            this.setState({ ...this.state })
        });
    }
    render() {
        // var style = this.props.style
        // console.log(this.props)
        // if (!style) {
        //     style = {}
        // }
        // if (!style.backgroundColor) {
        //     style.backgroundColor = "#f0f0f0"
        // }

        return (
            <AnimatedTouchable style={{
                ...this.props.style,
                // backgroundColor: this.state.anim.interpolate({
                //     inputRange: [0, this.time],
                //     outputRange: [style.backgroundColor + "99", style.backgroundColor + "ff"]
                // }),
                transform: [
                    {
                        scale: this.state.anim.interpolate({
                            inputRange: [0, this.time],
                            outputRange: [2, 1]
                        })
                    }
                ]
            }} onPress={() => {
                if (this.onAnimated) {
                    this.animCancel();
                    return;
                }
                this.setState({ ...this.state })
                this.fadeIn()
            }}>
                <View style={{
                    ...this.props.style,
                    width: "100%",
                    height: "100%",

                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {!this.onAnimated ? this.props.children : (<Text style={{
                        // color: STheme.color.text,
                        ...this.props.styleText,
                        textAlign: "center",
                        letterSpacing: -0.5,
                        fontSize: 10,
                    }}>{this.state.anim._value.toFixed(0)} </Text>)}

                    {!this.onAnimated ? <View /> : <Text style={{
                        ...this.props.styleText,
                        textAlign: "center",
                        fontSize: 6,
                    }}> cancelar </Text>}
                </View>
            </AnimatedTouchable>
        );
    }
}
