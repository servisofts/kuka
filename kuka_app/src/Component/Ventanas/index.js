import React, { Component } from 'react'
import { Dimensions, Text, View, Animated, TouchableOpacity } from 'react-native'

class Ventanas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ventana: props.default,
            animate: {},
        }
        Object.keys(this.props.ventanas).map((key) => {
            if (key == props.default) {
                this.state.animate[key] = new Animated.Value(0)
            } else {
                this.state.animate[key] = new Animated.Value(Dimensions.get("window").width * +1)
            }
        })
    }
    change(props) {
        this.state.ventana = props;
        var encontro = false;
        this.setState({ ventana: props })
        Object.keys(this.props.ventanas).map((key) => {
            if (key == props) {
                encontro = true;
                Animated.timing(this.state.animate[key], {
                    toValue: 0,
                    duration: 150
                }).start();
            } else {
                if (!encontro) {
                    Animated.timing(this.state.animate[key], {
                        toValue: (Dimensions.get("window").width * -1),
                        duration: 150
                    }).start();
                } else {
                    Animated.timing(this.state.animate[key], {
                        toValue: (Dimensions.get("window").width * +1),
                        duration: 150
                    }).start();
                }
            }
        })
    }
    render() {
        const getButtoms = () => {
            return Object.keys(this.props.ventanas).map((key) => {
                return (
                    <TouchableOpacity style={{
                        flex: 1,
                        margin: 4,
                        // backgroundColor: "#ffffff",
                        borderRadius: 4,
                        // borderWidth: 1,
                        borderBottomWidth: (key == this.state.ventana ? 3 : 1),
                        borderColor: (key == this.state.ventana ? "#fff" : "#666"),
                        justifyContent: "center",
                        alignItems: "center",
                    }} onPress={() => {
                        this.change(key);
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>{key}</Text>
                    </TouchableOpacity>
                )
            })
        }
        const getVentanas = () => {
            return Object.keys(this.props.ventanas).map((key) => {
                return (
                    <Animated.View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        // backgroundColor: "#f0f",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: [{ translateX: this.state.animate[key] }]
                    }}>
                        {this.props.ventanas[key]}
                    </Animated.View>
                )
            })
        }
        return (<View style={{
            width: "100%",
            // height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>

            {getVentanas()}
            <View style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: 40,
                // backgroundColor: "#fff",
                flexDirection: "row",
            }}>
                {getButtoms()}
            </View>
        </View>)
    }
}
export default Ventanas;