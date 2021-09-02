import React, { Component, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import Svg from '../../../Svg';

class InputDireccion extends Component {
    constructor(props) {
        super(props);
        var direccion = false;
        if (props.defaultValue) {
            direccion = props.defaultValue;
        }
        this.state = {
            value: (!direccion ? this.props.label : direccion.direccion),
            direccion: (!direccion ? false : direccion)
        };
    }
    setError = (bool) => {
        this.setState({ error: bool })
    }
    getValue = () => {
        this.setState({ error: false })
        return this.state.direccion
    }
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                width: "100%",
                alignItems: 'center',
            }}>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderRadius: 5,
                    height: 40,
                    ...this.props.style,
                    borderColor: this.state.error ? "#f00" : "#444",

                }} onPress={() => {
                    this.props.navigation.navigate("BuscarDireccionPage", {
                        select: (data) => {
                            this.setState({ value: data.direccion, direccion: data, })
                        },
                        direccion: this.state.direccion,
                    })
                }}>
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Svg resource={require("../../../img/markerW.svg")}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </View>

                    <Text style={{
                        flex: 1,
                        fontSize: 10,
                        alignItems: 'center',
                        justifyContent: "center",
                        textAlignVertical: "center",
                        fontSize: 13,
                        color: "#fff",
                    }}
                        numberOfLines={1}
                    // onChangeText={(texto) => hanlechage(texto)}
                    >
                        {this.state.value}
                    </Text>
                </TouchableOpacity>
            </View >
        );
    }
}

// const initStates = (state) => {
//     return { state }
// };

// export default connect(initStates)(BuscardorNuevo);
export default InputDireccion;