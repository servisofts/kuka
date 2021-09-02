import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
import SSCrollView from '../../Component/SScrollView';
// import CargoUsuario from './CargoUsuario';
export default class RRHHPage extends Component {
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
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                // justifyContent: "center",
                alignItems: "center"
                // backgroundColor:"#000",
            }}>
                <BackgroundImage source={require("../../img/background.png")} />
                <BarraSuperior navigation={this.props.navigation} title={"Recursos húmanos"} goBack={() => {
                    this.props.navigation.goBack();
                }} />

                <View style={{
                    flex: 1,
                    width: "100%",
                }}>
                    <SSCrollView>
                        <View style={{
                            width: "100%",
                            height: 300,
                        }}>
                            {/* <CargoUsuario {...this.props} /> */}
                        </View>
                    </SSCrollView>
                </View>
            </View>
        );
    }
}
