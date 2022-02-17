import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SContainer, SText, STheme, SView } from '../../../SComponent';

export default class Documentacion extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getInfo({ title, detail, page }) {
        return <SView props={{
            variant: ["center","col-square"],
            col: {
                "xs": "6",
                "sm": "4",
                "md": "4",
                "lg": "3",
                "xl": "3"
            }
        }}>
            <SView props={{
                variant: "center",
                col: "xs-11",
            }} style={{
                backgroundColor: STheme().colorSecondary + "22",
                borderRadius: 8,
                height: "100%",
                padding: 8,
            }}
                onPress={() => {
                    this.props.navigation.navigate(page)
                }}
            >
                <SText props={{
                    variant: "h3",
                }} style={{
                    textAlign: "center",
                }}>{title}</SText>
                <SText style={{
                    marginTop: 8,
                    textAlign: "center",
                }}>{detail}</SText>
            </SView>
        </SView >
    }
    render() {
        return (
            <SContainer options={{
                type: "primary",
                variant: "page",
            }}>
                <SContainer options={{
                    type: "center",
                    variant: "row",
                    col: { xs: 12 }
                }}>
                    <SContainer options={{
                        variant: "col",
                        col: { xs: 12 }
                    }} style={{
                        alignItems: "center"
                    }}>
                        <SText options={{
                            variant: "h3",
                        }}>SComponent</SText>
                        <SText options={{
                            variant: "h5"
                        }}>Documentacion</SText>
                    </SContainer>
                    <SView props={{
                        variant: ["center"],
                        col: "xs-12",
                        direction: "row",
                    }} style={{
                        justifyContent: "space-around",
                    }}>
                        {this.getInfo({
                            title: "Sobre SComponent?",
                            page: "SobreSCPage",
                            detail: "ServiSofts Components es una libreria para facilitar el diseño en React-Native-Web-App. \n Permitiendo "
                        })}
                        {this.getInfo({
                            title: "Implementacion",
                            page: "ImplementacionPage",
                            detail: "Utilizar SComponents es muy facil, "
                        })}
                        {this.getInfo({
                            title: "Componentes",
                            page: "SComponentDemoPage",
                            detail: "Echa un vistaso a los SComponents."
                        })}
                    </SView>

                </SContainer>

            </SContainer>
        );
    }
}
