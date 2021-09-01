import { object } from 'prop-types';
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class GraphicDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLine = ({ width, color, title }) => {
        return <View style={{
            alignItems: "center",
            width: "100%",
        }}>
            <Text style={{
                color: "#999",
                fontSize: 10,
            }}>{title}</Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}>
                <View style={{
                    width: 40,
                    justifyContent: "center",
                }}>
                    <Text style={{
                        color: "#fff"
                    }}>{width}</Text>
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        width: width,
                        height: 10,
                        backgroundColor: color,
                        borderTopRightRadius: 100,
                        borderBottomRightRadius: 100,
                    }}>
                    </View>
                </View>

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
                    width: "100%",
                    maxWidth: 500,
                    height: "100%",
                    // justifyContent: "space-around",
                    padding: 8,
                    // alignItems: "center"
                }}>
                    <Text style={{
                        color: "#fff",
                        marginBottom: 8,
                    }}>Resultado de análisis</Text>
                    {this.getLine({ width: "100%", color: "#8F775A", title: "Análisis" })}
                    {this.getLine({ width: "100%", color: "#58B059", title: "Aseguramiento" })}
                    {this.getLine({ width: "100%", color: "#8D8D94", title: "Base de datos" })}
                    {this.getLine({ width: "100%", color: "#4F57A1", title: "Codigo" })}
                    {this.getLine({ width: "69%", color: "#ffffff", title: "Servidor" })}
                </View>
            </View >
        );
    }
}
