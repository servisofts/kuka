import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import Page from '../../Component/Page';

class DesingPage extends Component {
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
            <Page navigation={this.props.navigation}
                title={"Desing"}
            >
                {/* <BackgroundImage debug/> */}
            </Page>
        );
    }
}


export default {
    DesingPage
}
