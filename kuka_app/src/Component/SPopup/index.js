import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
type propsType = {

}
export default class SPopup extends Component<propsType> {
    constructor(props) {
        super(props);
        this.state = {
            obj: false,
        };
    }

    setObj(obj) {
        this.setState({ obj: obj });
    }
    render() {
        if (!this.state.obj) {
            return <View />
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setObj(false)
            }}>
                <View style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backgroundColor: "#ccccccdd",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableWithoutFeedback onPress={(evt) => {

                    }}>
                        <View style={{
                            width: "90%",
                            // height: "90%",
                            maxWidth: 500,
                            minHeight: 200,
                            maxHeight: 500,
                            backgroundColor: "#00000088",
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#ffffff22",
                            ...this.props.style
                        }}>
                            {this.props.children}

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
