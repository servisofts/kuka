import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, Animated } from "react-native";
const delay = ms => new Promise(res => setTimeout(res, ms));

const DeleteButtom = (props) => {
    const [state, setState] = React.useState({
        isPresed: false,
        duration: 5,
        time: 5
    });
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const getText = () => {
        if (state.isPresed) {
            return state.time;
        }
        return props.label;
    }
  
    const count = () => {
        Animated.timing(fadeAnim, {
            toValue: state.duration - state.time,
            duration: 1000
        }).start(() => {
            state.time -= 1;
            setState({ ...state });
        });
    }
    if (state.time > 0 && state.isPresed) {
        count();
    }
    return (
        <Animated.View
            style={{
                width: 100,
                height: 50,
                borderRadius: 10,
                backgroundColor: fadeAnim.interpolate({
                    inputRange: [0, state.duration],
                    outputRange: ["#99000077", "#990000ff"]
                }),
                justifyContent: "center",
                alignItems: "center",
                margin: 4,
                ...props.style
            }}>
            <TouchableOpacity onPress={() => {
                if (state.isPresed) {
                    state.isPresed = false;
                    setState({ ...state });
                    Animated.timing(fadeAnim).stop();
                    // Animated.timing(fadeAnim, {
                    //     toValue: 0,
                    //     duration: 1
                    // }).start();
                    // return true;
                } else {
                    fadeAnim.setValue(0);
                    state.isPresed = true;
                    state.time = state.duration;
                    setState({ ...state })

                    count();
                }
            }}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text style={{
                    color: "#999",
                    ...props.styleText
                }}>{getText()}</Text>
            </TouchableOpacity >
        </Animated.View>
    )
}
export default DeleteButtom;