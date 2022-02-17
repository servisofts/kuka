import React, { Component } from 'react'
import { Text, View } from 'react-native'
import BackgroundImage from '../../../Component/BackgroundImage'
import { SText } from '../../SText'
import { SView } from '../../SView'

export default class Alert extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <SView props={{
                col: "xs-11 md-8 xl-6",
                variant: "center"
            }} style={{ height: 200, borderRadius: 8 }}>
                <BackgroundImage />
                <SView col={"xs-12"} props={{
                    variant: "center"
                }}>
                    <SText style={{ fontSize: 20, fontWeight: "bold", color: "#FFF", textAlign: "center" }}>{this.props.title}</SText>
                </SView>
            </SView>
        )
    }
}
