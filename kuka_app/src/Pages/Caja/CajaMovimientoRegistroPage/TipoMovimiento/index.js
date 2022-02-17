import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText, SView } from '../../../../SComponent';
import Svg from '../../../../Svg';

export default class TipoMovimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selec: this.props.value,
            tipos: {
                '1': {
                    icon: "arrg",
                    label: 'Ingreso'
                },
                '2': {
                    icon: "arrr",
                    label: 'Egreso'
                },
            }
        };
    }

    getSelect(key) {
        if (this.state.selec == key) return <View />
        return <SView style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            maxWidth: 70,
            backgroundColor: "#000000bb",
        }} center>

        </SView>
    }
    getTipo(tipo) {
        var obj = this.state.tipos[tipo];
        return <SView col={"xs-6"} center onPress={() => {
            if (this.props.onChange) this.props.onChange(tipo);
            this.setState({ selec: tipo })
        }}>

            <Svg name={obj.icon} style={{
                width: 50,
                height: 50,
            }} />
            <SText>{obj.label}</SText>
            {this.getSelect(tipo)}
        </SView>
    }
    render() {
        return (
            <SView col={"xs-11"} row>

                {this.getTipo("1")}
                {this.getTipo("2")}
            </SView>
        );
    }
}
