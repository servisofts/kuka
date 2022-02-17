import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SContainer } from '../../SContainer';
import { SText } from '../../SText';
import { SView } from '../../SView';

export default class DemoSView extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView props={{
                direction: "row",
            }} >
                <SView props={{
                    variant: "center",
                    col: "xs-6",
                    style: {
                        padding: 8,
                    }
                }} >
                    <SView props={{
                        col: "xs-8",
                        customStyle: "primary",
                        height: 100,
                    }} >

                    </SView>
                </SView>
                <SView props={{
                    col: "xs-6",
                }} >
                    <SView props={{
                        col: "xs-12",
                        customStyle: "primary",
                        height: 100,
                    }} >
                    </SView>
                </SView>

            </SView>
        );
    }
}
