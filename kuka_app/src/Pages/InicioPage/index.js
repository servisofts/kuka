import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import SCarrusel from '../../Component/SCarrusel';
import SImage from '../../Component/SImage';
import { SButtom, SScrollView2, SView } from '../../SComponent';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import Graphic1 from './Graphic1';
import Graphic2 from './Graphic2';
import MenuModulos from './MenuModulos';


class InicioPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#A83293",
      }}>
        <BackgroundImage  />
        <BarraSuperior navigation={this.props.navigation} title={"Inicio"} />

        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SScrollView2 disableHorizontal>
            <View style={{
              width: "100%",
              // height: 170,
              // minHeight: 200,
              height: 24,
              // overflow: "hidden",
            }}>

            </View>
            <MenuModulos navigation={this.props.navigation} {...this.props} />
            {/* <SView col={"xs-12"} style={{
              height: 50,
            }} center>
              <SButtom props={{
                type: "danger",
              }} onPress={() => {
                this.props.navigation.navigate("DesingPage")
              }}>Desing</SButtom>
            </SView> */}

          </SScrollView2>
        </View>
        {/* <NaviDrawerButtom open={() => {
          this.state.naviDrawer.open();
        }} /> */}
      </View>

      {/* <NaviDrawer ref={(ref) => {
        this.state.naviDrawer = ref;
      }} navigation={this.props.navigation} /> */}
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(InicioPage);
