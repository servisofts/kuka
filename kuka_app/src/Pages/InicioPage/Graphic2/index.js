import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Graphic2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLine = ({ width, color }) => {
        return <View style={{
            alignItems: "center",
            height:"100%",
        }}>

            <View style={{
                flex: 1,
                height: "100%",
                justifyContent: "flex-end",
                alignItems: "flex-end"
            }}>
                <View style={{
                    width: 10,
                    height: width,
                    backgroundColor: color,
                    borderRadius: 100,
                }}>
                </View>
            </View>
            <View style={{
                width: 50,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    color: "#fff"
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
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    {/* <Text style={{
                        color: "#fff"
                    }}>Progreso</Text> */}
                    {this.getLine({ width: "100%", color: "#592C2F" })}
                    {this.getLine({ width: "70%", color: "#8F775A" })}
                    {this.getLine({ width: "33%", color: "#754D3D" })}
                    {this.getLine({ width: "18%", color: "#464940" })}
                    {this.getLine({ width: "70%", color: "#8F775A" })}
                    {this.getLine({ width: "37%", color: "#4E1C2B" })}
                </View>
            </View >
        );
    }
}
