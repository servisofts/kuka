import moment from 'moment';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class Cronometro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        };
    }

    componentDidMount() {

    }
    contar = async () => {
        await delay(10);
        this.setState({ time: this.state.time + 10 })
        if (!this.isRun) return false;
        this.contar();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    getTime() {
         var mont =  moment(this.state.time);
        var minutos = mont.format("mm");
        var seconds = mont.format("ss");
        var decimas =0

        return <View style={{
            width: 200,
            height: 100,
            borderRadius: 16,
            backgroundColor: "#ffffff99",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        }}>
            <Text style={{
                color: "#000",
                fontSize: 37,
            }}>{minutos}:{seconds}</Text>
            <Text style={{
                color: "#000",
                fontSize: 20,
                marginTop: 8,
            }}>.{decimas}</Text>
        </View>
    }
    render() {
        return (
            <View>
                {this.getTime()}
                <TouchableOpacity style={{
                    width: 40,
                    height: 20,
                    backgroundColor: "#ffffff22"
                }} onPress={() => {
                    this.isRun = !this.isRun;
                    this.contar();
                }}>
                    <Text style={{
                        color: "#fff"
                    }}>Iniciar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
