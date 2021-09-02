import React, { Component } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity, Platform } from 'react-native';

export default class SCarruselItem extends Component {
    constructor(props) {
        super(props);
        var x = 0;
        if (!this.props.isSelect) {
            x = this.props.dimensiones.width * 1
        }
        this.state = {
            pan: new Animated.ValueXY({ x: x, y: 0 })
        }
        this.parametros = {
            useNativeDriver: (Platform.OS != "web"),
            actionLimit: (0.4 * this.props.dimensiones.width)
        }
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx < -1 || gestureState.dx > 1,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: () => {
                this.timePanIn = new Date().getTime();
                // console.log("enter");
                // this.state.pan.setOffset({
                //     x: 0,
                //     y: 0
                // });
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: () => {
                this.timePanEnd = new Date().getTime();
                var time = this.timePanEnd - this.timePanIn;
                var force = this.state.pan.x._value / time;

                if (this.state.pan.x._value > (this.parametros.actionLimit) || (force > 0.7)) {
                    // console.log("action leftContent")
                    Animated.timing(this.state.pan, {
                        toValue: { x: this.props.dimensiones.width, y: 0 },
                        duration: 150,
                        useNativeDriver: this.parametros.useNativeDriver
                    }).start(() => {
                        this.state.pan.flattenOffset();
                    });
                    if (this.props.leftAction) this.props.leftAction(this.props.data, this);
                } else if (this.state.pan.x._value < (this.parametros.actionLimit * -1) || (force < -0.7)) {
                    // console.log("action rightContent")
                    Animated.timing(this.state.pan, {
                        toValue: { x: this.props.dimensiones.width * -1, y: 0 },
                        duration: 150,
                        useNativeDriver: this.parametros.useNativeDriver
                    }).start(() => {
                        this.state.pan.flattenOffset();
                    });

                    if (this.props.rigthAction) this.props.rigthAction(this.props.data, this);
                } else {
                    Animated.timing(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        duration: 100,
                        useNativeDriver: this.parametros.useNativeDriver
                    }).start(() => {
                        this.state.pan.flattenOffset();
                    });
                }
            },
            onPanResponderEnd: () => {
                Animated.timing(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    duration: 100,
                    useNativeDriver: this.parametros.useNativeDriver
                }).start(() => {
                    this.state.pan.flattenOffset();
                });
            },
        });
    }

    moveLeft(time, cb) {
        Animated.timing(this.state.pan, {
            toValue: { x: this.props.dimensiones.width, y: 0 },
            duration: (!time ? 150 : time),
            useNativeDriver: this.parametros.useNativeDriver
        }).start(() => {
            this.state.pan.flattenOffset();
            if (cb) cb();
        });
    }
    center(time, cb) {
        Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 0 },
            duration: (!time ? 150 : time),
            useNativeDriver: this.parametros.useNativeDriver
        }).start(() => {
            this.state.pan.flattenOffset();
            if (cb) cb();
        });
    }
    moveRigth(time, cb) {
        Animated.timing(this.state.pan, {
            toValue: { x: this.props.dimensiones.width * -1, y: 0 },
            duration: (!time ? 150 : time),
            useNativeDriver: this.parametros.useNativeDriver
        }).start(() => {
            this.state.pan.flattenOffset();
            if (cb) cb();
        });
    }
    render() {
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={{
                    position: "absolute",
                    width: "100%",
                    // backgroundColor:"#000",
                    justifyContent:"center",
                    alignItems:"center",
                    height: "100%",
                        transform: [
                            { translateX: this.state.pan.x }
                        ]
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}
