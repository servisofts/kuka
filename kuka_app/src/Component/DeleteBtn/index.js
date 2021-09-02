import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import STheme from '../../STheme';
import SSound from '../../SSound';
type tprop = {
    title: String,
    time: Number,
    onDelete: Function,
    onCancel: Function,
    style: View.style
}
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
            if (this.props.onDelete) { this.props.onDelete() }
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
        return (
            <TouchableOpacity style={{
                width: 60,
                height: 25,
                ...this.props.style,
            }} onPress={() => {
                if (this.onAnimated) {
                    this.animCancel();
                    return;
                }
                this.setState({ ...this.state })
                this.fadeIn()
            }}>
                <Animated.View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: this.state.anim.interpolate({
                        inputRange: [0, this.time],
                        outputRange: ["#ff0000", "#C31C37"]
                    }),
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [
                        {
                            scale: this.state.anim.interpolate({
                                inputRange: [0, this.time],
                                outputRange: [2, 1]
                            })
                        }
                    ]
                }}>
                    <Text style={{
                        color: STheme.color.text,
                        textAlign: "center",
                        letterSpacing: -0.5,
                        fontSize: 10,
                    }}> {!this.onAnimated ? this.state.text : (this.state.anim._value.toFixed(0))} </Text>
                    {!this.onAnimated ? <View /> : <Text style={{
                        color: STheme.color.text,
                        textAlign: "center",
                        fontSize: 6,
                    }}> cancelar </Text>}
                </Animated.View>
            </TouchableOpacity>
        );
    }
}
