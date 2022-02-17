import React, { Component } from 'react';
import { View, StyleSheet, ViewProps, ScrollView } from 'react-native';
import { STheme } from '../../SComponent';
import SSize from '../SSize';

type typeCol = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
type typeConfig = {
    type: 'default' | 'secondary' | 'primary' | "outline" | "outline-secondary" | "center",
    variant: 'default' | "col" | "col-square" | "row" | 'page',
    col: {
        'xs': typeCol,
        'sm': typeCol,
        'md': typeCol,
        'lg': typeCol,
        'xl': typeCol,
    }
    // ['xs-1' | 'xs-2' | 'xs-3' | 'xs-4' | 'xs-5' | 'xs-6' | 'xs-7' | 'xs-8' | 'xs-8' | 'xs-10' | 'xs-11' | 'xs-12' |
    //     'md-1' | 'md-2' | 'md-3' | 'md-4' | 'md-5' | 'md-6' | 'md-7' | 'md-8' | 'md-8' | 'md-10' | 'md-11' | 'md-12'],

}
type typeProps = ViewProps & {
    // style: ViewProps.style,
    options: typeConfig,
    // onPress: Function,
    //callBack:Function,
}


export class SContainer extends Component<typeProps> {
    constructor(props) {
        super(props);
        this.state = {
            style: {

            },
        };

    }
    getOption(option) {
        return !this.props.options[option] ? 'default' : this.props.options[option]
    }
    //---RENDER
    getTypes() {
        return {
            default: StyleSheet.create({
                view: {
                    ...this.props.style,
                },
            }),
            center: StyleSheet.create({
                view: {
                    // backgroundColor: STheme().colorPrimary,
                    // height: "100%",
                    justifyContent: 'center',
                    alignItems: "center",
                    ...this.props.style,
                },
            }),
            primary: StyleSheet.create({
                view: {
                    backgroundColor: STheme().colorPrimary,
                    ...this.props.style,
                },
            }),
            secondary: StyleSheet.create({
                view: {
                    backgroundColor: STheme().colorSecondary,
                    ...this.props.style,
                },
            }),
            "outline": StyleSheet.create({
                view: {
                    borderWidth: 1,
                    borderRadius:4,
                    borderColor: STheme().colorPrimary,
                    ...this.props.style,
                },
            }),
            "outline-secondary": StyleSheet.create({
                view: {
                    borderWidth: 1,
                    borderRadius:4,
                    borderColor: STheme().colorSecondary,
                    ...this.props.style,
                },
            }),
        }
    }
    getVariant(theme) {
        return {
            'page': StyleSheet.create({
                view: {
                    // flex: 1,
                    // overflow: "hidden",
                },
            }),
            'default': StyleSheet.create({
                view: {
                    flex: 1,
                },
            }),
            'col': StyleSheet.create({
                view: {
                    overflow: "hidden",
                    width: "100%",
                },
            }),
            "col-square": StyleSheet.create({
                view: {
                    overflow: "hidden",
                    width: "100%",
                    height:"100%",
                },
            }),
            'row': StyleSheet.create({
                view: {
                    // overflow: "hidden",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                },
            }),
        }
    }
    //---RENDER
    render() {
        // var theme = SThemeStyle();
        this.styleType = this.getTypes()
        this.variant = this.getVariant()
        //---RETURN
        var variant = this.variant[this.getOption('variant')]
        var style = this.styleType[this.getOption('type')]
        var size = SSize.getSize(this.getOption("col"))

        if (this.getOption('variant') == "page") {
            return (
                <View
                    {...this.props}
                    style={[variant.view, style.view, {
                        ...size,
                        width: "100%",
                        flex: 1,
                        position: "relative"
                        // backgroundColor: "#f0f"
                    }]}
                >
                    <View style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}>
                        <ScrollView style={{
                            width: "100%",
                            height: "100%",
                        }} contentContainerStyle={{
                            width: "100%",
                            minHeight: "100%",
                            alignItems: "center",
                        }}>
                            {this.props.children}
                        </ScrollView>
                    </View>

                </View >
            );
        }
        return (
            <View
                onLayout={(evt) => {
                    if (this.getOption('variant') == "col-square") {
                        var width = evt.nativeEvent.layout.width;
                        if (this.state.style.height) {
                            if (this.state.style.height == width) {
                                return;
                            }
                        }
                        this.state.style.height = width;
                        this.setState({ ...this.state })
                    }
                }}
                {...this.props}
                style={[variant.view, style.view, { ...size, ...this.state.style }]}

            >
                {this.props.children}
            </View >
        );
    }
}

SContainer.defaultProps = {
    options: {},
    style: {}
};