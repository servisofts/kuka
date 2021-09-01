import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import SCarruselItem from './SCarruselItem';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class SCarrusel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
            time: props.time,
        }

    }
    componentDidMount() {
        const hilo = async () => {
            await delay(this.state.time);
            if (this.props.direction == "left") {
                if (this.items[this.state.select]) {
                    this.items[this.state.select].moveLeft();
                    var kref = this.state.select;
                    this.moveLeft(kref);
                }
            } else {
                if (this.items[this.state.select]) {
                    this.items[this.state.select].moveRigth();
                    var kref = this.state.select;
                    this.moveRigth(kref);
                }
            }
            hilo();
        };
        hilo();
    }
    moveLeft = async (kref) => {
        if (this.items[kref - 1]) {
            this.state.select = kref - 1;
        } else {
            this.state.select = this.props.children.length - 1;
        }
        this.items[this.state.select].moveRigth(1);
        await delay(2);
        this.items[this.state.select].center(300);
    }
    moveRigth = async (kref) => {
        if (this.items[kref + 1]) {
            this.state.select = kref + 1;
        } else {
            this.state.select = 0;
        }
        this.items[this.state.select].moveLeft(1);
        await delay(2);
        this.items[this.state.select].center(300);
    }
    renderItems() {
        this.items = {};
        if (!this.state.dimensiones) {
            return <View />
        }
        return this.props.children.map((obj, key) => {
            return (<SCarruselItem
                isSelect={key == this.state.select}
                position={key}
                ref={(ref) => { this.items[key] = ref }}
                dimensiones={this.state.dimensiones}
                leftAction={(data, itm) => {
                    console.log("left")
                    var kref = itm.props.position;
                    this.moveLeft(kref);
                }}
                rigthAction={(data, itm) => {
                    console.log("rigth")
                    var kref = itm.props.position;
                    this.moveRigth(kref);
                }}
            >
                {obj}
            </SCarruselItem>)
        })
    }
    render() {
        return (<View style={{
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }} onLayout={(evt) => {
            const { x, y, width, height } = evt.nativeEvent.layout;
            this.state.dimensiones = { x, y, width, height };
            this.setState({ ...this.state });
        }}>
            {this.renderItems()}
        </View>
        );
    }
}
