import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import STheme from '../../../STheme';
import Svg from '../../../Svg';

export default class CheckImput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnable: !props.defaultValue?false:true,
        };
        if (this.props.onChange) this.props.onChange(this.state.isEnable)
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: 60,
                padding: 8,
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    width: 40,
                    height: 40,
                    backgroundColor: STheme.color.card,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: STheme.color.text
                }} onPress={() => {
                    if (this.props.onChange) this.props.onChange(!this.state.isEnable)
                    this.setState({ isEnable: !this.state.isEnable })
                }}>
                    {this.state.isEnable ? <View style={{
                        width: "100%",
                        height: "100%",
                    }}>
                        <Svg name={"Boxeo"} />
                    </View> : <View />}
                    {/* <Text> index </Text> */}
                </TouchableOpacity>
                <Text style={{
                    fontSize: 12,
                    color: STheme.color.text
                }}>{this.props.placeholder}</Text>
            </View>
        );
    }
}
