import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../Component/ActionButtom';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import FotoPerfilComponent from '../../Component/FotoPerfilComponent';
import NaviDrawer from '../../Component/NaviDrawer';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import Svg from '../../Svg';
import * as SImageImput from '.././../Component/SImageImput';
import SSCrollView from '../../Component/SScrollView';
class ServicioPerfilPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor(props) {
    super(props);
    this.key = this.props.navigation.getParam("key", false);
    this.state = {};
  }
  componentDidMount() { // B

  }

  getPerfil() {
    this.data = this.props.state.servicioReducer.data[this.key];
    if (!this.data) return <Text>No hay data</Text>
    return <View style={{
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <View style={{
        width: 180,
        height: 180,
      }}>
        <FotoPerfilComponent data={this.data} component={"servicio"} />
      </View>
      <View style={{
        width: "100%",
        alignItems: "center"
      }}>
        <Text style={{
          color: "#fff",
          fontSize: 18,
          textTransform: "capitalize",
          fontWeight: "bold"
        }}>{this.data["descripcion"]}</Text>
        {/* <Text style={{
          color: "#fff",
          fontSize: 16,
          textTransform: "capitalize",
        }}>{JSON.stringify(this.data)}</Text> */}
      </View>
    </View >
  }
  render() {

    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
      }}>
        <BackgroundImage />

        <BarraSuperior duration={500} title={"Perfil del servicio"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} {...this.props} />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView>
            {this.getPerfil()}
          </SSCrollView>
        </View>
      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ServicioPerfilPage);