import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page';
import FloatButtom from '../../../Component/FloatButtom/index';
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import { SScrollView2, SView } from '../../../SComponent';
import { SText } from '../../../SComponent/SText/index';
import CuentaBancoLista from '../CuentaBancoLista/index';
import BackgroundImage from '../../../Component/BackgroundImage/index';
let component = "banco";

class BancoSelect extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAllBancos = () => {
        var reducer = this.props.state.bancoReducer;
        if (!reducer.data) {
            if (reducer.estado == "cargando") {
                return <Text>Carfando</Text>;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: component,
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return <View />
        }

        var data = reducer.data;
        return Object.keys(data).map((key) => {
            var obj = data[key];
            return (
                <SView col={"xs-12"} key={obj.key} style={{
                    borderRadius: 8,
                    marginBottom: 8,
                    backgroundColor: "#66000044",
                }} row>
                    <SView col={"xs-12"} row style={{
                        height: 60,
                    }}>
                        <SView style={{
                            width: 60,
                            height: 60,
                        }} center>
                            <SView style={{
                                width: 45,
                                height: 45,
                                borderRadius: 8,
                                overflow: "hidden"
                            }}>
                                {this.props.state.imageReducer.getImage(AppParams.urlImages + component + "_" + obj.key, {
                                })}
                            </SView>

                        </SView>
                        <SView style={{
                            height: "100%",
                            justifyContent: "center",
                        }}>
                            <SText style={{
                                fontSize: 16,
                            }} >{obj.descripcion}</SText>
                        </SView>
                    </SView>

                    <SView col={"xs-12"} style={{
                        height: "100%",
                    }}>
                        <CuentaBancoLista data={obj} navigation={this.props.navigation} onSelect={this.props.onSelect} />
                    </SView>
                </SView>
            );
        })

    }
    render() {
        return (
            <SView col={"xs-12 md-9 xl-7"} style={{
                height: 1000,
                maxHeight: "100%",
                borderRadius: 8,

            }}>
                <BackgroundImage />
                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11.5"} style={{
                            height: 16
                        }} />
                        <SView col={"xs-11.5"} center>
                            {this.getAllBancos()}

                        </SView>
                    </SView>
                </SScrollView2>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BancoSelect);
