import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Animated } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import SImage from '../../Component/SImage';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import BarraSuperior from '../../Component/BarraSuperior';
import ProgressCircle from '../../Component/ProgressCircle';


class LobySobreNosotrosPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(100)
        };
        SSNavigation.setProps(props);

    }

    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center"
                // backgroundColor:"#000",
            }}>
                <BarraSuperior title={"Sobre nosotros."} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: "100%",
                        maxWidth: 800,
                        flex: 1,
                    }}>
                    <ProgressCircle
                        width={150}
                        strokeWidth={10}
                        porcentInicio={0}
                        duration={5000}
                        onFinish={()=>{
                            console.log("acabo")
                        }}
                    >
                        <View style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#000"
                        }}>

                        </View>
                    </ProgressCircle>
                </ScrollView>
            </View>
        );
    }
}
export default LobySobreNosotrosPage;