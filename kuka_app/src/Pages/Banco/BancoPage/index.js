import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page';
import FloatButtom from '../../../Component/FloatButtom/index';
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import { SScrollView2, SView } from '../../../SComponent';
import { SText } from '../../../SComponent/SText/index';
import CuentaBancoLista from '../CuentaBancoLista/index';
let component = "banco";

class BancoPage extends Component {
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
                    borderRadius: 4,
                    marginBottom: 8,
                    backgroundColor: "#66000044",
                }} onPress={() => {
                    this.props.navigation.navigate("BancoRegistroPage", { key: obj.key });
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
                        <CuentaBancoLista data={obj} navigation={this.props.navigation} />
                    </SView>
                </SView>
            );
        })

    }
    render() {
        return (
            <Page
                navigation={this.props.navigation}
                title={"Bancos"}>

                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11 md-7 xl-6"} center>
                            {this.getAllBancos()}

                        </SView>
                    </SView>
                </SScrollView2>
                <FloatButtom label={"+"} onPress={() => {
                    this.props.navigation.navigate("BancoRegistroPage");
                }} />
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BancoPage);
