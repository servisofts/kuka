import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Graphic1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLine = ({ width, color, title }) => {
        return <View style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
        }}>
            <View style={{
                width: 80,
                justifyContent: "center",
                alignItems:"center"
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize:10,
                }}>{title}</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 18,
                // justifyContent:"center",
                alignItems: "center"
            }}>
                <View style={{
                    width: width,
                    height: 10,
                    backgroundColor: color,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                }}>
                </View>
                <Text style={{
                    color: "#fff",
                    fontSize:8,
                }}>{width}</Text>
            </View>

        </View>
    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <View style={{
                    width: "90%",
                    maxWidth: 500,
                    height: "100%",
                    justifyContent: "space-around",
                    padding: 8,
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#fff"
                    }}>Progreso</Text>

                    {this.getLine({ width: "100%", color: "#8F775A", title: "Análisis" })}
                    {this.getLine({ width: "100%", color: "#592C2F", title: "Aseguramiento" })}
                    {this.getLine({ width: "10%", color: "#754D3D", title: "Negociación" })}
                    {this.getLine({ width: "0%", color: "#464940", title: "App admin" })}
                    {this.getLine({ width: "0%", color: "#4E1C2B", title: "App clientes" })}
                </View>
            </View >
        );
    }
}
