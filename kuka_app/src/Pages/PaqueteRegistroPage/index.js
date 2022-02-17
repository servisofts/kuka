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
import FotoPerfilComponent from '../../Component/FotoPerfilComponent';
import ServicioDePaquete from './ServicioDePaquete';
import SSCrollView from '../../Component/SScrollView';
import DeleteBtn from '../../Component/DeleteBtn';
// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class PaqueteRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      servicios: {},
    };
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
    var key = this.props.navigation.getParam("key", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.paqueteReducer.data[key];
      this.data.key = key;
      if (!this.data) {
        alert("NO HAY DATA");
      }
    }
    console.log(this.data)
    this.imputs = {
      descripcion: new STextImput({
        placeholder: "descripcion",
        defaultValue: this.data["descripcion"],
        style: styleImput
      }),

      precio: new STextImput({
        placeholder: "precio",
        type: "Monto",
        keyboardType: 'numeric',
        defaultValue: this.data["precio"],
        // autoCapitalize: "none",
        style: styleImput
      }),
      dias: new STextImput({
        placeholder: "dias",
        type: "Monto",
        keyboardType: 'numeric',
        defaultValue: this.data["dias"],
        style: styleImput
      }),
      participantes: new STextImput({
        placeholder: "participantes",
        keyboardType: 'number-pad',
        type: "Monto",
        defaultValue: this.data["participantes"],
        style: styleImput
      }),
    }
  }
  componentDidMount() { // B

  }

  getEliminar() {
    if (!this.data.key) {
      return <View />
    }
    return <DeleteBtn
      style={{
        width: 100,
        height: 40,
        margin:8,
      }}
      onDelete={() => {
        var object = {
          component: "paquete",
          type:  "editar",
          estado: "cargando",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
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

    // if (this.props.state.paqueteReducer.estado == "error" && this.props.state.paqueteReducer.type == "registro") {
    //   this.props.state.paqueteReducer.estado = "";
    //   // alert(this.props.state.usuarioReducer.errorRegistro)
    //   switch (this.props.state.paqueteReducer.errorRegistro) {
    //     case "existe_Correo":
    //       this.imputs.Correo.setError()
    //       break;
    //     case "existe_Telefono":
    //       this.imputs.Telefono.setError()
    //       break;

    //   }
    // }
    if (this.props.state.paqueteReducer.estado == "exito" && (this.props.state.paqueteReducer.type == "registro" || this.props.state.paqueteReducer.type == "editar")) {
      this.props.state.paqueteReducer.estado = "";
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
          width: "100%",
          flex: 1,
        }}>

          <SSCrollView style={{
            width: "100%",
            height: "100%"

          }} >

            <View style={{
              width: "100%",
              // maxWidth: 600,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
              <Text style={{
                color: "#fff",
                fontSize: 16,
              }}>{!this.data.key ? "Registra " : "Edita "} un paquete.</Text>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>

                {!this.data.key ? <View /> : <View style={{
                  width: 150,
                  height: 150,
                }}><FotoPerfilComponent data={this.data} component={"paquete"} />
                </View>}

                {Object.keys(this.imputs).map((key) => {
                  return this.imputs[key].getComponent();
                })}


              </View>
              <ServicioDePaquete keyPaquete={this.data.key} onChange={(data) => {
                console.log(data);
                this.setState({ servicios: data });
              }} />
              <View style={{
                flex: 1,
                width: "90%",
                maxWidth: 600,
                justifyContent: 'center',
                flexDirection: "row",
              }}>
                {this.getEliminar()}
                <ActionButtom label={this.props.state.paqueteReducer.estado == "cargando" ? "cargando" : this.TextButom}
                  onPress={() => {
                    if (this.props.state.paqueteReducer.estado == "cargando") {
                      return;
                    }
                    var serviciosSelec = Object.keys(this.state.servicios);
                    var isValid = true;
                    var objectResult = {};
                    Object.keys(this.imputs).map((key) => {
                      if (this.imputs[key].verify() == false) isValid = false;
                      objectResult[key] = this.imputs[key].getValue();
                    })
                    if (!this.data.key) {
                      if (serviciosSelec.length <= 0) {
                        alert("Debe activar almenos 1 servicio");
                        isValid = false;
                      }
                    }


                    if (!isValid) {
                      this.setState({ ...this.state });
                      return;
                    }
                    var object = {
                      component: "paquete",
                      type: !this.data.key ? "registro" : "editar",
                      estado: "cargando",
                      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      servicios: serviciosSelec,
                      data: {
                        ...this.data,
                        ...objectResult,
                      },
                    }
                    // alert(JSON.stringify(object));
                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
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
export default connect(initStates)(PaqueteRegistroPage);