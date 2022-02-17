import React, { Component } from 'react';
import { View, Text, ScrollView, ViewStyle, Platform } from 'react-native';
import SThread from '../../SThread';
import Indicator from '../Indicator';

type typeScroll = {
    horizontal: Boolean,
    indicator: Indicator
}
const preventDefault = e => e.preventDefault();

class Scroll extends Component<typeScroll> {
    constructor(props) {
        super(props);
        this.state = {
            direction: (this.props.horizontal ? "Horizontal" : "Vertical")
        };
        this.enabled = true;
    }
    componentWillUnmount() {
        this.setEnabled(true);
    }
    getProps() {
        return this.props;
    }
    getLayout() {
        return this.layout;
    }
    getContentSize() {
        return this.contentSize;
    }
    getState() {
        return this.state;
    }
    setIndicator(ref) {
        this.indicator = ref;
    }
    isHorizontal() {
        return this.props.horizontal;
    }
    noscroll() {
        window.scrollTo(0, 0);
    }
    setEnabled(bool) {
        if (Platform.OS == "web") {
            if (!bool) {
                document.ontouchmove = preventDefault;
                window.addEventListener("scroll", this.noscroll);
            } else {
                window.removeEventListener("scroll", this.noscroll);
                document.ontouchmove = () => { }
            }
        }
        this.enabled = bool;
        this.scrollRef.setNativeProps({ scrollEnabled: bool })
    }
    moveScroll({ x, y }) {
        this.scrollRef.scrollTo({ x, y, animated: false })
    }
    scrollTo({ x, y }, animated) {
        this.scrollRef.scrollTo({ x, y, animated: animated })
    }
    render() {
        return (
            <ScrollView
                className={"scrollView"}
                horizontal={this.props.horizontal}
                ref={(ref) => { this.scrollRef = ref }}
                disableScrollViewPanResponder={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                bounces={false}
                scrollEventThrottle={16}
                onContentSizeChange={(w, h) => {
                    this.contentSize = { width: w, height: h }
                    if (this.indicator) {
                        this.indicator.repaint(this);
                    }
                    // console.log(this.state.direction, "onContentSizeChange", { width: w, height: h })
                }}
                onLayout={(evt) => {
                    this.layout = evt.nativeEvent.layout;
                    if (this.indicator) {
                        this.indicator.repaint(this);
                    }
                }}
                onScroll={(evt) => {
                    this.scrolldata = evt.nativeEvent;
                    if (this.props.onScroll) {
                        this.props.onScroll(evt);
                    }
                    if (!this.enabled) {
                        return;
                    }
                    if (this.indicator) {
                        this.indicator.onScroll(evt.nativeEvent);
                    }
                    if (this.indicator) {
                        this.indicator.onScroll(evt.nativeEvent);
                    }
                    if (this.props.onScrollEnd) {
                        new SThread(350, "scroll_move", true).start(() => {
                            this.props.onScrollEnd(this.scrolldata);
                        })
                    }

                }}
                style={{
                    ...(this.props.disableHorizontal ? {
                        width: "100%",
                    } : {})

                }}
                contentContainerStyle={{
                    ...(this.props.disableHorizontal ? {
                        maxWidth: "100%",
                        minWidth: "100%",
                    } : {}),
                }}
            >
                {this.props.children}
            </ScrollView>
        );
    }
}
Scroll.defaultProps = {
    horizontal: false,
};

export default Scroll;