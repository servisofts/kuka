import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import SCarrusel from '../../Component/SCarrusel';
import SImage from '../../Component/SImage';
import SSCrollView from '../../Component/SScrollView';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import MenuModulos from './MenuModulos';


class ServiciosPage extends Component {
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
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Servicios"} goBack={()=>{this.props.navigation.goBack()}} />

        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView>
            <View style={{
              width: "100%",
              // height: 170,
              // minHeight: 200,
              height: 50,
              // overflow: "hidden",
            }}>

            </View>
            <MenuModulos navigation={this.props.navigation} {...this.props} />
          </SSCrollView>
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
export default connect(initStates)(ServiciosPage);
