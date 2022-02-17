import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SPopupOpen } from '../../../SPopup';
import { SView } from '../../../SView';

export default class Opciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView props={{

            }} onPress={() => {
                SPopupOpen({
                    key: "2asda",
                    content: (<SView style={{
                        width: 200,
                        height: 200,
                        backgroundColor: "#fff",
                        borderRadius:8,
                    }}>

                    </SView>)
                })
            }}>
                opciones
            </SView>
        );
    }
}
