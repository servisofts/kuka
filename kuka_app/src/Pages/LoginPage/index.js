import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import LogoAnimado from '../../Component/LogoAnimado';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import Svg from '../../Svg';
var _ref = {};
class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {};
    var style = {
      width: "80%",
      padding: 8,
      height: 50,
      color: "#fff",
      margin: 8,
      borderWidth: 1,
      backgroundColor: "#ffffff22",
      borderColor: "#444",
      borderRadius: 8,
    }
    this.ImputUsuario = new STextImput({
      placeholder: "Correo",
      autoCapitalize: "none",
      style: style,
      autoFocus: true,
      onSubmitEditing: () => {
        this.ImputPassword.focus();
      },
      onKeyPress: (evt) => {
        if (evt.key === "Enter") {
          this.ImputPassword.focus();
        }
      }
    })
    this.ImputPassword = new STextImput({
      placeholder: "Password",
      secureTextEntry: true,
      style: style,
      onSubmitEditing: () => {
        this.send()

      },
      onKeyPress: (evt) => {
        if (evt.key === "Enter") {
          this.send()
        }
      }
    });
  }
  componentDidMount() { // B

  }
  send() {
    var isValid = true;

    if (this.ImputUsuario.verify() == false) isValid = false;
    if (this.ImputPassword.verify() == false) isValid = false;
    if (!isValid) {

      // alert("faltan datos")
    } else {
      var object = {
        component: "usuario",
        version: "2.0",
        type: "login",
        estado: "cargando",
        data: {
          usuario: this.ImputUsuario.getValue(),
          password: this.ImputPassword.getValue(),
        },
      }
      // alert(JSON.stringify(object));
      this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      // console.log(object)
      // this.props.state.socketReducer.session["proyecto"].send(object, true);
    }
    this.setState({ ...this.state });
    return;
  }
  render() {

    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "login") {
      this.props.state.usuarioReducer.estado = "";
      this.ImputPassword.setError();
    }
    if (this.props.state.usuarioReducer.usuarioLog) {
      this.props.navigation.replace("CargaPage");
      return <View />
    }

    return (
      <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : null} style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BackgroundImage />
        <ScrollView bounces={false} style={{
          flex: 1,
          width: "100%",
          // backgroundColor: "#000",
          // justifyContent: "center",
        }}
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <View style={{
            width: "100%",
            alignItems: 'center',
            // backgroundColor:"#000"
          }}>
            <LogoAnimado />
          </View>

          <View style={{
            // backgroundColor:"#000"
            width: "100%",
            maxWidth: 600,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              // fontWeight: "bold",
              color: "#999"
            }}>Iniciar sesión</Text>
            {this.ImputUsuario.getComponent()}
            {this.ImputPassword.getComponent()}
          </View>
          <View style={{
            width: "100%",
            maxWidth: 600,
            // backgroundColor:"#000",
            justifyContent: 'center',
            flexDirection: "row",
          }}>
            <TouchableOpacity style={styles.BTN} onPress={() => {
              this.send()
            }}>
              <Text style={{
                color: "#999"
              }}>{this.props.state.usuarioReducer.estado != "cargando" ? "Login" : <ActivityIndicator color={"#fff"} />}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BTN} onPress={(evt) => {
              this.props.navigation.navigate("ClienteRegistroPage")
            }}>
              <Text style={{
                color: "#999"
              }}>Registro</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  BTN: {
    width: "35%",
    height: 40,
    margin: 8,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(LoginPage);