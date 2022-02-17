import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Animated } from 'react-native';
import { SButtom, SText, STheme, SThread } from '../../SComponent';
import SScrollView from '../SScrollView';
import { SView } from '../SView';
import SHeader from './SHeader';
import SData from './SData'
type typeHeader = {
    label: String,
    key: String,
    width: Number
}
type SType = {
    header: [typeHeader],
    data: [Object],
}

export default class STable extends Component<SType> {
    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header,
            reload: false,
            headerLoad: false,
        };
        this.headref = {}
    }

    setHeader(header, reload) {
        this.setState({ header: header, reload: reload, headerLoad: !reload });
    }
    getHeader() {
        // if (this.state.reload) {
        //     this.setState({ reload: false })
        //     return <View />
        // }
        return <SHeader
            ref={(ref) => {
                this.state.href = ref;
            }}
            header={this.state.header}
            setHeader={(data, bol) => this.setHeader(data, bol)}
            onLoad={(key, ref) => {
                this.headref[key] = ref;
                console.log("onLoad");

            }}
            getScroll={() => {
                return this.scroll;
            }} />
    }
    getRef() {
        return this.state.href;
    }
    getData() {
        if (!this.state.href) {
            return <SText>No hay ref</SText>
        }
        if (!this.props.data) {
            return <SText>No hay data</SText>
        }
        return <SData
            ref={(ref) => { this.refData = ref }}
            data={this.props.data}
            header={this.state.header}
            getAnimates={(i) => {
                return this.state.href.getRef(i).getAnimates()
            }} />
    }
    getContent() {

        return <SView style={{
        }}>
            {this.getData()}
        </SView>
    }
    render() {

        return (
            <SView props={{
                col: "xs-12",
            }} style={{
                height: "100%"
            }}>
                <SScrollView ref={(ref) => { this.scroll = ref; }}>
                    {this.getHeader()}
                    {this.getContent()}
                </SScrollView>
            </SView>
        );
    }
}
