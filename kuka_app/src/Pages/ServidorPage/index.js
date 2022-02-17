import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SImage from '../../Component/SImage';
import Svg from '../../Svg';

class ServidorPage extends Component {
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
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center"
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Servidor"} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <ScrollView style={{
          width: "100%",
          flex: 1,
        }}>
          <View style={{
            width: "100%",
            paddingTop: 8,
            // justifyContent: "center",
            alignItems: "center"
          }}>


            <View style={{
              flex: 1,
              width: "90%",
              maxWidth: 500,
              paddingBottom: 40,
              // justifyContent: "center",
              alignItems: "center"
            }}>
              <Svg name={"Server"} style={{
                width: "80%",
                height: 150,
              }} />
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                fontSize: 18,
                fontWeight: "bold"
              }}>
                Servidor
                </Text>

              <View style={{
                marginTop:16,
                width: "100%",
                height: 100,
                // backgroundColor: "#fff",
                borderRadius:20,
                backgroundColor:"#ffffffdd"
              }}>
                <SImage source={require("../../img/codigo/s1.png")} style={{ resizeMode: "center", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", }} />
              </View>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>Un servidor es una computadora funcionando 24/7 conectada a internet en cualquier parte del mundo con una ip publica única en este caso 162.253.126.154</Text>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>Estado de pago del hosting.</Text>

              <View style={{
                width: "100%",
                height: 200,
                // backgroundColor: "#fff"
              }}>
                <SImage source={require("../../img/codigo/s2.png")} style={{ resizeMode: "center", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", }} />
              </View>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>Estado actual de servidor</Text>
              <View style={{
                width: "100%",
                height: 600,
                // backgroundColor: "#fff"
              }}>
                <SImage source={require("../../img/codigo/s3.png")} style={{ resizeMode: "contain", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", }} />
              </View>
            </View>

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
export default connect(initStates)(ServidorPage);