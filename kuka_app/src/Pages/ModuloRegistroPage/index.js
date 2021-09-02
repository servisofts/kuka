import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../Component/ActionButtom';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import Svg from '../../Svg';

// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class ModuloRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const key = navigation.getParam('key', false);
    return {
      headerShown: false,
      title: (!key ? "Crear usuario" : "Editar usuario")
    }
  }
  constructor(props) {
    super(props);
    this.state = {};
    var styleImput = {
      width: "80%",
      padding: 8,
      height: 50,
      margin: 8,
      color: "#fff",
      backgroundColor: "#66000022",
      borderWidth: 1,
      borderColor: "#ffffff11",
      borderRadius: 8,
    }

      this.imputs = {
        descripcion: new STextImput({
          placeholder: "Descripcion",
          // defaultValue: this.data["Nombres"].dato,
          // autoCapitalize: "none",
          style: styleImput
        }),
        observacion: new STextImput({
          placeholder: "Observacion",
          // defaultValue: this.data["Nombres"].dato,
          // autoCapitalize: "none",
          multiline: true,
          style: { ...styleImput, height: 100 }
        }),

      }
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.moduloReducer.estado == "exito" && this.props.state.moduloReducer.type == "registro") {
      this.props.state.moduloReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.moduloReducer.estado == "exito" && this.props.state.moduloReducer.type == "editar") {
      this.props.state.moduloReducer.estado = "";
      this.props.navigation.goBack();
    }

    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
      }}>
        <BackgroundImage />

        <BarraSuperior duration={500} title={"Solicitar modulo"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} {...this.props} />

        <ScrollView style={{
          width: "100%",
          height: "100%"

        }} contentContainerStyle={{
          alignItems: "center",
          flex: 1,
          paddingTop: 20,
        }}>

          <View style={{
            width: "90%",
            maxWidth: 600,
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
            <Text style={{
              color: "#fff",
              fontSize: 16,
            }}>Solicitud de modulo</Text>
            <View style={{
              width: "100%",
              maxWidth: 600,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
              {Object.keys(this.imputs).map((key) => {
                return this.imputs[key].getComponent();
              })}


            </View>
            <View style={{
              flex: 1,
              width: "90%",
              maxWidth: 600,
              justifyContent: 'center',
              flexDirection: "row",
            }}>
              <ActionButtom label={this.props.state.moduloReducer.estado == "cargando" ? "cargando" : "Crear"}
                onPress={() => {
                  if (this.props.state.moduloReducer.estado == "cargando") {
                    return;
                  }
                  var isValid = true;
                  var objectResult = {};

                  Object.keys(this.imputs).map((key) => {
                    if (this.imputs[key].verify() == false) isValid = false;
                    objectResult[key] = this.imputs[key].getValue();
                  })

                  if (!isValid) {
                    this.setState({ ...this.state });
                    return;
                  }
                  var object = {
                    component: "modulo",
                    type: "registro",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: objectResult,
                  }
                  // alert(JSON.stringify(object));
                  this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                }}
              />
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ModuloRegistroPage);