import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class DropMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        };
    }

    render() {
        return (
            <>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#00000033",
                    borderRadius: 4,
                    ...this.props.style
                }}>
                    <Text>O</Text>
                </View>
            </>
        );
    }
}
