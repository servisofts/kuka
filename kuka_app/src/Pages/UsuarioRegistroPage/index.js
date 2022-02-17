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
import RolDeUsuario from './RolDeUsuario';
import TipoUsuario from './TipoUsuario';
import FotoPerfilUsuario from '../../Component/FotoPerfilUsuario';
import SSCrollView from '../../Component/SScrollView';
import DeleteBtn from '../../Component/DeleteBtn';
import { SSRolesPermisosValidate } from '../../SSRolesPermisos';
// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class UsuarioRegistroPage extends Component {
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
      backgroundColor: "#ffffff22",
      borderWidth: 1,
      borderColor: "#444",
      borderRadius: 8,
    }
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
    console.log(this.data)
    this.imputs = {
      Nombres: new STextImput({
        placeholder: "Nombres",
        defaultValue: this.data["Nombres"],
        // autoCapitalize: "none",

        style: styleImput
      }),

      Apellidos: new STextImput({
        placeholder: "Apellidos",
        type: "correo",

        defaultValue: this.data["Apellidos"],
        // autoCapitalize: "none",
        style: styleImput
      }),
      CI: new STextImput({
        placeholder: "Numero de documento de identidad",
        defaultValue: this.data["CI"],
        autoCapitalize: "none",
        style: styleImput
      }),
      "Fecha nacimiento": new STextImput({
        placeholder: "Fecha nacimiento",
        defaultValue: this.data["Fecha nacimiento"],
        type: "Fecha",
        autoCapitalize: "none",
        style: styleImput
      }),
      Correo: new STextImput({
        placeholder: "Correo",
        defaultValue: this.data["Correo"],
        // autoCapitalize: "none",
        type: "Email",
        autoCapitalize: "none",
        autoCompleteType: "email",
        style: styleImput
      }),
      Telefono: new STextImput({
        placeholder: "Telefono",
        defaultValue: this.data["Telefono"],
        // autoCapitalize: "none",
        type: "Phone",
        style: styleImput
      }),
      Password: new STextImput({
        placeholder: "Password",
        secureTextEntry: true,
        defaultValue: this.data["Password"],
        // autoCapitalize: "none",
        style: styleImput
      }),
    }
  }
  componentDidMount() { // B

  }
  getEditar() {
    if (!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: !this.data.key ? "crear" : "editar" })) {
      return <View />
    }
    return <ActionButtom label={this.props.state.usuarioReducer.estado == "cargando" ? "cargando" : this.TextButom}
      onPress={() => {
        if (this.props.state.usuarioReducer.estado == "cargando") {
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
          component: "usuario",
          type: !this.data.key ? "registro" : "editar",
          version: "2.0",
          estado: "cargando",
          cabecera: "registro_administrador",
          key_usuario: !this.data.key ? "" : this.props.state.usuarioReducer.usuarioLog.key,
          data: {
            ...this.data,
            ...objectResult,
          },
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      }}
    />
  }
  getEliminar() {
    if (!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "eliminar" })) {
      return <View />
    }
    if (!this.data.key) {
      return <View />
    }
    return <DeleteBtn
      style={{
        width: 100,
        height: 40,
        margin: 8,
      }}
      onDelete={() => {
        var object = {
          component: "usuario",
          type: "editar",
          version: "2.0",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
          estado: "cargando",
          cabecera: "registro_administrador",
          data: {
            ...this.data,
            estado: 0,
          },
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      }} />
  }
  render() {

    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      // alert(this.props.state.usuarioReducer.errorRegistro)
      switch (this.props.state.usuarioReducer.errorRegistro) {
        case "existe_Correo":
          this.imputs.Correo.setError()
          break;
        case "existe_Telefono":
          this.imputs.Telefono.setError()
          break;

      }
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }

    // if (!this.props.state.cabeceraDatoReducer.data["registro_administrador"]) {
    //   if (this.props.state.cabeceraDatoReducer.estado == "cargando") {
    //     return <View />
    //   }
    //   if (this.props.state.cabeceraDatoReducer.estado == "error") {
    //     return <View />
    //   }
    //   this.props.state.socketReducer.session[AppParams.socket.name].send({
    //     component: "cabeceraDato",
    //     type: "getDatoCabecera",
    //     estado: "cargando",
    //     cabecera: "registro_administrador"
    //   }, true);
    //   return <View />
    // }


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
              }}>{!this.data.key ? "Registra " : "Edita "}tu usuario.</Text>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>

                {!this.data.key ? <View /> : <View style={{
                  width: 150,
                  height: 150,
                  alignItems: "center",
                }}><FotoPerfilUsuario usuario={this.data} disable={!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "editar" })} />
                </View>}


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
                {this.getEliminar()}
                {this.getEditar()}



              </View>
            </View>
            <RolDeUsuario data={this.data} />
            {/* <TipoUsuario data={this.data} /> */}
          </SSCrollView>
        </View>

      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioRegistroPage);