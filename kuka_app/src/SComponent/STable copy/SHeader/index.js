import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { SText } from '../../SText';
import { SView } from '../../SView';
import SHeaderItem from './SHeaderItem';

export default class SHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.header
        };
        this.headers = [];
        this.anims = [];
        this.animsPosition = [];
    }

    getRef(i) {
        if (this.state.data.length != this.headers.length) {
            return false;
        }
        return this.headers[i];
    }
    getHeaders() {
        return this.state.data.map((obj, key) => {
            obj["index"] = key;
            this.anims[key] = new Animated.ValueXY({ x: obj.width, y: 0 });
            var start = 0;
            if (key > 0) {
                start = this.animsPosition[key - 1].x._value + this.anims[key - 1].x._value
            }
            this.animsPosition[key] = new Animated.ValueXY({ x: 0, y: 0 });

            return (<SHeaderItem
                ref={(ref) => { this.headers[key] = ref }}
                obj={obj}
                onLoad={(ref) => {
                    this.props.onLoad(key, ref)
                }}
                anim={this.anims[key]}
                animPosition={this.animsPosition[key]}
                getScroll={() => { return this.props.getScroll() }}
                layoutParent={() => { return this.layout }}
                onMove={(gs) => {
                    this.headers.map((brother, bkey) => {
                        if (key == bkey) {
                            return;
                        }
                        brother.onMoveBrother(this.headers[key], gs);
                    })
                }}
                reload={() => {
                    var arr = this.headers.map((brother, bkey) => {
                        return brother.getObj();
                    })
                    var lista = arr.sort(function (a, b) {
                        if (a.index > b.index) {
                            return 1;
                        }
                        if (a.index < b.index) {
                            return -1;
                        }
                        return 0;
                    });
                    this.props.setHeader(lista, true);
                }}
                onChangePosition={(from: SHeaderItem, to: SHeaderItem) => {
                    var indexFrom = from.getObj().index;
                    var indexTo = to.getObj().index;
                    from.setObj({ ...from.getObj(), index: indexTo })
                    to.setObj({ ...to.getObj(), index: indexFrom })
                }}
                changeSize={(size) => {
                    this.layout.width += size;
                    this.setState({ layout: this.layout })
                }}
            />)
        })
    }
    render() {
        return (
            <SView props={{
                direction: "row",
                style: {
                    height: 40,
                    width: !this.state.layout ? "100%" : this.state.layout.width,
                }
            }} onLayout={(evt) => {
                this.layout = evt.nativeEvent.layout
                this.setState({ layout: this.layout })
            }}>
                {this.getHeaders()}
            </SView>
        );
    }
}
