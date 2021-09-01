import React, { Component } from 'react';
import { CardStyleInterpolators, createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { NavigationNavigator, createAppContainer } from 'react-navigation';
import * as Pages from '../Pages'
import { connect } from 'react-redux';
import { AsyncStorage, Linking } from 'react-native';
import { STheme } from '../SComponent';

var curNavPage;
export const init = (): NavigationNavigator => {
    const Home = createStackNavigator(
        Pages.getPages(),
        {
            defaultNavigationOptions: ({ navigation }) => ({
                // headerTintColor: "#000",
                // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: STheme().backgroundColor
                }
            }),
        }
    );
    const Container = createAppContainer(Home);
    return Container;
}
export const setProps = (props) => {
    // curNavPage = props.navigation;
}
export const navigate = (page, dataSend) => {
    // curNavPage.navigate(page);
}

const Container = init();
var Percistence = false;

class SSNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleDeepLink = (evt) => {
        console.log(evt);
    }
    componentDidMount() {
        Linking.addEventListener('url', this.handleDeepLink)
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleDeepLink);
    }
    persistNavigationState = async (navState) => {
        try {
            Percistence = navState;
            // this.state.persistence = navState;
            // await AsyncStorage.setItem("persistenceKey", JSON.stringify(navState))
        } catch (err) {
            // handle the error according to your needs
        }
    }
    loadNavigationState = async () => {
        // const jsonString = await AsyncStorage.getItem("persistenceKey")
        // return JSON.parse(jsonString)
        return Percistence;
    }
    render() {

        return (
            <Container
                uriPrefix={"calistenia://"}
                // enableURLHandling={false}
                persistNavigationState={this.persistNavigationState}
                loadNavigationState={this.loadNavigationState}
                onNavigationStateChange={(prev, news, action) => {
                    console.log(prev.routes[0])
                    console.log(action)
                }}
            />
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SSNavigation);
