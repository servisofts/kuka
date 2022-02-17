import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Page from '../../Component/Page'
import { SText, SView } from '../../SComponent'
import Svg from '../../Svg'
import PerfilUsuario from './PerfilUsuario'

export default class AjustesPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props)
        this.state = {
            text: 'Ajustes'
        }
    }

    getOptions({ title, icon }, isLine) {
        return <SView col={"xs-12"} style={{
            height: 50,
            backgroundColor: "#66000066",
            // borderRadius: 4,
        }} center row onPress={() => {

        }}>
            <SView style={{
                width: 60,
            }} center>
                <Svg name={icon} style={{
                    width: 35,
                    height: 35,
                }} />
            </SView>
            <SView flex style={{
                height: "100%",
                justifyContent: "center",
                borderBottomWidth: (!isLine ? 1 : 0),
                borderBottomColor: "#66666644",
                paddingStart: 4,
            }}>
                <SText style={{ fontSize: 14 }}>{title}</SText>
            </SView>
        </SView>
    }
    render() {
        return (
            <Page
                navigation={this.props.navigation}
                title={"Ajustes"}
            >
                <SView col={"xs-12"} center flex>
                    <SView col={"xs-11 sm-9 md-7 lg-5 xl-4"} style={{
                        // backgroundColor: "#66000022",
                        borderRadius: 6,
                        height: "100%",
                        alignItems: "center"
                    }}>
                        <SView col={"xs-12"} style={{ height: 24 }} />
                        <SView style={{
                            width: "100%",
                            borderRadius: 8,
                            overflow: "hidden",
                        }}>
                            <PerfilUsuario navigation={this.props.navigation} />
                        </SView>
                        <SView col={"xs-12"} style={{ height: 24 }} />
                        <SView style={{
                            width: "100%",
                            borderRadius: 8,
                            overflow: "hidden",
                        }}>
                            {this.getOptions({ title: "Carrito", icon: "Carrito" })}
                            {this.getOptions({ title: "Ajustes", icon: "Ajustes" })}
                            {this.getOptions({ title: "Caja", icon: "Caja" }, true)}
                        </SView>
                    </SView>
                </SView>
            </Page>
        )
    }
}
