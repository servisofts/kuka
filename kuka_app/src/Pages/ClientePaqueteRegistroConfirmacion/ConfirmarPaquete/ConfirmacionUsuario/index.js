import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import FotoPerfilUsuario from '../../../../Component/FotoPerfilUsuario';
import AppParams from '../../../../Params';
import { SView, SBackground, SInput, SText, SScrollView, SButtom, SPopupClose, SScrollView2 } from '../../../../SComponent';

class ConfirmacionUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true
    };
    this.inputsRef = {}
  }
  getInput(key, type, required, size) {
    return <SInput
      ref={(ref) => {
        this.inputsRef[key] = ref
        if (ref) {
          if (ref.verify) {
            ref.verify();
          }
        }
      }}
      // placeholder={key}
      defaultValue={this.data[key]}
      onStateChange={(evt) => {
        var isValid = true;
        Object.keys(this.inputsRef).map((key) => {
          var input: SInput = this.inputsRef[key];
          if (!input.verify(true)) isValid = false;
        })
        if (isValid != this.state.isValid) {
          this.state.isValid = isValid;
          this.setState({ isValid: isValid });
          return <View />
        }
      }}
      props={{
        isRequired: required,
        type: type,
        col: size,
        variant: "small",
        customStyle: "calistenia",
        label: key,
      }} />
  }
  sendServer() {
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
    var data = this.data;
    var cambio = false;
    Object.keys(objectResult).map((keyDato) => {
      if (objectResult[keyDato] != data[keyDato]) {
        cambio = true;
      }
    })


    if (!cambio) {
      this.setState({ ...this.state });
      this.props.onConfir(data);
      SPopupClose("ConfirmacionUsuario")
      return;
    }
    var dataFinal = {
      ...this.data,
      ...objectResult,
    }

    var object = {
      component: "usuario",
      type: "editar",
      version: "2.0",
      estado: "cargando",
      cabecera: "registro_administrador",
      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      data: dataFinal
    }
    // alert(JSON.stringify(object));
    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    this.props.onConfir(dataFinal);
    SPopupClose("ConfirmacionUsuario")
  }
  getBtn() {
    if (!this.state.isValid) {
      return <View />
    }
    return <SButtom
      props={{
        type: "danger",
        variant: "default"
      }}
      style={{
        marginTop: 10,
      }}
      onPressValidation={() => {

      }}
      onPress={() => {
        if (this.props.onConfir) {
          this.sendServer()
        }
      }}>Verificar</SButtom>
  }
  render() {
    this.data = this.props.state.usuarioReducer.data["registro_administrador"][this.props.data.key];
    return (
      <SView props={{
        col: "xs-10 md-7 xl-5",
        withoutFeedback: true,
        variant: "center",
      }} style={{
        borderRadius: 8,
        height: 550,
        maxHeight: "100%",
        overflow: "hidden"
      }}>
        <SBackground />
        <SScrollView2 disableHorizontal={true} style={{
          width: "100%",
          height: "100%",
        }} >
          <SView props={{
            variant: "center",
            direction: "row",
          }} style={{
            width: "100%",
            height: "100%",
            paddingBottom: 50,
          }}>
            <SView props={{
              variant: "center",
              col: "xs-12",
            }} style={{
              marginTop: 8,
            }}>
              <SText props={{ type: "primary", variant: "h4" }}>Confirma los datos del usuario</SText>
            </SView>
            <SView props={{
              variant: "col-square",
              col: "xs-3",
            }} style={{
              marginTop: 8,
            }}>
              <FotoPerfilUsuario usuario={this.data} disabled={false} />
            </SView>
            {this.getInput("Nombres", SInput.TYPE(""), true, "xs-10 md-10")}
            {this.getInput("Apellidos", SInput.TYPE(""), true, "xs-10 md-10")}
            {this.getInput("CI", SInput.TYPE(""), true, "xs-10 md-10")}
            {this.getInput("Telefono", SInput.TYPE("phone"), true, "xs-10 md-10")}
            {this.getInput("Correo", SInput.TYPE("email"), true, "xs-10 md-10")}
            <SView props={{
              col: "xs-12",
              variant:"center"
            }} style={{
              height:100
            }}>
              {this.getBtn()}
            </SView>
          </SView>
        </SScrollView2>
      </SView>
    );
  }
}


const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ConfirmacionUsuario);