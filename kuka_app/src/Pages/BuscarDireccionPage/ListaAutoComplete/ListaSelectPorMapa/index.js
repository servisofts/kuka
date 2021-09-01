import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../../Svg'

class ListaSelectPorMapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    // this.getDetail();
                    this.props.changeType()
                }}
                style={{
                    width: "95%",
                    height: 60,
                    margin: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                <View style={{
                    width: 50,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <Svg resource={require("../../../../img/pointer.svg")}
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#000"
                        }} />
                </View>

                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            color: "#000",
                            fontSize: 13,
                            margin: 5,
                        }}>{"Seleccionar ubicacion en el mapa."}</Text>
                    </View>

                    <View style={{
                        height: 1.2,
                        width: "96%",
                        backgroundColor: "#a4a4a4"
                    }}>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
export default ListaSelectPorMapa
