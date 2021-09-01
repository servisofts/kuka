import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Animated } from 'react-native';
import { SButtom, SText, STheme, SThread } from '../../SComponent';
import SScrollView from '../SScrollView';
import { SView } from '../SView';
import SHeader from './SHeader';
import SData from './SData'
import SScrollView2 from '../SScrollView2';
import SFooter from './SFooter';
type typeHeader = {
    label: String,
    key: String,
    width: Number,
    index: Number,
}
type SType = {
    header: [typeHeader],
    data: [Object],
    style: {

    }
}

export default class STable extends Component<SType> {
    constructor(props) {
        super(props);
        var lista = this.props.header.sort(function (a, b) {
            if (a.index > b.index) {
                return 1;
            }
            if (a.index < b.index) {
                return -1;
            }
            return 0;
        });
        this.state = {
            header: lista,
            animates: {
            }
        };
        this.contentSize = new Animated.ValueXY({ x: 200, y: 0 })
        this.headerPosition = new Animated.ValueXY({ x: 0, y: 0 })
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%"
            }}>
                <SView props={{
                    // direction:"row",
                }} style={{
                    width: "100%",
                    flex: 1,
                }}>
                    <SScrollView2
                        ref={(ref) => { this.scroll = ref; }}
                        header={{
                            style: {
                                height: 40,
                            },
                            content: (
                                <SHeader
                                    style={{
                                        backgroundColor: STheme().colorDanger,
                                    }}
                                    header={this.state.header}
                                    contentSize={this.contentSize}
                                    getScroll={() => { return this.scroll }}
                                    loadAnimated={(animates, reset) => {
                                        this.state.animates = animates;
                                        if (!animates["widthHeaderAnim"] || reset) {
                                            this.setState({ animates: this.state.animates })
                                        }
                                    }}
                                />)
                        }
                        }
                    >
                        <SView props={{
                            direction: "row",
                            animated: true
                        }} style={{
                            width: this.contentSize.x,
                            height: "100%",
                            flex: 1,
                            // backgroundColor: "#f0f"
                        }}>
                            <SData
                                ref={(ref) => { this.refData = ref }}
                                data={this.props.data}
                                header={this.state.header}
                                animates={this.state.animates} />
                            <View style={{
                                width: "100%",
                                height: 20,
                            }}>

                            </View>
                        </SView>
                    </SScrollView2>
                </SView>
                <SFooter data={this.props.data}
                    header={this.state.header}
                />

            </View>
        );
    }
}
