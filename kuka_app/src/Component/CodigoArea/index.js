import React, { Component } from "react";
import {View, StyleSheet } from "react-native";
import { Picker } from '@react-native-community/picker';
export default class CodigoArea extends Component {
    state = {
        selectSexo: "No definirlo",
        category: [
            {
                sexo: "Hombre",
            },
            {
                sexo: "Mujer",
            },
            {
                sexo: "No definirlo",
            },
        ]
    };

    async onValueChangeCat(sexo) {
        this.setState({ selectSexo: sexo });
        this.props.onChangeText(sexo);
        return <View />
    }
    render() {
        return (
            <View style={this.props.style}>
                <View style={{ flex: 1, fontSize: 16, alignItems: 'center', justifyContent: 'center', }}>
                    <Picker
                        itemStyle={styles.itemStyle}
                        mode="dropdown"
                        style={styles.pickerStyle}
                        selectedValue={this.state.selectSexo}
                        onValueChange={this.onValueChangeCat.bind(this)}
                    >
                        {this.state.category.map((item, index) => (
                            <Picker.Item
                                color="#000"
                                label={item.sexo}
                                value={item.sexo}
                                index={index}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    itemStyle: {
        fontSize: 14,
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',      
        color: "#000"
    },
    pickerStyle: {
        width: "100%",
        height: 50,
        color: "#000",
        fontSize: 14,
    },
    textStyle: {
        fontSize: 14,
    }
});



