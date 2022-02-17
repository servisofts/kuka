import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import BarraSuperior from '../../Component/BarraSuperior';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';


class LobyPage extends Component {
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
    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BarraSuperior title={"Servisofts"} goBack={()=>{
            this.props.navigation.goBack();
        }} />
        <ScrollView showsVerticalScrollIndicator={false} style={{
          width: "100%",
          maxWidth: 800,
          flex: 1,
        }}>
          <Section1 onPress={() => { this.props.navigation.navigate("LobySobreNosotrosPage") }} />
          <Section2 onPress={() => { this.props.navigation.navigate("LobyTecnologiasPage") }} />
          <Section3 onPress={() => { this.props.navigation.navigate("LobyTecnologiasPage") }} />
          <Section4 onPress={() => { this.props.navigation.navigate("LobyTecnologiasPage") }} />
        </ScrollView>
      </View>
    );
  }
}
export default LobyPage;