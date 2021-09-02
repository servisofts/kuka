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
import FotoPerfilUsuario from '../../Component/FotoPerfilUsuario';
import SSCrollView from '../../Component/SScrollView';
import { SInput, SPopupOpen, SText } from '../../SComponent'
import { SView } from '../../SComponent/SView';
// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class ClienteRegistroPage extends Component {
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
    this.inputsRef = {};
    this.cabecera = "registro_administrador"
    var key = this.props.navigation.getParam("key", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.usuarioReducer.data[this.cabecera][key];
      this.data.key = key;
      if (!this.data) {
        alert("NO HAY DATA");
      }
    }
  }
  componentDidMount() { // B

  }
  getInput(key, type, required, size) {
    return <SInput
      ref={(ref) => { this.inputsRef[key] = ref }}
      // placeholder={key}
      defaultValue={this.data[key]}
      props={{
        isRequired: required,
        type: type,
        col: size,
        customStyle: "calistenia",
        label: key,
      }} />
  }
  onPress() {
    if (this.props.state.usuarioReducer.estado == "cargando") {
      return;
    }
    var isValid = true;
    var objectResult = {};
    Object.keys(this.inputsRef).map((key) => {
      var input: SInput = this.inputsRef[key];
      if (!input.verify()) isValid = false;
      objectResult[key] = input.getValue();
    })
    if (!isValid) {
      this.setState({ ...this.state });
      return;
    }
    var object = {
      component: "usuario",
      type: !this.data.key ? "registro" : "editar",
      version: "2.0",
      estado: "cargando",
      cabecera: "registro_administrador",
      key_usuario: !this.data.key ? "" : this.props.state.usuarioReducer.usuarioLog.key,
      key_rol: "d16d800e-5b8d-48ae-8fcb-99392abdf61f",
      data: {
        ...this.data,
        ...objectResult,
      },
    }
    // alert(JSON.stringify(object));
    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
  }

  render() {

    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      var error = this.props.state.usuarioReducer.error;
      SPopupOpen({
        key: "errorRegistro",
        content: (
          <SView props={{
            col: "xs-12 md-8 xl-6",
            variant: "center",
            customStyle: "primary",
          }} style={{ height: 200, borderRadius: 8, }}>
            <BackgroundImage />
            <SView style={{
              width: "100%",
              height: "100%",
            }} center>
              <SText style={{ fontSize: 16, }}>El usuario ya existe</SText>
              <SText style={{ fontSize: 12, }}>{`Nombre: ${error["Nombres"] + " " + error["Apellidos"]}`}</SText>
              <SText style={{ fontSize: 12, }}>{`Correo: ${error["Correo"]}`}</SText>
              <SText style={{ fontSize: 12, }}>{`Fecha nacimiento: ${error["Fecha nacimiento"]}`}</SText>
              <SText style={{ fontSize: 12, }}>{`CI: ${error["CI"]}`}</SText>
              <SText style={{ fontSize: 12, }}>{`Telefono: ${error["Telefono"]}`}</SText>
            </SView>
          </SView>
        )
      })
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
      this.props.state.usuarioReducer.estado = "";
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

        <BarraSuperior duration={500} title={!this.data.key ? "registro" : "editar"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} {...this.props} />

        <View style={{
          flex: 1,
        }}>
          <SSCrollView style={{
            width: "100%",
            // height: "100%",
            maxWidth: "100%",
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
              }}>{!this.data.key ? "Registra " : "Edita "}tu usuario cliente.</Text>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>

                {!this.data.key ? <View /> : <View style={{
                  width: 150,
                  height: 150,
                }}><FotoPerfilUsuario usuario={this.data} />
                </View>}

                <SView props={{
                  col: "xs-12",
                  direction: "row"
                }} style={{
                  justifyContent: "space-evenly"
                }}>
                  {this.getInput("Nombres", SInput.TYPE(""), true, "xs-12 md-10")}
                  {this.getInput("Apellidos", SInput.TYPE(""), true, "xs-12 md-10")}
                  {this.getInput("CI", SInput.TYPE(""), true, "xs-12 md-4.5")}
                  {this.getInput("Fecha nacimiento", SInput.TYPE("fecha"), true, "xs-12 md-4.5")}
                  {this.getInput("Correo", SInput.TYPE("email"), true, "xs-12 md-10")}
                  {this.getInput("Telefono", SInput.TYPE("phone"), true, "xs-12 md-10")}
                  {this.getInput("Password", SInput.TYPE("password"), true, "xs-12 md-10")}
                </SView>
                <ActionButtom label={this.props.state.usuarioReducer.estado == "cargando" ? "cargando" : this.TextButom}
                  onPress={() => {
                    this.onPress()
                  }}
                />
              </View>

            </View>
          </SSCrollView>
        </View>
      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClienteRegistroPage);