import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.task) {
            return <View />
        }
        if (!this.props.task.fecha_inicio) {
            return <View />
        }
        if (!this.props.task.fecha_fin) {
            return <View />
        }
        if (!this.props.date) {
            return <View />
        }
        // if (!) {
        //     return <View />
        // }
        if (this.props.date.isBefore(this.props.task.fecha_inicio) && !this.props.date.equalDay(this.props.task.fecha_inicio) || this.props.date.isAfter(this.props.task.fecha_fin) && !this.props.date.equalDay(this.props.task.fecha_fin)) {
            return <View />
        }
        return (
            <View style={[{
                position: "absolute",
                width: "100%",
                height: 15,
                backgroundColor: "#66000099",
            },
            (this.props.date.equalDay(this.props.task.fecha_inicio) ? {
                borderTopLeftRadius: 100,
                borderBottomLeftRadius: 100,
            } : {}),
            (this.props.date.equalDay(this.props.task.fecha_fin) ? {
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
            } : {}),
            ]}>
            </View>
        );
    }
}
