import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import SAPanResponder from '../../../SAnimated/SAPanResponder';
import { SText } from '../../../SText';
import { SView } from '../../../SView';

export default class SHeaderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: this.props.obj
        };
        this.move = 0;
        this.animSelect = new Animated.Value(0);
        // this.anim = new Animated.ValueXY({ x: this.props.obj.width, y: 0 });
        this.anim = props.anim;
        this.pan = new SAPanResponder({
            onGrand: (e, gs) => {
                this.startWidth = this.anim.x._value;
                this.anim.flattenOffset();
                // this.anim.setOffset({
                //     x: this.anim.x._value,
                //     y: this.anim.y._value
                // });
                this.scroll.setEnabled(false)
            },
            onMove: (e, gs) => {
                if (this.startWidth + gs.dx <= 10) {
                    return;
                }
                this.anim.setValue({ x: this.startWidth + gs.dx, y: 0 })

            },
            onRelease: () => {
                this.state.obj.width = this.anim.x._value;
                this.props.reload();
                this.props.changeSize(this.layout.width + 1 - this.anim.x._value)
                // this.anim.extractOffset();
                this.scroll.setEnabled(true)

            }
        });

        this.animPosition = props.animPosition
        this.panMove = new SAPanResponder({
            onGrand: (e, gs) => {
                this.move = 0
                this.startPosition = {
                    x: this.animPosition.x._value,
                    y: this.animPosition.y._value
                }
                this.animPosition.flattenOffset();
                // this.animPosition.setOffset({
                //     x: this.animPosition.x._value,
                //     y: this.animPosition.y._value
                // });
                this.animSelect.setValue(10);
                this.scroll.setEnabled(false)
            },
            onMove: (e, gs) => {
                this.animPosition.setValue({ x: this.startPosition.x + gs.dx, y: 0 })
                this.props.onMove(gs);
            },
            onRelease: () => {
                if (this.move) {
                    new Animated.timing(this.animPosition, {
                        toValue: {
                            x: this.startPosition.x + (this.move * -1),
                            y: 0
                        },
                        duration: 100,
                    }).start();
                    this.props.reload();
                } else {
                    new Animated.timing(this.animPosition, {
                        toValue: this.startPosition,
                        duration: 100,
                    }).start();
                }

                this.animSelect.setValue(1);
                this.scroll.setEnabled(true)
                this.move = 0

                // this.props.changeSize(this.layout.width + 1 - this.startWidth)
            }
        });
    }
    componentDidMount() {
        this.props.onLoad(this);
        // console.log("ASdasasdas ")
    }
    getAnimates() {
        return {
            anim: this.anim,
            animPosition: this.animPosition,
            animSelect: this.animSelect
        }
    }
    getLayout() {
        if (!this.layout) {
            return {}
        }
        return {
            ...this.layout,
            xReal: this.layout.left + this.animPosition.x._value,
            width: this.anim.x._value,
        }
    }
    setLayout(layout) {
        this.layout = {
            ...this.layout,
            ...layout
        }
    }
    setObj(obj) {
        this.setState({ obj: obj })
    }
    getObj() {
        return this.state.obj;
    }
    setMove(move) {
        this.move += move;
    }
    setLastMoved(ref) {
        this.lastMoved = ref;
    }
    getLastMoved() {
        return this.lastMoved;
    }
    onMoveBrother(ref, gs) {
        if (this.state.onAnimated) return
        var layoutP = ref.getLayout();
        var myLayout = this.getLayout();
        var pxinicio = layoutP.xReal;
        var pxfinal = layoutP.xReal + layoutP.width

        var myCenter = myLayout.xReal + (myLayout.width / 2);

        if (myCenter > pxinicio && myCenter < pxfinal) {
            console.log(pxinicio+" - "+pxfinal)
            console.log(myCenter)

            var toValue = layoutP.width
            var moved = myLayout.width
            if (myCenter - pxinicio > pxfinal - myCenter) {
                toValue = toValue * -1
                moved = moved * -1;
            }
            ref.setMove(moved);
            this.setState({ onAnimated: true })

            new Animated.timing(this.animPosition, {
                toValue: { x: this.animPosition.x._value + toValue, y: 0 },
                duration: 100,
            }).start(() => {
                this.setState({ onAnimated: false })
                // if (this.props.onChangePosition) this.props.onChangePosition(this, ref);
            });
        }
    }
    render() {
        this.scroll = this.props.getScroll();
        return (
            <SView props={{
                direction: "row",
                animated: true,
            }}
                onLayout={(evt) => { this.layout = evt.nativeEvent.layout }}
                style={{
                    width: this.anim.x,
                    height: "100%",
                    zIndex: this.animSelect,
                    transform: [
                        { translateX: this.animPosition.x }
                    ]
                }}>
                <SView
                    {...this.panMove.getPanHandlers()}
                    props={{
                        customStyle: "primary",
                        animated: true,
                        variant: "center",
                    }} style={{
                        flex: 1,
                        height: "100%",

                    }}>
                    <SText options={{
                    }} style={{
                        textAlign: "center"
                    }}>
                        {/* {this.getLayout().xReal} */}
                        {this.props.obj.label}
                    </SText>

                </SView>
                <SView
                    {...this.pan.getPanHandlers()}
                    props={{
                        customStyle: "secondary",
                        animated: true
                    }}
                    style={{
                        width: 10,
                        height: "100%",
                        cursor: "cell"
                    }}></SView>
            </SView>
        );
    }
}


