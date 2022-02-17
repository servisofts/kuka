import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import Svg from '../../../Svg';

const delay = ms => new Promise(res => setTimeout(res, ms));

class BarraSuperior extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            lastSelect: false
        };
        if (this.props.value) {
            if (this.props.value.direccion) {
                this.state.value = this.props.value.direccion;
                this.state.lastSelect = this.props.value;
            }
        }
        // console.log(this.props.value)
        this.props.dispatch({
            component: "locationGoogle",
            type: "autoComplete",
            estado: "exito",
            data: false
        })
    }

    validate = async () => {
        await delay(500);
        let curtime = new Date().getTime();
        if ((curtime - this.lastPress) < 400) {
            return;
        }
        if (this.state.value.length <= 3) {
            this.props.dispatch({
                component: "locationGoogle",
                type: "autoComplete",
                estado: "exito",
                data: false
            })
            return;
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "locationGoogle",
            type: "autoComplete",
            data: {
                direccion: this.state.value,
                latitude: -17.78629,
                longitude: -63.18117
            },
            estado: "cargando"
        }, true);
    }
    render() {

        if (this.props.value != this.state.lastSelect) {
            let data = this.props.value;
            if (data.direccion) {
                this.setState({
                    value: data.direccion,
                    lastSelect: data,
                })
                this.preventRender = true;
            }

        }

        return (
            <View style={{
                height: 80,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <View style={{
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 4,
                    height: 45,
                    width: "90%",
                    flexDirection: "row",
                }}>
                    <TouchableOpacity style={{
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => { this.props.navigation.goBack() }}>
                        <Svg resource={require("../../../img/arrow.svg")} style={{
                            width: 20,
                            height: 20,
                        }} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                    }}>
                        <TextInput style={{
                            width: "100%",
                            height: "100%",
                            color: "#fff"
                        }}
                            value={this.state.value}
                            placeholder={"Buscar destino"}
                            placeholderTextColor={"#eee"}
                            onChangeText={(txt) => {
                                this.lastPress = new Date().getTime();
                                this.setState({ value: txt })
                                if (!this.preventRender) {
                                    this.validate();
                                } else {
                                    this.preventRender = false;
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(BarraSuperior);