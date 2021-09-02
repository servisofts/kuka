import React, { Component, ViewStyle } from 'react';
import { View, Text } from 'react-native';
import { SButtom, typeConfig } from '../SButtom';
import { SInput, TypeInputProps, typeConfigInpust } from '../SInput';
import { SView, SViewPropsType } from '../SView';
import { Col, TypeCol } from '../SView/cols';



interface InputsTp {
    [index: string]: typeConfigInpust;
}
export type SFromProps = {
    style: ViewStyle,
    props: SViewPropsType,
    inputProps: TypeInputProps,
    inputs: InputsTp,
    onSubmit: Function,
    onSubmitName: String,
    onSubmitProps: typeConfig,
}
export default class SForm extends Component<SFromProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._ref = {};
    }
    getButtom() {
        if (!this.props.onSubmit) return <View />
        if (!this.props.onSubmitName) return <View />
        return <SButtom
            props={{
                type: "danger",
                col: "xs-12 md-6",
                ...this.props.onSubmitProps,
                // customStyle: "primary",
            }} onPress={() => {
                var data = {};
                var isValid = true;
                Object.keys(this._ref).map((key) => {
                    var input: SInput = this._ref[key];
                    if (!input.verify()) {
                        isValid = false;
                    }
                    data[key] = input.getValue();
                })
                if (isValid) {
                    this.props.onSubmit(data);
                }
            }}>
            {this.props.onSubmitName}
        </SButtom>
    }
    getInputs() {
        if (!this.props.inputs) {
            return <View />
        }

        return Object.keys(this.props.inputs).map((key) => {
            var inputProps = this.props.inputs[key];
            return <SInput
                ref={(ref) => { this._ref[key] = ref }}
                placeholder={inputProps.label}
                {...inputProps}
                props={{
                    ...this.props.inputProps,
                    ...inputProps
                }}
                //defaultValue={(inputProps.defaultValue) ? inputProps.defaultValue : ""}
                defaultValue={inputProps.defaultValue}
            />
        })
    }

    render() {
        return (
            <SView props={this.props.props}>
                {this.getInputs()}
                <SView style={{
                    height: 14,
                }}></SView>
                {this.getButtom()}
            </SView>
        );
    }
}
SForm.defaultProps = {
    props: {

    },
    onSubmitName: "Registro"
}