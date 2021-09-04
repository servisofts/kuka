import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SPopupClose } from '..'
import { SInput } from '../..'
import Actions from '../../../Actions'
import BackgroundImage from '../../../Component/BackgroundImage'
import { SButtom } from '../../SButtom'
import { SText } from '../../SText'
import { SView } from '../../SView'

export default class Input extends Component {
    constructor(props) {
        super(props)
    }
    componentWillUnmount() {
        if (this.props.onCancel) this.props.onCancel()
    }
    render() {
        return (
            <SView props={{
                col: "xs-11 md-8 xl-6",
                variant: "center"
            }} style={{ height: 200, borderRadius: 8 }} withoutFeedback>
                <BackgroundImage />
                <SView col={"xs-10"} props={{
                    variant: "center"
                }}>
                    <SText style={{ fontSize: 16, color: "#FFF", textAlign: "center" }}>{this.props.title}</SText>
                </SView>
                <SView col={"xs-12"} style={{
                    height: 16
                }}></SView>
                <SView col={"xs-12"} center height={40}>
                    <SInput
                        ref={(ref) => { this.input = ref }}
                        placeholder={"Escriba aqui..."}
                        {...this.props.inputProps ? this.props.inputProps : {}}
                        props={{
                            col: "xs-10",
                            customStyle: "outline",
                            ...(this.props.inputProps ? this.props.inputProps.props : {})
                        }} />
                </SView>
                <SView col={"xs-12"} style={{
                    height: 16
                }}></SView>
                <SView col={"xs-12"} row center style={{
                    // height: 60,
                }}>
                    <SView col={"xs-6"} center>
                        <SButtom
                            props={{
                                type: "danger"
                            }}
                            onPress={() => {
                                if (this.props.onCancel) this.props.onCancel()
                                SPopupClose("confirm")
                            }}>Cancelar</SButtom>
                    </SView>
                    <SView col={"xs-6"} center>
                        <SButtom props={{
                            type: "outline"
                        }}
                            onPress={() => {
                                var value = this.input.getValue()
                                if (this.props.onPress) this.props.onPress(value)
                                SPopupClose("confirm")
                            }}>Confirmar</SButtom>
                    </SView>
                </SView>
            </SView>
        )
    }
}
