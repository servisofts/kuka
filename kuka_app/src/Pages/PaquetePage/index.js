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
// import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import ListaPaquetes from './ListaPaquetes';
import FloatButtom from '../../Component/FloatButtom';

class PaquetePage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    // SSNavigation.setProps(props);

  }

  render() {
    this.type = this.props.navigation.getParam("type");
    this.onResult = this.props.navigation.getParam("onResult");
    this.title = "Paquetes";
    if (this.type == "select") {
      // this.key_usuario = this.props.navigation.getParam("key_usuario");
      this.title = "Seleccionar un paquete.";
    }

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
        <BarraSuperior navigation={this.props.navigation} title={this.title} goBack={() => { this.props.navigation.goBack() }} />

        <View style={{
          flex: 1,
          width: "100%",
        }}>

          <ListaPaquetes {...this.props} onPress={(key) => {
            if (this.type == "select") {
              if (this.onResult) {
                this.props.navigation.goBack();
                this.onResult(key);
              }
              return;
            }
            this.props.navigation.navigate("PaqueteRegistroPage", {
              key: key,
            });
          }} />
          <FloatButtom label={"+"} onPress={() => {
            this.props.navigation.navigate("PaqueteRegistroPage");
          }} />
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
export default connect(initStates)(PaquetePage);
