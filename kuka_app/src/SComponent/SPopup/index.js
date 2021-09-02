import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
// import Svg from '../../Svg';
import { SScrollView } from '../../SComponent'
import { SView } from '../SView';
import Alert from './Alert';
import Confirm from './Confirm';
import SPopupComponent from './SPopupComponent';

var INSTANCE = false;


export const SPopupOpen = ({ key, content, style }) => {
    INSTANCE.open({ key, content, style });
}
export const SPopupClose = (key) => {
    INSTANCE.close(key);
}
export default class SPopup extends Component {

    static alert(title) {
        INSTANCE.open({
            key: 'alert',
            content: <Alert title={title} />,
            style: {}
        });
    }
    static confirm(title, callback) {
        INSTANCE.open({
            key: 'confirm',
            content: <Confirm title={title} onPress={callback} />,
            style: {}
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {

            },
            style: {}
        };
        INSTANCE = this;
    }
    componentDidMount() {
        INSTANCE = this;
    }
    open({ key, content, style }) {
        // console.log(key);
        this.state.data[key] = content;
        if (style) {
            this.state.style[key] = style;
        } else {
            this.state.style[key] = {};
        }
        this.setState({ ...this.state });
    }
    close(key) {
        delete this.state.data[key];
        this.setState({ ...this.state });
    }

    getPopups() {
        return Object.keys(this.state.data).map((key) => {
            var obj = this.state.data[key];
            var style = this.state.style[key];
            return <SPopupComponent
                style={style}
                close={() => { this.close(key) }}
            >
                <TouchableWithoutFeedback>
                    {obj}
                </TouchableWithoutFeedback>
            </SPopupComponent>
        })
    }
    render() {
        INSTANCE = this;
        return (
            <>
                {this.getPopups()}
            </>
        );
    }
}
