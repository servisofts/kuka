import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText } from '../../SText';
import { STheme } from '../../STheme';
import { SView } from '../../SView';
import Opciones from './Opciones';
type SType = {
    data: [Object],
    header: [Object],
}

export default class SFooter extends Component<SType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: 20,
                backgroundColor: STheme().colorDanger,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
            }}>
                <SView props={{
                    direction: "row"
                }} style={{
                    width: "100%", height: "100%"
                }}>
                    <SView props={{
                        variant: "center",
                        col: "xs-3"
                    }}>
                        Algo
                    </SView>
                    <SView props={{
                        direction: "row",
                        variant: "center",
                        col: "xs-6"
                    }}>
                        <SText props={{
                            type: "primary"
                        }}>#F: {Object.keys(this.props.data).length}</SText>
                        <SText props={{
                            type: "primary"
                        }}>#C: {Object.keys(this.props.header).length}</SText>
                    </SView>
                    <SView props={{
                        variant: "center",
                        col: "xs-3"
                    }}>
                        <Opciones />
                    </SView>
                </SView>
            </View>
        );
    }
}
