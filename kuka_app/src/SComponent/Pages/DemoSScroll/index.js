import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SScrollView2, SBackground } from '../../../SComponent';

class DemoSScroll extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View //PAGINA
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <View style={{
                    width: "90%",
                    height: "90%",
                }}>
                    <SScrollView2>
                        <View style={{
                            width: 2000,
                            height: 2000,
                            backgroundColor: "#666"
                        }}>
                            <SBackground />
                        </View>
                    </SScrollView2>
                </View>
            </View>
        );
    }
}
export default DemoSScroll;