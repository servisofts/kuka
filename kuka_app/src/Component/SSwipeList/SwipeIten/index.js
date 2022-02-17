import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated, PanResponder, Dimensions, Easing, TouchableWithoutFeedback } from 'react-native';

export default class SwipeIten extends Component {
    constructor(props) {
        super(props)
        this.parametros = {
            actionLimit: (0.6 * this.props.dimensiones.width)
        }
        this.state = {
            pan: new Animated.ValueXY({ x: 0, y: 0 })
        }
        this.panResponer = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy < -1 || gestureState.dy > 1,
            onPanResponderGrant: () => {
                this.timePanIn = new Date().getTime();
                this.state.pan.setOffset({
                    x: 0,
                    y: 0
                });
            },

            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: this.state.pan.x, dy: this.state.pan.y }
                ]
            ),
            onPanResponderRelease: () => {
                // if(this.state.pan.x._value){

                // }
                this.timePanEnd = new Date().getTime();

                var time = this.timePanEnd - this.timePanIn;
                var force = this.state.pan.x._value / time;
                // console.log(force);
                if (this.state.pan.x._value > (this.parametros.actionLimit) || (force > 0.7)) {
                    // console.log("action leftContent")
                    Animated.timing(this.state.pan, {
                        toValue: { x: this.props.dimensiones.width, y: 0 },
                        duration: 150,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }).start(() => {
                        this.state.pan.flattenOffset();
                    });
                    this.props.leftAction(this.props.obj, this);
                } else if (this.state.pan.x._value < (this.parametros.actionLimit * -1) || (force < -0.7)) {
                    // console.log("action rightContent")
                    Animated.timing(this.state.pan, {
                        toValue: { x: this.props.dimensiones.width * -1, y: 0 },
                        duration: 150,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }).start(() => {
                        this.state.pan.flattenOffset();
                    });
                    this.props.rigthAction(this.props.obj, this);
                } else {
                    Animated.timing(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        duration: 100,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }).start(() => {
                        this.state.pan.flattenOffset();
                    });
                }
            },
            onPanResponderEnd: () => {
                Animated.timing(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(() => {
                    this.state.pan.flattenOffset();
                });
            },
        })
    }
    reset() {
        Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 0 },
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
            this.state.pan.flattenOffset();
        });
    }
    componentDidMount() {

    }


    render() {
        return (
            <Animated.View
                {...this.panResponer.panHandlers}
                style={{
                    // height: this.state.pan.x.interpolate({
                    //     inputRange:[this.state.pan.x*-1,0,this.state.pan.x]
                    // }),
                    // height: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    ...this.props.style,
                    transform: [{ translateX: this.state.pan.x }]
                }}>
                <>
                    <Animated.View style={{
                        position: "absolute",
                        // width: this.state.pan.x.interpolate({
                        //     inputRange: [0,1, this.props.dimensiones.width],
                        //     outputRange: ["0%","10%", "110%"]
                        // }),
                        width: "100%",
                        // height: "100%",
                        right: "5%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        transform: [
                            { translateX: (this.props.dimensiones.width * -1) + 20 },
                        ],
                        opacity: this.state.pan.x.interpolate({
                            inputRange: [0, this.parametros.actionLimit],
                            outputRange: [0, 1]
                        }),
                    }}>
                        {this.props.leftContent(this.props.obj, this.props.key)}
                    </Animated.View>
                    <Animated.View style={{
                        position: "absolute",
                        // width: this.state.pan.x.interpolate({
                        //     inputRange: [this.props.dimensiones.width*-1,-1,0 ],
                        //     outputRange: ["110%","10%","0%" ]
                        // }),
                        width: "110%",
                        // height: "100%",
                        left: "5%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        transform: [
                            { translateX: (this.props.dimensiones.width * 1) - 20 },
                        ],
                        opacity: this.state.pan.x.interpolate({
                            inputRange: [this.parametros.actionLimit * -1, 0],
                            outputRange: [1, 0]
                        }),
                        // transform: [{ translateX: Dimensions.get("window").width }]
                    }}>
                        {this.props.rigthContent(this.props.obj, this.props.key)}
                    </Animated.View>
                    <View style={{
                        width: "100%",
                        // height:"100%",
                        // height: "100%",
                    }}>
                        {this.props.children}
                    </View>
                </>
            </Animated.View>
        )
    }
}
