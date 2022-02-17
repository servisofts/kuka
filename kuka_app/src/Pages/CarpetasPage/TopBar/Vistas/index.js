import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { openDropDown, closeDropDown } from '../../../../Component/DropDown';
import Svg from '../../../../Svg';
import ModoVista from '../ModoVista';

export default class Vistas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vista: "drag"
        };
        this.iconLista = require('../../../../img/list.svg');
        this.iconDrag = require('../../../../img/drag.svg');
    }

    render() {
        return (<TouchableOpacity
            onLayout={(evt) => {
                this.layout = evt.nativeEvent.layout;
            }}
            ref={(ref) => { this._ref = ref; }}
            style={{
                width: 43,
                height: 43,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#ffffff44"
            }} onPress={(evt) => {
                var isClose = closeDropDown();
                if (isClose) {
                    return;
                }
                var pos = {
                    top: 0,
                    left: 0
                }
                if (Platform.OS == "web") {
                    var layout2 = this._ref.getBoundingClientRect();
                    pos = {
                        top: layout2.y + layout2.height,
                        left: layout2.x
                    }
                } else {
                    pos = {
                        top: this.layout.y + this.layout.height + 40,
                        left: this.layout.x
                    }
                }
                openDropDown({
                    top: pos.top,
                    left: pos.left,
                    width: 50,
                    height: 50,
                    childrens: (evt) => {
                        return <View style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#00000099",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {/* <ModoVista {...this.props} vista={"lista"} /> */}
                            <TouchableOpacity style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                // backgroundColor: "#ffffff44"
                            }} onPress={() => {
                                if (this.state.vista == "drag") {
                                    this.props.changeVista("lista");
                                    this.setState({ vista: "lista" })
                                } else {
                                    this.props.changeVista("drag");
                                    this.setState({ vista: "drag" })
                                }
                                evt.close();
                            }}>
                                <Svg resource={this.state.vista == "drag" ? this.iconLista : this.iconDrag} style={{
                                    width: 30,
                                    height: 30,
                                    // fill:"#fff"
                                }} />
                            </TouchableOpacity>
                        </View>
                    }
                })
            }}>
            <Svg resource={this.state.vista != "drag" ? this.iconLista : this.iconDrag} style={{
                width: 28,
                height: 28,
                // fill:"#fff"
            }} />
        </TouchableOpacity>
        );
    }
}
