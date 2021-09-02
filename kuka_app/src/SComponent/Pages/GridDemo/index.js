
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText, SContainer } from '../../../SComponent';
import { SButtom } from '../../SButtom';

export default class GridDemo extends Component {
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
                        }}>SGRID</SText>
                    </SContainer>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 2 }
                    }}>

                    </SContainer>
                </SContainer>

                <SContainer options={{
                    type: "secondary",
                    variant: "page",
                }}>
                    <SContainer options={{
                        type: "secondary",
                        variant: "row",
                        col: { xs: 11.5 }
                    }} style={{
                    }}>
                        {[
                            { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 }, { xs: 1 },
                            { xs: 2 }, { xs: 2 }, { xs: 2 }, { xs: 2 }, { xs: 2 }, { xs: 2 },
                            { xs: 3 }, { xs: 3 }, { xs: 3 }, { xs: 3 },
                            { xs: 4 }, { xs: 4 }, { xs: 4 },
                            { xs: 6 }, { xs: 6 },
                            { xs: 12 },
                            { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 }, { sm: 1 },
                            { sm: 2 }, { sm: 2 }, { sm: 2 }, { sm: 2 }, { sm: 2 }, { sm: 2 },
                            { sm: 3 }, { sm: 3 }, { sm: 3 }, { sm: 3 },
                            { sm: 4 }, { sm: 4 }, { sm: 4 },
                            { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 }, { md: 1 },
                            { md: 2 }, { md: 2 }, { md: 2 }, { md: 2 }, { md: 2 }, { md: 2 },
                            { md: 3 }, { md: 3 }, { md: 3 }, { md: 3 },
                            { md: 4 }, { md: 4 }, { md: 4 },
                            { xs: 12, sm: 6, md: 4, lg: 2, xl: 1 },
                            { xs: 12, sm: 6, md: 4, lg: 2, xl: 1 },
                            { xs: 12, sm: 6, md: 4, lg: 2, xl: 1 },
                            { xs: 12, sm: 6, md: 4, lg: 2, xl: 1 },
                            { xs: 12, sm: 6, md: 4, lg: 2, xl: 1 },
                            { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 }, { md: 12 },

                        ].map((obj) => {
                            return <SContainer options={{
                                type: "outline",
                                variant: "col-square",
                                col: obj
                            }} style={{
                                height: 100,
                            }} >
                                <SText options={{
                                    type: "primary"
                                }}>{JSON.stringify(obj)}</SText>
                            </SContainer>
                        })}
                    </SContainer>
                </SContainer>
            </SContainer>
        );
    }
}
