import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';


type propst = {
    close: Function,
    left: Boolean
}
export default class CloseButtom extends Component<propst> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static defaultProps = {
        close: () => { },
        left: true,
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.close();
                    return <View />
                }}
                style={{
                    width: 42,
                    height: 42,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: "absolute",
                    // backgroundColor: "#ff00ff44",    
                    top: 0,
                    ...(!this.props.left ? { left: 0 } : { right: 0 }),
                    ...this.props.style
                }}>
                <Svg
                    // name={this.props.icon?this.props.icon:"close"}
                    resource={require("../../img/arrow.svg")}
                    style={{
                        width: 23,
                        height: 23,
                        fill: "#FFFF00",
                    }} />
            </TouchableOpacity>
        );
    }
}
