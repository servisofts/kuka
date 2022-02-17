import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, ViewStyle, Platform } from 'react-native';
import SImage from '../SImage';
type TypeProps = {
    style: ViewStyle,
    onLayout: Function,
    backgroundImage: String,
    width: Number,
    height: Number,
}

export default class SNestedScrollView extends Component<TypeProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static defaultProps = {
        onLayout: () => { },
        style: {},
        width: 1000,
        height: 1000,
    }
    setNativeProps = (props) => {
        this._scrollViewH.setNativeProps(props);
        this._scrollViewV.setNativeProps(props);
    }
    getBackground = () => {
        if (!this.props.backgroundImage) {
            return <View />
        }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            // opacity: 0.8,
            ...this.props.style,
        }}>
            <SImage source={this.props.backgroundImage} style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
            }} />
            <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                opacity: (0.7 + (Platform.OS == "web" ? -0.2 : 0)),
                backgroundColor: "#000000"
            }}>

            </View>
        </View>
    }
    render() {
        return (
            <>
                {this.getBackground()}
                <ScrollView style={{
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#000",
                }}
                    // disableScrollViewPanResponder={true}
                    alwaysBounceHorizontal={false}
                    ref={(ref) => { this._scrollViewH = ref }}
                    horizontal={true}
                    contentContainerStyle={{
                        // width: this.props.width,
                        minWidth: "100%",
                        height: "100%"
                    }}>
                    <ScrollView ref={(ref) => { this._scrollViewV = ref }}
                        style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                        }}
                        // disableScrollViewPanResponder={true}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{
                            width: "100%",
                            minHeight: "100%",
                            // height: this.props.height,
                            justifyContent: "center",
                            alignItems: "center",
                        }}

                    >
                        <View style={{
                            width: this.props.width - (Platform.OS == "web" ? 10 : 0),
                            height: this.props.height,
                            overflow: "hidden",
                            backgroundColor: "#00000022",
                        }} onLayout={this.props.onLayout}>
                            {this.props.children}
                        </View>
                    </ScrollView >
                </ScrollView>
            </>
        );
    }
}
