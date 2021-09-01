import React, { Component } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { STheme } from '../../SComponent';

type typeConfig = {
    type: "subrayado" | "primary" | "default",
    variant: "default" | "h1" | "h2" | "h3" | "h4" | "h5",
}
type typeProps = {
    style: TextStyle,
    options: typeConfig,
    props: typeConfig,
    fontSize: number,
    // onPress: Function,
    //callBack:Function,
};


export class SText extends Component<typeProps> {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getOption(option) {
        var opt = {
            ...this.props.options,
            ...this.props.props
        }
        return !opt[option] ? "default" : opt[option]
    }
    //---RENDER
    getTypes(theme) {
        return {
            "default": StyleSheet.create({
                text: {
                    color: theme.colorSecondary,
                    // ...this.props.style,
                }
            }),
            "primary": StyleSheet.create({
                text: {
                    color: theme.colorPrimary,
                    // ...this.props.style,

                }
            }),
            "subrayado": StyleSheet.create({
                text: {
                    color: theme.colorSecondary,
                    textDecorationLine: "underline",
                    // ...this.props.style
                }
            }),
        }

    }
    getVariant(theme) {
        return {
            "default": StyleSheet.create({
                text: {
                    fontSize: 12,
                }
            }),
            "h1": StyleSheet.create({
                text: {
                    fontSize: 34,
                    fontWeight: 'bold',
                }
            }),
            "h2": StyleSheet.create({
                text: {
                    fontSize: 28,
                    fontWeight: 'bold',
                }
            }),
            "h3": StyleSheet.create({
                text: {
                    fontSize: 22,
                    fontWeight: 'bold',
                }
            }),
            "h4": StyleSheet.create({
                text: {
                    fontSize: 16,
                    fontWeight: 'bold',
                }
            }),
            "h5": StyleSheet.create({
                text: {
                    fontSize: 10,
                    fontWeight: 'bold',
                }
            }),
        }
    }
    render() {
        this.styleType = this.getTypes(STheme())
        this.variant = this.getVariant(STheme())
        //---RETURN
        var variant = this.variant[this.getOption("variant")]
        var style = this.styleType[this.getOption("type")]
        var VAL = this.props.children;
        // if (typeof VAL == "object") {
        //     try {
        //         VAL = JSON.stringify(VAL);
        //     } catch (e) {
        //         VAL = "ERROR"
        //     }
        // }

        return (
            <Text style={[variant.text, style.text, this.props.style, {
                ...(this.props.fontSize ? { fontSize: this.props.fontSize } : {}),
            }]}>{VAL}</Text>
        );
    }
}

SText.defaultProps = {
    options: {
    },
    props: {},
    style: {
        // width: 100,
        // height: 40,
    }
};
