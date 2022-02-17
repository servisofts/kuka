import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Page from '../../../Component/Page';
import { SText, SView } from '../../../SComponent';

export default class FinanzaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getIcon({ label, onPress, icon }) {
        return <SView col={"xs-4 md-3 xl-2"} props={{ variant: "col-square" }}
            style={{
                padding: 8,
            }}>
            <SView style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                backgroundColor: "#66000066"
            }} onPress={onPress}>
                <SText>{label}</SText>
            </SView>
        </SView>
    }
    render() {
        return (
            <Page
                navigation={this.props.navigation}
                title="Finanzas"
            >
                <SView row col={"xs-12"}>
                    {this.getIcon({
                        label: 'Cajas abiertas',
                        icon: "algo",
                        onPress: () => this.props.navigation.navigate('CajasAbiertas'),
                    })}
                    {this.getIcon({
                        label: 'Cajas historico',
                        icon: "algo",
                        onPress: () => this.props.navigation.navigate('CajasPage'),
                    })}
                </SView>
            </Page>
        );
    }
}
