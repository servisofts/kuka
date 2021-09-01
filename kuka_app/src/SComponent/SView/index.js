import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, ViewProps, Animated } from 'react-native';
import { STheme } from '../../SComponent';
import { Variant, TypeVariant } from './variants';
import { Type, TypeType } from './types';
import { Col, TypeCol } from './cols';
import { CustomStyles, TypeStyles } from './styles';
import SSize from '../SSize';
import { SText } from '../SText';
import SDate from '../SDate';
//@ts-ignore
type typeConfig = {
    style: ViewStyle,
    customStyle: TypeStyles,
    type: TypeType,
    variant: TypeVariant,
    col: TypeCol,
    direction: "row" | "column",
    height: any,
    animated: Boolean,
    withoutFeedback: Boolean

}

type typeProps = {
    style: ViewStyle,
    props: typeConfig,
    onPress: Function,
    // ViewPropTypes,
    // TouchableOpacityProps,
    //callBack:Function,
}

interface IProps extends ViewProps {
    animated: Boolean,
    style: ViewStyle,
    props: typeConfig,
    onPress: Function,
    col: TypeCol,
    row: boolean,
    center: boolean,
    flex: number,
    withoutFeedback: Boolean
}

export class SView extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        };
        this.height = new Animated.Value(0);
        // if (this.props.refData) this.props.refData(this, props.data);
    }
    componentDidMount() {
        if (this.props.refData) this.props.refData(this, this.props.data);

    }
    getOption(option) {
        return !this.props.props[option] ? 'default' : this.props.props[option]
    }

    buildStyle() {
        this.style = {
            ...this.props.style,
            ...(this.props.props.style ? this.props.props.style : {}),
            ...(this.props.props.height ? { height: this.props.props.height } : {}),
        }
    }
    getLayout() {
        return this.layout;
    }
    getProp(key) {
        return this.props[key];
    }
    getData() {
        return this.props.data;
    }
    getFlex() {
        if (!this.props.flex) return {}
        if (this.props.flex != 0) {
            if (typeof this.props.flex == "boolean") {
                return { flex: 1 };
            }
        }
        return { flex: this.props.flex };
    }
    render() {
        this.buildStyle();
        this.variant = Variant(this.getOption("variant"));
        this.customStyle = CustomStyles(this.getOption("customStyle"))
        var size = SSize.getSize(this.getOption("col"))
        if (this.props.col) {
            size = SSize.getSize(this.props.col);
        }
        var props = { ...this.props }
        var Component = View;
        if (this.props.animated || this.props.props.animated) {
            Component = Animated.View
        }
        if (this.props.onPress) {
            Component = TouchableOpacity;
            if (this.props.animated) {
                Component = Animated.createAnimatedComponent(Component);
            }
        }
        if (this.props.props.withoutFeedback || this.props.withoutFeedback) {
            Component = TouchableOpacity;
            props.activeOpacity = 1;
            // if (this.props.animated) {
            // Component = Animated.createAnimatedComponent(Component);
            // }
        }
        var childrens = this.props.children;
        if (typeof childrens == "string" || typeof childrens == "number") {
            childrens = <SText options={{
                type: this.getOption("customStyle") == "secondary" ? "primary" : "default"
            }}>{this.props.children}</SText>
        }
        var variantArr = this.getOption('variant')
        var isSquare = false;
        if (typeof variantArr == "string") {
            if (variantArr == "col-square") {
                isSquare = true;
            }
        } else {
            if (variantArr.includes("col-square")) {
                isSquare = true;
            }
        }
        if (isSquare) {
            Component = Animated.View
        }
        // if (this.props.props.withoutFeedback) {
        //     childrens = <TouchableWithoutFeedback onPress={() => { }}>
        //         {this.props.children}
        //     </TouchableWithoutFeedback>
        // }

        return (
            <Component
                {...props}
                ref={(ref) => {

                    // return this;
                }}
                onLayout={(evt) => {
                    this.layout = evt.nativeEvent.layout
                    if (this.props.onLayout) this.props.onLayout(evt);
                    if (isSquare) {
                        var width = evt.nativeEvent.layout.width;
                        // console.log(width)
                        // console.log(size)
                        this.height.setValue(width);
                        // if (this.state.style.height) {
                        //     if (this.state.style.height == width) {
                        //         return;
                        //     }
                        // }
                        if (this.state.style.height != this.height) {
                            this.state.style.height = this.height;
                            this.setState({ ...this.state })
                        }
                    }
                }}
                onPress={() => {
                    if (this.props.onPress) this.props.onPress({
                        layout: this.layout
                    });
                }}
                style={[
                    this.variant.View,
                    this.customStyle.View,
                    {
                        ...size,
                        ...this.style,

                        ...(this.getOption("direction") == "row" || this.props.row ? { flexDirection: "row", flexWrap: "wrap", alignContent: "flex-start", } : {}),
                        ...(this.getFlex()),
                        ...(this.props.center ? { alignItems: "center", justifyContent: "center" } : {})
                    }, {
                        ...this.state.style,
                    }
                ]} >
                {childrens}
            </Component >
        );
    }
}

SView.defaultProps = {
    props: {},
    style: {}
};