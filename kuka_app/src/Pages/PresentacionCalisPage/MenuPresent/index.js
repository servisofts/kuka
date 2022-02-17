import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import Svg from '../../../Svg';

export default class MenuPresent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItems = () => {
        return [
            { descripcion: "Ingresar", icon: "Login", route: "LoginPage" },
            // { descripcion: "Finanzas", icon: "Finanza" },
            // { descripcion: "Sistema antiguo", icon: "Santiguo", link: "https://old.calisteniabolivia.com" },
            // { descripcion: "Ajustes", icon: "Ajustes" },
        ].map((obj) => {
            return (<TouchableOpacity style={{
                width: 130,
                height: 130,
                margin: 4,
            }} onPress={() => {
                if (obj.link) {
                    if (Platform.OS == "web") {
                        window.open(obj.link)
                    } else {
                        Linking.openURL(obj.link)
                    }
                }
                if (obj.route) {
                    this.props.navigation.navigate(obj.route);
                }
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Svg name={obj.icon} style={{
                        width: "90%",
                        height: "90%",
                    }} />
                </View>
                <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                        // fontFamily: "myFont"
                    }}>{obj.descripcion}</Text>
                </View>

            </TouchableOpacity>)
        })

    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: 180,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ScrollView style={{
                    width: "100%",
                    height: 150,
                }} horizontal={true}
                    contentContainerStyle={{
                        minWidth: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {this.getItems()}
                </ScrollView>

            </View>
        );
    }
}
