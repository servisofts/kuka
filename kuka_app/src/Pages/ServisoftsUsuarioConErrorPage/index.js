import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ClientesDuplicados from '../ServisoftsPage/EtapaMigracion/clientes_duplicados.json';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import SSCrollView from '../../Component/SScrollView';
export default class ServisoftsUsuarioConErrorPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista = () => {
        return ClientesDuplicados.map((obj) => {
            return <View style={{
                width: "100%",
                flexDirection: "row",
                height: 30,
            }}>
                <Text style={{ color: "#fff", flex: 1, }}>{obj.nombre}</Text>
                <Text style={{ color: "#fff" }}>{obj.cantidad}</Text>
            </View>
        })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BackgroundImage source={require("../../img/background.png")} />
                <BarraSuperior navigation={this.props.navigation} title={"Usuarios con error"} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    flex: 1,
                    width: "100%",
                }}>
                    <SSCrollView style={{
                        width: "100%",
                        flex: 1,
                    }}>
                        <Text style={{ color: "#fff", marginBottom:16, }}>Los siguientes clientes se encuantran en mal estado</Text>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            height: 30,
                            marginBottom:16,
                        }}>
                            <Text style={{ color: "#fff", flex: 1, }}>Nombre</Text>
                            <Text style={{ color: "#fff" }}># de errores</Text>
                        </View>
                        {this.getLista()}
                    </SSCrollView>
                </View>
            </View>
        );
    }
}
