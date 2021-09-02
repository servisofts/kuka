import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SText, SButtom, STheme, SContainer, SPopupOpen } from "../../../SComponent"

class DemoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.miStyle = StyleSheet.create({

        });

    }
    getText() {
        return <View>
            <SText>default</SText>
            <SText options={{ variant: "h1" }} >variant: "h1"</SText>
            <SText options={{ variant: "h2" }} >variant: "h2"</SText>
            <SText options={{ variant: "h3" }} >variant: "h3"</SText>
            <SText options={{ variant: "h4" }} >variant: "h4"</SText>
            <SText options={{ variant: "h5" }} >variant: "h5"</SText>
            <SContainer options={{
                type: "secondary",
                variant: "col"
            }}>
                <SText options={{ variant: "h5", type: "primary" }} >variant: "h5"  - type: "primary"</SText>
                <SText options={{ variant: "h2", type: "primary" }} >variant: "h2"  - type: "primary"</SText>
            </SContainer>
        </View>
    }
    getButtom() {
        return <View>
            <SButtom > default </SButtom>
            <SButtom options={{
                type: "outline"
            }} > outline </SButtom>
        </View>
    }
    getThemes() {
        return <View>
        </View>
    }
    getSPopup() {
        return <View>
            <SButtom options={{
                type: "secondary"
            }} onPress={() => {
                SPopupOpen({
                    key: "OpenPop1",
                    content: (<SText >
                        hola
                    </SText>)
                })
            }} > Open Type 1 </SButtom>
        </View>
    }
    getSGrid() {
        return <View>
            <SButtom
                options={{
                    type: "secondary"
                }}
                onPress={() => {
                    this.props.navigation.navigate("SComponentGridDemo");
                }} > Ver Grid </SButtom>
        </View>
    }
    getSInput() {
        return <View>
            <SButtom
                options={{
                    type: "secondary"
                }}
                onPress={() => {
                    this.props.navigation.navigate("InputDemo");
                }} > InputDemos </SButtom>
        </View>
    }
    getOption = (tipoObjeto) => {
        var cont = false;
        switch (tipoObjeto) {
            case "SText": cont = this.getText();
                break;
            case "SButtom": cont = this.getButtom();
                break;
            case "STheme": cont = this.getThemes();
                break;
            case "SPopup": cont = this.getSPopup();
                break;
            case "SGrid": cont = this.getSGrid();
                break;
            case "SInput": cont = this.getSInput();
                break;
        }
        return <SContainer options={{
            variant: "col"
        }}>
            <SText options={{
                variant: "h3",
                type: "subrayado"
            }} >{tipoObjeto}</SText>
            {cont}
        </SContainer>

    }
    render() {
        return (
            <SContainer options={{
                type: "primary",
            }} style={{

            }}>
                <SText options={{
                    type: "subrayado",
                    variant: "h1"
                }} >SComponent</SText>
                {this.getOption("SThemes")}
                {this.getOption("SText")}
                {this.getOption("SButtom")}
                {this.getOption("SPopup")}
                {this.getOption("SGrid")}
                {this.getOption("SInput")}
            </SContainer>
        );
    }
}
export default DemoPage;