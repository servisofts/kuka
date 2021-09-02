import React, { Component } from 'react';
import {
    View,
    NativeScrollEvent,
    ScrollViewProps,
    ScrollView,
    Platform,
    ViewStyle
} from 'react-native';
import Indicator from './Indicator';
import Scroll from './Scroll';

export type onSrollEndEvt = {
    horizontal: NativeScrollEvent,
    vertical: NativeScrollEvent,
}
type SType = ScrollViewProps & {
    disableHorizontal: Boolean,
    reverse: Boolean,
    onScrollEnd: (evt: onSrollEndEvt) => {},
    onScroll: (evt: onSrollEndEvt) => {},
    header: { style: ViewStyle, content: Component },
    footer: Component

}
export default class SScrollView2 extends Component<SType> {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.setRef("this", this);
    }

    setRef(key, ref) {
        if (!this.state.ref) {
            this.state.ref = {};
        }
        this.state.ref[key] = ref;
    }
    getRef(key) {
        return this.state.ref[key];
    }
    scrollTo({ x, y }) {
        if (!this.layout) {
            return;
        }
        var { width, height } = this.layout;
        if (this.getRef("scrollv")) {
            this.getRef("scrollv").scrollTo({ x: x - width / 2, y: y - height / 2 }, true);
        }
        if (this.getRef("scrollh")) {
            this.getRef("scrollh").scrollTo({ x: 1, y: 1 }, true);
        }
    }
    setEnabled(en) {
        this.getRef("scrollh").setEnabled(en);
        this.getRef("scrollv").setEnabled(en);
        if (Platform.OS == "web") {
            // if (!en) {
            //     document.ontouchmove = preventDefault;
            // } else {
            //     document.ontouchmove = () => { }
            // }
        } else {

        }
    }
    render() {
        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>
                <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    alignItems: "center",
                }} onLayout={(evt) => {
                    this.layout = evt.nativeEvent.layout
                }}>
                    <View style={{
                        maxWidth: "100%",
                        height: "100%",
                        ...(this.props.disableHorizontal ? {
                            minWidth: "100%",
                        } : {}),
                    }}>
                        <Scroll
                            disableHorizontal={this.props.disableHorizontal}
                            ref={(ref) => { this.setRef("scrollh", ref) }}
                            horizontal={true}
                            onScroll={this.props.onScroll}
                            {...!this.props.onScrollEnd ? {} : {
                                onScrollEnd: (evt) => {
                                    this.props.onScrollEnd({
                                        horizontal: {
                                            key: "horizontal",
                                            ...evt
                                        }
                                    })
                                }
                            }}
                        >
                            <View style={{
                                width: "100%",
                            }}>
                                <Scroll
                                    disableHorizontal={this.props.disableHorizontal}
                                    ref={(ref) => { this.setRef("scrollv", ref) }}
                                    onScroll={this.props.onScroll}
                                    {...!this.props.onScrollEnd ? {} : {
                                        onScrollEnd: (evt) => {
                                            this.props.onScrollEnd({
                                                vertical: {
                                                    key: "vertical",
                                                    ...evt
                                                }
                                            })
                                        }
                                    }}
                                >
                                    <View style={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                        <View style={{ width: "100%", height: this.props.header.style.height, }}></View>
                                        {this.props.children}
                                    </View>
                                </Scroll>

                                <View style={{
                                    position: "absolute",
                                    width: "100%",
                                    top: 0,
                                    left: 0,
                                    ...this.props.header.style
                                }}>
                                    {this.props.header.content}
                                </View>

                            </View>
                        </Scroll>
                        <Indicator ref={(ref) => {
                            if (ref) {
                                ref.setScroll(this.state.ref["scrollh"]);
                            }
                            this.setRef("indicatorH", ref)
                        }}
                        />
                        <Indicator ref={(ref) => {
                            if (ref) {
                                ref.setScroll(this.state.ref["scrollv"]);
                            }
                            this.setRef("indicatorV", ref)
                        }}
                        />
                    </View>

                </View>
            </View>
        );
    }
}

SScrollView2.defaultProps = {
    header: {
        style: {},
        content: <View />
    }
}