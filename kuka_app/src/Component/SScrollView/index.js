import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';


type TProps = {
    contentContainerStyle: Object,

}
export default class SSCrollView extends Component<TProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static defaultProps = {
        contentContainerStyle: {
            justifyContent: 'center',
            alignItems: "center",
        }
    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
            }}>
                <ScrollView style={{
                    width: "100%",
                    height: "100%",

                }}
                    contentContainerStyle={this.props.contentContainerStyle}
                    {...this.props}
                    disableScrollViewPanResponder={true}
                >
                    <View style={{
                        width: "100%",
                        maxWidth: 600,
                        alignItems: "center",
                        ...this.props.style
                    }}>
                        {this.props.children}

                    </View>
                </ScrollView>
            </View>
        );
    }
}
