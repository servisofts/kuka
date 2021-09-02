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
class ProcesoRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
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
    this.key_edit = props.navigation.state.params.key;
    this.data = props.navigation.state.params.data;
    this.imputs = {
      descripcion: new STextImput({
        placeholder: "Descripcion",
        defaultValue: (!this.key_edit ? "" : this.data.descripcion),
        // autoCapitalize: "none",

        style: styleImput
      }),
      observacion: new STextImput({
        placeholder: "Observacion",
        defaultValue: (!this.key_edit ? "" : this.data.observacion),
        // autoCapitalize: "none",
        multiline: true,
        style: { ...styleImput, height: 100 }
      }),

    }
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.procesoReducer.estado == "exito" && this.props.state.procesoReducer.type == "registro") {
      this.props.state.procesoReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.procesoReducer.estado == "exito" && this.props.state.procesoReducer.type == "editar") {
      this.props.state.procesoReducer.estado = "";
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

        <BarraSuperior duration={500} title={(!this.key_edit ? "Nuevo" : "Editar") + " proceso"} navigation={this.props.navigation} goBack={() => {
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
            }}>{(!this.key_edit ? "Nuevo" : "Editar")} proceso</Text>
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
              {(!this.key_edit ? <View /> : <ActionButtom label={"Eliminar"} onPress={() => {
                this.data.estado = 0;
                var object = {
                  component: "proceso",
                  type: "editar",
                  estado: "cargando",
                  key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                  data: this.data,
                }
                // alert(JSON.stringify(object));
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
              }} />)}

              <ActionButtom label={this.props.state.procesoReducer.estado == "cargando" ? "cargando" : (!this.key_edit ? "Crear" : "Editar")}
                onPress={() => {
                  if (this.props.state.procesoReducer.estado == "cargando") {
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

                  if (this.key_edit) {
                    var dataEdit = { ...this.data, ...objectResult, }
                    var object = {
                      component: "proceso",
                      type: "editar",
                      estado: "cargando",
                      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      data: dataEdit,
                    }
                    // alert(JSON.stringify(object));
                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                  } else {
                    objectResult["key_usuario"] = this.props.state.usuarioReducer.usuarioLog.key;
                    objectResult["key_modulo"] = this.data.key;
                    var object = {
                      component: "proceso",
                      type: "registro",
                      estado: "cargando",
                      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      key_modulo: this.data.key,
                      data: objectResult,
                    }
                    // alert(JSON.stringify(object));
                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                  }

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
export default connect(initStates)(ProcesoRegistroPage);