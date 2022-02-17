import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SView } from '../../../../../SComponent';
import { SText } from '../../../../../SComponent/SText/index';
import SDate from '../../../../../SComponent/SDate/index';
import SOrdenador from '../../../../../Component/SOrdenador/index';
import { Line, Rect, Svg } from 'react-native-svg';

var FColor = {
    down: "#660000",
    up: "#006600",
    equal: "#"
}
export default class MovimientosGraphic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getMontoMinimo() {
        var montoMinimo = 999999;
        var total = 0;
        this.getListaOrdenada().map((key) => {
            var obj = this.props.data[key];
            total += obj.monto;
            if (total < montoMinimo) {
                montoMinimo = total;
            }
        })
        if (montoMinimo % 1 > 0) montoMinimo = montoMinimo.toFixed(2);
        return montoMinimo;
    }
    getMontoMaximo() {
        var montoMaximo = 0;
        var total = 0;
        this.getListaOrdenada().map((key) => {
            var obj = this.props.data[key];
            total += obj.monto;
            if (total > montoMaximo) {
                montoMaximo = total;
            }
        })
        if (montoMaximo % 1 > 0) montoMaximo = montoMaximo.toFixed(2);
        return montoMaximo;
    }
    getListaOrdenada() {
        return new SOrdenador([{ key: "fecha_on", order: "asc", peso: 1 }]).ordernarObject(this.props.data);
    }
    getLista() {
        var total = 0;

        return this.getListaOrdenada().map((key) => {
            var obj = this.props.data[key];
            total += obj.monto;
            return <SView flex center>
                <SText style={{ fontSize: 10, color: "#999" }}>{total}</SText>
                <SText style={{ fontSize: 8, color: "#999" }}>{new SDate(obj.fecha_on).toString("hh:mm")}</SText>
            </SView>
        })
    }
    getLines() {
        var montoMinimo = this.getMontoMinimo();
        var montoMaximo = this.getMontoMaximo();
        var { width, height } = this.state.layout;
        var lista = this.getListaOrdenada();
        if (lista.length > 1) {
            var i = 0;
            var x = 0;
            var y = 0;
            var total = 0;
            var media = width / (lista.length - 1);
            return lista.map((key) => {
                var obj = this.props.data[key];
                var color = FColor.down
                x = i * media;
                total += obj.monto;
                y = (total - montoMaximo) / (montoMinimo - montoMaximo) * height;
                var y2 = y;
                if (i < lista.length - 1) {
                    var obj2 = this.props.data[lista[i + 1]];
                    if (total < total + obj2.monto) {
                        color = FColor.up
                    }
                    y2 = ((total + obj2.monto) - montoMaximo) / (montoMinimo - montoMaximo) * height;
                } else {
                    return <View />
                }
                i++;
                return <Line x1={x} y1={y} x2={x + media} y2={y2} stroke={color} strokeWidth="2" />
            })
        } else {
            return <Line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#fff" strokeWidth="1" />
        }
    }
    getSvg() {
        if (!this.state.layout) {
            return <View />
        }
        var { width, height } = this.state.layout;
        return <Svg height="100%" width="100%" viewBox={`0 0 ${this.state.layout.width} ${this.state.layout.height}`}>
            <Line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#66000044" strokeWidth="2" />
            <Line x1="0" y1={height} x2={width} y2={height} stroke="#66000044" strokeWidth="1" />
            <Line x1="0" y1={0} x2={width} y2={0} stroke="#66000044" strokeWidth="2" />
            {this.getLines()}
        </Svg>
    }
    render() {
        if (!this.props.data) return <View />
        return (
            <View style={{
                width: '100%',
                flex: 1,
                marginTop: 4,
            }}>
                <SView col={"xs-12"} row style={{
                    flex: 1
                }}
                    onLayout={(evt) => {
                        if (!this.state.layout) {
                            this.setState({
                                layout: evt.nativeEvent.layout
                            })
                        }
                    }}
                >
                    {this.getSvg()}
                </SView>
                <SText style={{
                    fontSize: 10,
                    position: "absolute",
                    top: 0,
                    color: FColor.up
                }}>Bs. {this.getMontoMaximo()}</SText>
                <SText style={{
                    fontSize: 10,
                    position: "absolute",
                    bottom: 0,
                    color: FColor.down
                }}>Bs. {this.getMontoMinimo()}</SText>
                {/* <SView style={{
                    width: "100%",
                    height: 26,
                }}>
                    <SView col={"xs-12"} row style={{
                        position: "absolute",
                        bottom: 0,
                    }}>
                        {this.getLista()}
                    </SView>
                </SView> */}
            </View>
        );
    }
}
