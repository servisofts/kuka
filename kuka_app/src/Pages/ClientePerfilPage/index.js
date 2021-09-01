import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import FotoPerfilUsuario from '../../Component/FotoPerfilUsuario';
import PaquetesDeUsuario from './PaquetesDeUsuario';
import SSCrollView from '../../Component/SScrollView';

class ClientePerfilPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor(props) {
    super(props);
    this.key = this.props.navigation.getParam("key_usuario", false);
    this.state = {};
  }
  componentDidMount() { // B

  }

  getPerfil() {
    this.data = this.props.state.usuarioReducer.data["registro_administrador"][this.key];
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
        <FotoPerfilUsuario usuario={this.data} />
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
        }}>{this.data["Nombres"] + " " + this.data["Apellidos"]}</Text>
        <Text style={{
          color: "#fff",
          fontSize: 16,
          textTransform: "capitalize",
        }}>{"CI " + this.data["CI"]}</Text>
        {/* <Text style={{
          color: "#fff",
          fontSize: 16,
          textTransform: "capitalize",
        }}>{"CI " + this.data["CI"]}</Text> */}
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

        <BarraSuperior duration={500} title={"Perfil de cliente"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} {...this.props} />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView>
            {this.getPerfil()}
            <PaquetesDeUsuario key_usuario={this.key} navigation={this.props.navigation}/>
          </SSCrollView>
        </View>
      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientePerfilPage);