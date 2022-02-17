import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BackgroundImage from '../BackgroundImage';
import BarraSuperior from '../BarraSuperior';
type CalisPageType = {
    title: String
}
export default class CalisPage extends Component<CalisPageType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                flex: 1
            }}>
                <BackgroundImage />
                <BarraSuperior title={this.props.title} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1
                }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
