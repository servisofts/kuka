
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText, SContainer } from '../../../SComponent';
import { SButtom } from '../../SButtom';
import { SInput } from '../../SInput';
import SIFechaPicker from '../../SInput/SInputTypes';
import { SPopupOpen } from '../../SPopup';
import { SView } from '../../SView';

export default class InputDemo extends Component {
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
            <SContainer >
                <SContainer options={{
                    type: "primary",
                    variant: "row",
                    // col: { xs: 11 },
                }} style={{
                    height: 40,
                }}>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 2 }
                    }}>
                        <SButtom onPress={() => { this.props.navigation.goBack() }}>Back</SButtom>
                    </SContainer>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 8 }
                    }}>
                        <SText options={{
                            variant: "h5",
                        }}>SInput</SText>
                    </SContainer>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 2 }
                    }}>

                    </SContainer>
                </SContainer>

                <SContainer options={{
                    type: "primary",
                    variant: "page",
                }}>
                    <SView props={{
                        type: "secondary",
                        variant: "center",
                        col: { xs: "12", sm: "10", md: "8", lg: "6", xl: "4" }
                    }} style={{
                        height: 100
                    }}>
                        <SInput props={{
                            customStyle: "primary",
                            col: "xs-12",
                        }}
                            placeholder={"default"}
                        />
                        <SInput props={{
                            type: "fecha",
                            customStyle: "secondary",
                            col: {

                            },
                        }}
                        // placeholder={"fecha"}
                        />
                    </SView>
                </SContainer>
            </SContainer>
        );
    }
}
