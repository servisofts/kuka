import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class DropFileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <View {...this.props}>
                {this.props.children}
            </View>
        );
    }
}
