import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Animated, NativeScrollEvent, ScrollViewProps, Platform } from 'react-native';
import SThread from '../../Component/SThread';
import { SButtom, SText, STheme } from '../../SComponent';
import { SView } from '../SView';
type typeHeader = {
    label: String,
    key: String,
    width: Number
}
// type typeScrollCal = {
//     width: Number,
//     height: Number,
//     maxScroll: { x: Number, y: Number },
//     scrollPos: { x: Number, y: Number }
// }

export type onSrollEndEvt = {
    horizontal: NativeScrollEvent,
    vertical: NativeScrollEvent,
}
type SType = ScrollViewProps & {
    header: [typeHeader],
    data: [Object],
    disableHorizontal: Boolean,
    reverse: Boolean,
    onScrollEnd: (evt: onSrollEndEvt) => {},
    onScroll: (evt: onSrollEndEvt) => {},
    header: Component,
    footer: Component

}
const preventDefault = e => e.preventDefault();
export default class SScrollView extends Component<SType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getScrollCalc = (data) => {

        return {
            width: data.contentSize.width,
            height: data.contentSize.height,
            maxScroll: {
                x: (data.contentSize.width - data.layoutMeasurement.width),
                y: (data.contentSize.height - data.layoutMeasurement.height),
            },
            scrollPos: {
                x: data.contentOffset.x,
                y: data.contentOffset.y,
            },

        }
    }
    scrollInfo = () => {
        var info = {}
        if (this.scroll_h) {
            info["horizontal"] = {
                key: "horizontal",
                ...this.scroll_h
            }
        }
        if (this.scroll_v) {
            info["vertical"] = {
                key: "vertical",
                ...this.scroll_v
            }
        }
        return info;
        // return <View style={{
        //     position: "absolute",
        //     top: 0,
        //     left: 0,
        //     width: 200,
        //     backgroundColor: STheme().colorSecondary + "88",
        //     borderRadius: 8,
        //     padding: 4,
        // }}>
        //     {info.map((data) => {
        //         return <SText options={{
        //             type: "primary",
        //         }}>{JSON.stringify(data, false, "\t").replace(/[\{|\}|,|"]/g, "")}</SText>
        //     })}
        //     <SButtom options={{
        //         type: "outline"
        //     }}
        //         onPress={() => {
        //             this.scrollh.scrollTo({ x: 1, y: 1 })
        //             this.scrollv.scrollTo({ x: 1, y: 1 })
        //         }}
        //     >TO END</SButtom>
        // </View>
    }
    getLayout() {
        if (this.layout) {
            return this.layout
        }
    }
    componentWillUnmount() {
        if (Platform.OS == "web") {
            document.ontouchmove = ()=>{}
            // document.removeEventListener('touchmove', preventDefault);
        }
    }
    setEnabled(en) {
        if (Platform.OS == "web") {
            if (!en) {
                document.ontouchmove = preventDefault;
            } else {
                document.ontouchmove = ()=>{}
            }
        } else {
            if (this.scrollv) {
                this.scrollv.setNativeProps({ scrollEnabled: en })
            }
            if (this.scrollh) {
                this.scrollh.setNativeProps({ scrollEnabled: en })
            }
        }
    }
    scrollIncrement({ x, y }) {
        if (!this.layout) {
            return;
        }
        var { width, height } = this.layout;
        if (this.scroll_v) {
            this.scrollv.scrollTo({ x: this.scroll_v.contentOffset.x + x, y: this.scroll_v.contentOffset.y + y }, true);
        } else {
            this.scrollv.scrollTo({ x: 1, y: 1 }, true);
        }
        if (this.scroll_h) {
            this.scrollh.scrollTo({ x: this.scroll_h.contentOffset.x + x, y: this.scroll_h.contentOffset.y + y }, true);
        } else {
            this.scrollh.scrollTo({ x: 1, y: 1 }, true);
        }
    }
    scrollTo({ x, y }) {
        if (!this.layout) {
            return;
        }
        var { width, height } = this.layout;
        if (this.scrollv) {
            this.scrollv.scrollTo({ x: x - width / 2, y: y - height / 2 }, true);
        }
        if (this.scrollh) {
            this.scrollh.scrollTo({ x: 1, y: 1 }, true);
        }
    }
    moveScrollVertical({ x, y }) {
        if (this.scrollv) {
            this.scrollv.scrollTo({ x, y }, false);
        }
    }
    moveScrollHorizontal({ x, y }) {
        if (this.scrollh) {
            this.scrollh.scrollTo({ x, y }, false);
        }
    }
    scrollToEnd() {

        if (this.scrollv) {
            this.scrollv.scrollToEnd();
        }
        if (this.scrollh) {
            this.scrollv.scrollToEnd();
        }
    }
    // scrollToPosition({ x, y }) {
    //     if (this.scrollv) {
    //         this.scrollv.scrollTo({ x, y });
    //     }
    //     if (this.scrollh) {
    //         this.scrollh.scrollTo({ x, y });
    //     }
    // }
    onScrollAnimationEnd() {
        this.props.onScrollEnd(this.scrollInfo())
    }
    getScroll() {
        if (!this.layout) {
            return <View />
        }
        return <ScrollView

            ref={(ref) => { this.scrollh = ref }}
            horizontal={true}
            style={{
                width: this.layout.width,
                // width: "100%",
            }}
            scrollEventThrottle={16}
            // nestedScrollEnabled={true}
            disableScrollViewPanResponder={true}
            onLayout={(evt) => {
                // this.setState({ scrollh: evt.nativeEvent.layout })
            }}
            onScroll={(evt) => {
                this.scroll_h = evt.nativeEvent;
                if (this.props.onScroll) {
                    this.props.onScroll(this.scrollInfo())
                }
                if (this.props.onScrollEnd) {
                    new SThread(350, "scroll_h", true).start(() => {
                        this.onScrollAnimationEnd();
                    })
                }

                // this.setState({ scroll_h: })
            }}
            // onContentSizeChange={() => {
            //     if (this.props.reverse) {
            //         this.scrollh.scrollToEnd({ amimated: false });
            //     }
            // }}
            contentContainerStyle={{
                ...this.props.contentContainerStyle,
                ...(this.props.disableHorizontal ? { width: "100%" } : {})

            }}
        >
            <View>
                {this.props.header}
                <ScrollView
                    nestedScrollEnabled={true}
                    ref={(ref) => { this.scrollv = ref }}
                    style={{
                        width: "100%",
                        ...this.props.style
                    }}
                    scrollEventThrottle={16}
                    disableScrollViewPanResponder={true}
                    onLayout={(evt) => {
                        // this.setState({ scrollv: evt.nativeEvent.layout })
                    }}
                    onScroll={(evt) => {
                        this.scroll_v = evt.nativeEvent;
                        if (this.props.onScroll) {
                            this.props.onScroll(this.scrollInfo())
                        }
                        if (this.props.onScrollEnd) {
                            new SThread(350, "scroll_v", true).start(() => {
                                this.onScrollAnimationEnd();
                            })
                        }
                        // this.setState({ scroll_v: evt.nativeEvent })
                    }}
                    contentContainerStyle={{ ...this.props.contentContainerStyle }}
                // onContentSizeChange={() => {
                //     if (this.props.reverse) {
                //         this.scrollv.scrollToEnd({ amimated: false });
                //     }
                // }}
                >
                    <View style={{
                        width: "100%",
                        height: "100%",
                        ...this.props.contentContainerStyle
                    }}>
                        {this.props.children}
                    </View>
                </ScrollView>
                {this.props.footer}
            </View>
        </ScrollView>
    }
    render() {

        return (
            <SView style={{
                width: "100%",
                flex: 1,
                ...this.props.style
            }}  >

                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    ...(Platform.OS == "web" ? {
                        position: "fixed",
                    } : {
                        flex: 1,

                    })

                }} onLayout={(evt) => {
                    this.layout = evt.nativeEvent.layout
                    if (!this.state.load) {
                        this.setState({ load: true })
                    }
                }} >
                    {this.getScroll()}
                </SView >
            </SView>
        );
    }
}
