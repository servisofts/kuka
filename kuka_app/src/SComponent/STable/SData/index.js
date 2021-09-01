import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { SView, SText, SThread, STheme } from '../../../SComponent'
export default class SData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorSelect: STheme().colorDanger,
            select: {
                x: -1,
                y: -1
            },
        };
        this.animHeight = new Animated.Value(30);
    }
    reloadAnimate = () => {
        console.log("Recargando animate")
        // this.setState({ headerLoad: false })
    }
    getData = (obj, key) => {
        var path = key.split("/");
        var data = obj;
        path.map((dir) => {
            if (!data) data = {};
            if (typeof data == "string") {
                try { data = JSON.parse(data) } catch (e) { }
            }
            data = data[dir];
        })
        return data;
    }
    getColorHover({ x, y }) {
        if ((this.state.select.x == x && this.state.select.y == y)) {
            return this.state.colorSelect + "33";
        }
        if ((this.state.select.x == x || this.state.select.y == y)) {
            return this.state.colorSelect + "11";
        }
        return "transparent";
    }
    getRow(obj, key) {

        return this.props.header.map((header, i) => {
            var Anims = this.props.animates;
            if (!Anims) {
                return <View />
            }
            if (!Anims.widthHeaderAnim) {
                return <View />
            }
            return (
                <SView props={{
                    variant: "center",
                    animated: true,
                }} style={{
                    position: "absolute",
                    left: 0,
                    height: "100%",
                    borderWidth: 1,
                    borderColor: STheme().colorOpaque + "22",
                    backgroundColor: this.getColorHover({ x: header.key, y: key }),
                    width: (Anims.widthHeaderAnim[header.key] ? Anims.widthHeaderAnim[header.key].x : header.width),
                    zIndex: (Anims.animSelect[header.key] ? Anims.animSelect[header.key] : 1),
                    transform: [
                        { translateX: (Anims.positionHeader[header.key] ? Anims.positionHeader[header.key].x : 0) }
                    ]
                }} >
                    <SView props={{
                        variant: "center"
                    }} style={{
                        width: "100%",
                        height: "100%",
                    }} onPress={() => {
                        // Anims.animHover[header.key].setValue(1);
                        console.log(obj)
                        console.log(key)
                        console.log(header)
                        this.setState({
                            select: {
                                x: header.key,
                                y: key
                            }
                        })
                    }}>
                        <SText style={{
                            color: "#fff",
                        }}>
                            {this.getData(obj, header.key)}
                        </SText>
                    </SView>
                </SView>
            );
        })

    }
    render() {
        if (!this.props.animates) {
            return <View />
        }
        return this.props.data.map((obj, key) => {
            return (
                <SView props={{
                    direction: "row",
                    animated: true,
                    style: {
                        width: "100%",
                        height: this.animHeight,
                        // backgroundColor:"#f0f"
                    }
                }}>

                    {this.getRow(obj, key)}
                </SView>
            );
        })

    }
}
