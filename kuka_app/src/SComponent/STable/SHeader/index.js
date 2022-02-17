import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import SAPanResponder from '../../SAnimated/SAPanResponder';
import { SText } from '../../SText';
import { SView } from '../../SView';

export default class SHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.header,
            widthHeaderAnim: {

            },
            positionHeader: {

            },
            animSelect: {

            },
            panHeader: {

            },
            panMoveHeader: {

            },
            load: false,
        };

    }
    setScrollEnabled(val) {
        if (this.props.getScroll) {
            this.props.getScroll().setEnabled(val)
        }
    }
    createPanMove(key) {
        return new SAPanResponder({
            onGrand: (e, gs) => {
                this.move = 0
                var anim = this.state.positionHeader[key];
                this.startPosition = {
                    x: anim.x._value,
                    y: anim.y._value
                }
                this.lastMoved = {
                    x: anim.x._value,
                    y: 0
                }
                anim.flattenOffset();
                // this.animPosition.setOffset({
                //     x: this.animPosition.x._value,
                //     y: this.animPosition.y._value
                // });
                this.state.animSelect[key].setValue(10);
                this.setScrollEnabled(false)
                // this.scroll.setEnabled(false)
            },
            onMove: (e, gs) => {


                var anim = this.state.positionHeader[key];
                var animWidthP = this.state.widthHeaderAnim[key]
                anim.setValue({ x: this.startPosition.x + gs.dx, y: 0 })
                var arrKeys = Object.keys(this.state.positionHeader);

                arrKeys.map((keyHeader) => {
                    if (key != keyHeader) {

                        var animPosHeader = this.state.positionHeader[keyHeader];
                        var animWidth = this.state.widthHeaderAnim[keyHeader]
                        var center = animPosHeader.x._value + (animWidth.x._value / 2);
                        if (center > anim.x._value && center < anim.x._value + animWidthP.x._value) {
                            var direction = 1;
                            if (center - anim.x._value < (anim.x._value + animWidthP.x._value) - center) {
                                direction = -1;
                                console.log(-1)
                            }
                            var temp = animPosHeader.x._value;
                            animPosHeader.setValue({ x: temp - (animWidthP.x._value * direction), y: 0 })

                            if (direction == -1) {
                                this.lastMoved = {
                                    x: temp,
                                    y: 0
                                }
                            } else {
                                this.lastMoved = {
                                    x: (temp - (animWidthP.x._value * direction)) + (animWidth.x._value * direction),
                                    y: 0
                                }
                            }

                            // animPosHeader.setValue({ x: animPosHeader.x._value + gs.dx - this.lastdx, y: 0 })
                        }

                        return;
                    }
                    return;
                });
                // this.props.onMove(gs);
            },
            onRelease: () => {
                var anim = this.state.positionHeader[key];
                if (this.move) {
                    new Animated.timing(anim, {
                        toValue: {
                            x: this.startPosition.x + (this.move * -1),
                            y: 0
                        },
                        duration: 100,
                    }).start();
                    // this.props.reload();
                } else {
                    new Animated.timing(anim, {
                        toValue: this.lastMoved,
                        duration: 100,
                    }).start();
                }
                this.state.animSelect[key].setValue(1);
                this.setScrollEnabled(true)
            },
        });
    }
    createPan(key) {
        return new SAPanResponder({
            onGrand: (e, gs) => {
                var anim = this.state.widthHeaderAnim[key];
                this.startWidth = anim.x._value;
                this.lastdx = 0;
                // this.anim.flattenOffset();
                // // this.anim.setOffset({
                // //     x: this.anim.x._value,
                // //     y: this.anim.y._value
                // // });
                this.setScrollEnabled(false)
                // this.scroll.setEnabled(false)
            },
            onMove: (e, gs) => {
                if (this.startWidth + gs.dx <= 20) {
                    return;
                }
                var anim = this.state.widthHeaderAnim[key];
                var animPos = this.state.positionHeader[key];
                anim.setValue({ x: this.startWidth + gs.dx, y: 0 })
                // console.log(gs.dx)
                var arrKeys = Object.keys(this.state.positionHeader);

                arrKeys.map((keyHeader) => {
                    if (key != keyHeader) {
                        var animPosHeader = this.state.positionHeader[keyHeader];
                        if (animPos.x._value < animPosHeader.x._value) {
                            animPosHeader.setValue({ x: animPosHeader.x._value + gs.dx - this.lastdx, y: 0 })
                        }
                        return;
                    }
                    return;
                });
                this.lastdx = gs.dx;

            },
            onRelease: () => {
                if (this.props.contentSize) {
                    var anim = this.state.widthHeaderAnim[key];
                    this.props.contentSize.setValue({ x: this.props.contentSize.x._value + (anim.x._value - this.startWidth), y: this.props.contentSize.y._value });
                }
                // this.state.obj.width = this.anim.x._value;
                // this.props.reload();
                // this.props.changeSize(this.layout.width + 1 - this.anim.x._value)
                // // this.anim.extractOffset();
                // this.scroll.setEnabled(true)
                this.setScrollEnabled(true)

            }
        });

    }
    getHeaders() {
        let position = 0;
        var total = 0;
        return this.state.data.map((obj, key) => {
            if (!this.state.widthHeaderAnim[obj.key]) {
                this.state.widthHeaderAnim[obj.key] = new Animated.ValueXY({ x: obj.width, y: 0 })
                total += obj.width;
                if (this.props.contentSize) {
                    if (this.props.contentSize.x._value - total <= 0) {
                        this.props.contentSize.setValue({ x: this.props.contentSize.x._value + obj.width, y: this.props.contentSize.y._value });
                    }
                }
            }
            if (!this.state.positionHeader[obj.key]) {
                this.state.positionHeader[obj.key] = new Animated.ValueXY({ x: position, y: 0 })

            }
            if (!this.state.panHeader[obj.key]) {
                this.state.panHeader[obj.key] = this.createPan(obj.key);
            }
            if (!this.state.panMoveHeader[obj.key]) {
                this.state.panMoveHeader[obj.key] = this.createPanMove(obj.key);
            }
            if (!this.state.animSelect[obj.key]) {
                this.state.animSelect[obj.key] = new Animated.Value(1);
            }

            position += this.state.widthHeaderAnim[obj.key].x._value
            if (!this.state.load) {
                this.props.loadAnimated({
                    widthHeaderAnim: this.state.widthHeaderAnim,
                    positionHeader: this.state.positionHeader,
                    animSelect: this.state.animSelect,
                }, true)
                this.state.load = true;
            }

            return <SView

                props={{
                    // customStyle: "secondary",
                    variant: "center",
                    animated: true
                }}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: this.state.widthHeaderAnim[obj.key].x,
                    height: "100%",
                    zIndex: this.state.animSelect[obj.key],
                    ...this.props.style,
                    transform: [
                        { translateX: this.state.positionHeader[obj.key].x }
                    ]
                }}>
                <SView
                    props={{
                        direction: "row",
                        variant: "center",
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}>
                    <SView
                        {...this.state.panMoveHeader[obj.key].getPanHandlers()}
                        props={{ animated: true, variant: "center" }}
                        style={{
                            flex: 1,
                            height: "100%",
                        }}
                    >
                        <SText props={{
                            type: "primary"
                        }} style={{
                            textAlign: "center"
                        }}>
                            {obj.label}
                        </SText>

                    </SView>

                    <SView
                        {...this.state.panHeader[obj.key].getPanHandlers()}
                        props={{
                            animated: true
                        }}
                        style={{
                            right: 0,
                            position: "absolute",
                            width: 16,
                            height: "100%",
                            cursor: "cell",
                            alignItems: "flex-end",
                        }}>
                        <SView style={{
                            width: 4,
                            height: "100%",
                            backgroundColor: "#666"
                        }}>

                        </SView>

                    </SView>
                    <SView style={{
                        right: 4,
                        top: 0,
                        width: 20,
                        position: "absolute",
                        height: 20,
                        backgroundColor: "#ffffff22"
                    }} onPress={() => {

                    }}>

                    </SView>
                </SView>
            </SView>
        });
    }
    render() {
        return (
            <SView
                props={{
                    animated: true
                }}
                style={{
                    top: 0,
                    left: 0,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#000",
                    // transform: [
                    //     { translateY: this.props.headerPosition.y }
                    // ]
                }}
            >
                {this.getHeaders()}
            </SView>
        );
    }
}
