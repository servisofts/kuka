import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const delay = ms => new Promise(res => setTimeout(res, ms));

type typeProps = {
    onDoublePress: Function,
    onSinglePress: Function,
    onLongPress: Function,
}

export default class TouchableDouble extends Component<typeProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.press = 0;
    }
    static defaultProps = {
        onDoublePress: () => { },
        onSinglePress: () => { },
        onLongPress: () => { }
    }

    verify = async () => {
        await delay(300)
        if (this.press == 2) {
            this.props.onDoublePress()
        } else {
            this.props.onSinglePress()
        }
        this.press = 0;
    }

    render() {
        return (
            <TouchableOpacity {...this.props}
                activeOpacity={0.7}
          
                onLongPress={() => {
                    this.props.onLongPress();
                }}
                onPress={() => {
                    if (this.press == 0) {
                        this.verify();
                    }
                    this.press += 1;
                }}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}
