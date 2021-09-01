import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import { SView } from '../../SView';

export default class SPopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getButonClose() {
        return <TouchableOpacity style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => {
            this.close(this.props.key);
        }}>
            {/* <Svg resource={require("../img/cerrar.svg")} style={{
                    width: 15,
                    height: 15,
                    color: "#000",
                    //top: -10
                }} /> */}


        </TouchableOpacity>
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.close();
            }}><View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "#dddddd66",
                justifyContent: "center",
                alignItems: "center",
                // ...this.props.style
            }}>
                    {/* <View style={{
                        position:"absolute",
                        width:"100%",
                        height:"100%",
                    }}>

                    </View> */}
                    <View style={{
                        width: "100%",
                        // height:"100%",
                        maxWidth: "94%",
                        maxHeight: "90%",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow:"hidden",
                    }}>
                        <TouchableWithoutFeedback
                            accessibilityViewIsModal
                            onPress={() => {
                            }}>
                            {this.props.children}
                        </TouchableWithoutFeedback>
                        {this.getButonClose()}
                    </View>
                </View>
            </TouchableWithoutFeedback >
        );
    }
}
