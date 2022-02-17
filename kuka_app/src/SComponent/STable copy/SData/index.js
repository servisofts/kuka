import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SView, SText, SThread, STheme } from '../../../SComponent'
export default class SData extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
    getRow(obj, key) {
        return this.props.header.map((header, i) => {
            var Anims = this.props.getAnimates(i);
            return (
                <SView props={{
                    variant: "center",
                    animated: true,
                }} style={{
                    left:0,
                    height: "100%",
                    width: (Anims.anim ? Anims.anim.x : header.width),
                    // borderWidth: 1,
                    transform: [
                        { translateX: (Anims.animPosition ? Anims.animPosition.x : 0) }
                    ]
                }}>
                    <SText style={{
                        color: "#fff",
                    }}>
                        {this.getData(obj, header.key)}
                    </SText>
                </SView>
            );
        })

    }
    render() {
        return this.props.data.map((obj, key) => {
            return (
                <SView props={{
                    direction: "row",
                    style: {
                        width:"100%",
                        height: 40,
                        marginTop: 5,
                        borderBottomWidth: 1,
                        borderColor: STheme().colorOpaque + "66"
                    }
                }}>
                    {this.getRow(obj, key)}
                </SView>
            );
        })

    }
}
