import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';

var INSTANCE = false;
var OPEN = false;
export const openDropDown = ({
    top,
    left,
    bottom,
    rigth,
    width,
    height,
    childrens
}) => {
    if (INSTANCE) {
        INSTANCE.open({
            top,
            left,
            bottom,
            rigth,
            width,
            height,
            childrens
        });
    }
}
export const closeDropDown = () => {
    if (!OPEN) {
        return false;

    }
    INSTANCE.close();
    return true;
}

export default class DropDown extends Component {
    constructor(props) {
        super(props);
        INSTANCE = this;
        this.state = {
            anim: new Animated.Value(0),
            props: false
        };
    }
    open(props) {
        OPEN = this;
        this.setState({ props: props })
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 300,
        }).start()
    }
    close() {
        Animated.timing(this.state.anim, {
            toValue: 0,
            duration: 300,
        }).start(() => {
            this.setState({ props: false })
            OPEN = false;

        })

    }

    render() {
        if (!this.state.props) {
            return <View />
        }
        return (
            <Animated.View style={{
                position: "absolute",
                // backgroundColor: "#ffffff",
                borderRadius: 4,
                overflow: "hidden",
                transform: [
                    {
                        scale: this.state.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }
                ],
                ...this.state.props

            }}>
                <TouchableWithoutFeedback onPress={() => {
                    this.close();
                }}>
                    <View style={{
                        width: "100%",
                        height: "100%",
                        // backgroundColor:"#000"
                    }}>
                        <this.state.props.childrens close={() => this.close()} />
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}

// openDropDown({
//     top: evt.nativeEvent.pageY,
//     left: evt.nativeEvent.pageX,
//     width: 100,
//     height: 100
// })



