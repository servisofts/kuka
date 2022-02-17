import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { STheme } from '../../SComponent';
type typeConfig = {
    type: 'default',
    variant: 'default',
}
type typeProps = {
    style: View.Style,
    options: typeConfig,
    // onPress: Function,
    //callBack:Function,
}

export class SAnimated extends Component<typeProps> {
    constructor(props) {
        super(props);
        this.state = {
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
                    borderRadius: 4,
                    backgroundColor: STheme().colorPrimary,
                    borderWidth: 1,
                    borderColor: STheme().colorPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...this.props.style,
                },
            }),
        }
    }
    getVariant(theme) {
        return {
            'default': StyleSheet.create({
                view: {
                    flex: 1,
                    width: '100%',
                    height: '100%',
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
        return (
            <View style={[variant.view, style.view]}>
                {this.props.children}
            </View >
        );
    }
}

SAnimated.defaultProps = {
    options: {},
    style: {}
};