import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as SImageImput from '../../../Component/SImageImput';
import ActionButtom from '../../../Component/ActionButtom';
import STextImput from '../../../Component/STextImput';
import Svg from '../../../Svg';
import AppParams from '../../../Params';
import PremisosDelRol from './PremisosDelRol';
import BarraSuperior from '../../../Component/BarraSuperior';
import SSCrollView from '../../../Component/SScrollView';
import BackgroundImage from '../../../Component/BackgroundImage';
import STheme from '../../../STheme';
var _ref = {};
class RolRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const key = navigation.getParam('key', false);
    return {
      headerShown: false,
      title: (!key ? "Crear rol" : "Editar rol")
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      repaintImage: new Date().getTime()
    };
    var styleImput = {
      width: "80%",
      padding: 8,
      height: 50,
      margin: 8,
      borderWidth: 2,
      borderColor: "#999",
      borderRadius: 8,
      color: "#fff",
    }
    var key = this.props.navigation.getParam("key", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.rolReducer.data[key];
      if (!this.data) {
        alert("NO HAY DATA");
      }
    }
    this.imputs = {
      descripcion: new STextImput({
        placeholder: "Descripcion o nombre",
        defaultValue: this.data.descripcion,
        // autoCapitalize: "none",
        style: styleImput
      }),

    }
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.rolReducer.estado == "error") {
      this.props.state.rolReducer.estado = "";
      alert("error");
    }
    if (this.props.state.rolReducer.estado == "exito" && this.props.state.rolReducer.type == "anular") {
      this.props.state.rolReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.rolReducer.estado == "exito" && this.props.state.rolReducer.type == "registro") {
      this.props.state.rolReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.rolReducer.estado == "exito" && this.props.state.rolReducer.type == "editar") {
      this.props.state.rolReducer.estado = "";
      this.props.navigation.goBack();
    }
    var urlImage = AppParams.servicios["roles_permisos"] + "rol/" + this.data.key;
    // var urlImage = AppParams.urlImages + "rol/" + this.data.key;
    return (
      <View style={{
        flex: 1,
        height: "100%",
      }}>
        <BackgroundImage />
        <BarraSuperior title={(!this.data.key ? "Crear rol" : "Editar rol")} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView
            style={{
              maxWidth: "100%",
            }}
            contentContainerStyle={{
              alignItems: "center",

            }}>
            <View style={{
              width: "100%",
              // maxWidth: 600,
              alignItems: 'center',
            }}>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>

                <TouchableOpacity style={{
                  width: 180,
                  height: 180,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: STheme.color.card,
                  borderRadius: 8,
                  marginBottom: 16,
                  overflow: 'hidden',
                }} onPress={() => {
                  SImageImput.choseFile({
                    servicio: "roles_permisos",
                    component: "rol",
                    type: "subirFoto",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    key: this.data.key
                  }, (resp) => {
                    // fetch(urlImage);
                    this.props.dispatch({
                      component: "image",
                      type: "cambio",
                      url: urlImage,
                      props: {
                      }
                    })
                    // this.state.repaint = new Date().getTime()
                    // this.setState({...this.state});
                  });
                }}>
                  {this.props.state.imageReducer.getImage(urlImage, {})}
                </TouchableOpacity>
                <Text style={{
                  fontSize: 12,
                  color: "#999",
                }}>{this.data.key}</Text>
                {Object.keys(this.imputs).map((key) => {
                  return this.imputs[key].getComponent();
                })}
              </View>
              <View style={{
                height: 50,
                width: "100%",
                maxWidth: 600,
                justifyContent: 'center',
                flexDirection: "row",
              }}>
                <ActionButtom label={this.props.state.rolReducer.estado == "cargando" ? "cargando" : this.TextButom}
                  onPress={() => {
                    if (this.props.state.rolReducer.estado == "cargando") {
                      return;
                    }
                    var isValid = true;
                    var objectResult = {};
                    Object.keys(this.imputs).map((key) => {
                      if (this.imputs[key].verify() == false) isValid = false;
                      objectResult[key] = this.imputs[key].getValue();
                    })
                    if (isValid) {
                      var object = {
                        component: "rol",
                        estado: "cargando",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      };
                      if (!this.data.key) {
                        object = {
                          ...object,
                          type: "registro",
                          data: {
                            ...objectResult
                          },
                        }
                      } else {
                        object = {
                          ...object,
                          type: "editar",

                          data: {
                            ...this.data,
                            ...objectResult
                          }
                        }
                      }

                      this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                    }
                    this.setState({ ...this.state });
                    return;
                  }}
                />

              </View>
            </View>
            {!this.data.key ? <View /> : <PremisosDelRol data={this.data} />}
          </SSCrollView>
        </View>
        {/* <NaviDrawer /> */}
      </View >
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(RolRegistroPage);