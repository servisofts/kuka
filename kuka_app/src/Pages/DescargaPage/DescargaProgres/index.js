import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProgressCircle from '../../../Component/ProgressCircle';
import Svg from '../../../Svg';

export default class DescargaProgres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPorcent: 0,
        };
    }
    animateTo(value, duration) {
        this.setState({ curPorcent: value });
        this._progress.animateTo(value, duration);
    }
    getContenido() {
        if (this.state.curPorcent <= 0) {
            return (<TouchableOpacity style={{
                width: 300,
                height: 300,
                padding: 40,
                // backgroundColor: "#ffffff99",
                borderRadius: 200,
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.props.descargar();
            }}>
                <Svg resource={require("../../../img/download.svg")} style={{
                    width: "70%",
                    height: "70%",
                }} />
            </TouchableOpacity>)
        } else {
            var porcent = (1 - this.state.curPorcent) * 100;
            return (<TouchableOpacity style={{
                width: 300,
                height: 300,
                padding: 40,
                backgroundColor: "#ff6666",
                borderRadius: 200,
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {

            }}>
                <Text style={{ fontSize: 45, color: "#fff" }}>{porcent.toFixed(0) + "%"}</Text>
            </TouchableOpacity>)
        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                // backgroundColor:"#000",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ProgressCircle
                    initialColor={"#660000"}
                    finalColor={"#006600"}
                    porcentInicio={100}
                    strokeWidth={20}
                    width={320}
                    ref={(ref) => {
                        this._progress = ref;
                    }}
                    duration={10000}>
                    {this.getContenido()}
                </ProgressCircle>
            </View>
        );
    }
}
