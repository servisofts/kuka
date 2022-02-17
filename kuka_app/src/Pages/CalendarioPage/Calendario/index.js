import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SCalendar from '../../../Component/SCalendar';

export default class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>
                <SCalendar />
            </View>
        );
    }
}
