import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SSCrollView from '../../Component/SScrollView';
import { SCalendar, SScrollView2, SView } from '../../SComponent';
import Svg from '../../Svg';

class CalendarioPage extends Component {
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
        <BarraSuperior navigation={this.props.navigation} title={"Calendario"} goBack={() => { this.props.navigation.goBack() }} />

        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SScrollView2 disableHorizontal>
            <SView props={{
              col: "xs-12",
              variant: "center",
            }}>
              <SView props={{
                col: "xs-12 md-6 xl-4",
              }}>
                <SCalendar
                  onChange={(evt)=>{
                      alert(evt.toString())
                  }}
                />
              </SView>
            </SView>
          </SScrollView2>
        </View>

      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CalendarioPage);
