import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import LogoAnimado from '../../Component/LogoAnimado';
import SCarrusel from '../../Component/SCarrusel';
import SImage from '../../Component/SImage';
import Svg from '../../Svg';
import MenuPresent from './MenuPresent';

class PresentacionCalisPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  render() {
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center"
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        {/* <BarraSuperior navigation={this.props.navigation} title={"Calistenia Bolivia"} /> */}
        <ScrollView style={{
          width: "100%",
          flex: 1,
        }} disableScrollViewPanResponder={true} >
          <View style={{
            width: "100%",
            // justifyContent: "center",
            alignItems: "center"
          }}>

            <View style={{
              flex: 1,
              width: "90%",
              maxWidth: 300,
              // justifyContent: "center",
              alignItems: "center"
            }}>
              <LogoAnimado />
            </View>
            <View style={{
              width: "100%",
              marginTop: 10,
              height: 260,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <SCarrusel time={5000}>
                {[
                  require("../../img/portadas/14.jpg"),
                  require("../../img/portadas/15.jpg"),
                  require("../../img/portadas/10.jpg"),
                  require("../../img/portadas/3.jpg"),
                  require("../../img/portadas/5.jpg"),
                  require("../../img/portadas/6.jpg"),
                  require("../../img/portadas/7.jpg"),
                  require("../../img/portadas/2.jpg"),
                  require("../../img/portadas/1.jpg"),
                  require("../../img/portadas/4.jpg"),
                  require("../../img/portadas/8.jpg"),
                  require("../../img/portadas/9.jpg"),
                  require("../../img/portadas/11.jpg"),
                  require("../../img/portadas/12.jpg"),
                  require("../../img/portadas/13.jpg"),



                ].map((img) => {
                  return <SImage source={img} style={{ width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", resizeMode: "center" }} />
                })}
              </SCarrusel>
            </View>

            <MenuPresent navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PresentacionCalisPage);