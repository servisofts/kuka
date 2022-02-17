import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import STheme from '../../STheme';
import Svg from '../../Svg';
const FloatButtom = (props) => {
    if (props.esconder) {
        return <View />
    }
    return (
        <TouchableOpacity onPress={() => {
            props.onPress();
        }}
            style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                width: 50,
                height: 50,
                // borderWidth: STheme.color.secondary + "22",
                // borderColor: STheme.color.secondary + "22",
                justifyContent: "center",
                alignItems: "center",
                // margin: 4,
                ...props.style
            }}>
            <Svg name={"Add"} style={{
                width: "100%",
                height: "100%",
                // fill:"#C31"
            }} />
        </TouchableOpacity >
    )
}
export default FloatButtom;