import React, { Component } from 'react';
import { TextInput } from 'react-native';
import IntlPhoneInput from './NumberPhone/IntlPhoneInput';

import CheckImput from './CheckImput';

class STextImput extends Component {
    propiedades;
    value;
    propsTemp = {};
    constructor(_props) {
        super(_props);
        this.state = {
            value: ""
        };
        this.propiedades = _props;
        this.value = "";
        if (_props.defaultValue) {
            this.value = _props.defaultValue;
        }
        if (_props.value) {
            this.value = _props.value;
        }
        // this.setState({ value: this.value });
    }

    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
        this.setState({ value: value });
        console.log("ASdasdasds")
    }
    setError() {
        if (!this.propsTemp.style) {
            this.propsTemp.style = this.propiedades.style;
        }
        this.propiedades.style = {
            ...this.propiedades.style,
            borderColor: "#ff0000"
        }
        return false;
    }
    verify() {
        if (this.propiedades.isNull) {
            return true;
        }
        if (this.propiedades.type == "Check") {
            return true;
        }
        if (!this.value) {
            if (!this.propsTemp.style) {
                this.propsTemp.style = this.propiedades.style;
            }
            this.propiedades.style = {
                ...this.propiedades.style,
                borderColor: "#BE223A"
            }
            return false;
        }

        if (this.propiedades.type == "Fecha") {

        }
        if (this.propiedades.type == "Email") {
            // try {
            //     var aux = this.value.replace(/\s*$/, "");
            //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            //     if (reg.test(aux) === false) {
            //         // if (!this.propsTemp.style) {
            //         //     this.propsTemp.style = this.propiedades.style;
            //         // }
            //         // this.propiedades.style = {
            //         //     ...this.propiedades.style,
            //         //     borderColor: "#BE223A"
            //         // }
            //         // return false
            //     }
            // } catch (e) {

            // }
        }
        if (this.propsTemp.style) {
            this.propiedades.style = { ...this.propsTemp.style };
            this.propsTemp.style = false;
        }
        return this.value;
    }
    focus() {
        this._ref.focus();
    }
    clear() {
        this._ref.clear();
        this.value = "";
        this.setState({ value: "" });
    }
    getComponent() {
        var INSTANCE = this;
        if (this.propiedades.type == "Check") {
            return <CheckImput {...this.propiedades} onChange={(val) => {
                INSTANCE.value = val;
            }} />
        }
        if (this.propiedades.type == "Phone") {
            return <IntlPhoneInput
                containerStyle={{
                    ...this.propiedades.style
                }}
                defaultValue={this.value}
                phoneInputStyle={{
                    flex: 1,
                    // width:"100%",
                    color: "#fff",
                    height: "100%",
                    padding: 0,
                    outline: "none"
                }}
                inputProps={
                    { placeholderTextColor: "#00a5ce00" }
                }
                defaultCountry="BO"
                lang="en"
                placeholderTextColor={'#999'}
                // onChangeText={onChangeText}
                onChangeText={(text) => {
                    INSTANCE.value = text.dialCode + " " + text.phoneNumber;
                }}
            />
        }
        var INSTANCE = this;
        // console.log(this._props)
        return (<TextInput
            ref={(ref) => this._ref = ref}
            placeholderTextColor={'#999'}
            onChangeText={(text) => {
                this.setState({ value: text })
                this.value = text;
                this.value = this.value.trim();
                if (this.propiedades.type == "Monto") {
                    const clean = text.replace(/[^0-9]/g, '');
                    this.value = clean
                    // this.verify();
                    // return true;
                    // INSTANCE._ref.setNaviteProps({ test: clean })
                }
                if (this.propiedades.type == "Email") {
                    this.verify();
                }
                // this.setState({
                //     value: this.value
                // })
            }}
            {...this.propiedades}
            placeholder={(!this._props ? this.propiedades.placeholder : this._props.placeholder)}
            defaultValue={this.value + ""}
            style={{ ...this.propiedades.style, outline: "none" }}
        />)
    }
    render() {
        return this.getComponent();
    }
}
export default STextImput;