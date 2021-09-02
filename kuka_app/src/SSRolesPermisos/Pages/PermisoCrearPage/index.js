import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import * as SImageImput from '../../../Component/SImageImput';
import ActionButtom from '../../../Component/ActionButtom';
import NaviDrawer from '../../../Component/NaviDrawer';
import STextImput from '../../../Component/STextImput';
import Svg from '../../../Svg';
import AppParams from '../../../Params';
import BarraSuperior from '../../../Component/BarraSuperior';
import BackgroundImage from '../../../Component/BackgroundImage';
import STheme from '../../../STheme';
var _ref = {};
class PermisoCrearPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const key = navigation.getParam('key', false);
    return {
      headerShown: false,
      title: (!key ? "Crear permiso" : "Editar Permiso")
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
      borderColor: STheme.color.text,
      color: STheme.color.text,
      borderRadius: 8,
    }
    var key = this.props.navigation.getParam("key", false);
    this.key_page = this.props.navigation.getParam("key_page", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.permisoReducer.data[this.key_page][key];
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
      type: new STextImput({
        placeholder: "type o tipo",
        defaultValue: this.data.type,
        // secureTextEntry: true,
        style: styleImput
      })
    }
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.permisoReducer.estado == "error") {
      this.props.state.permisoReducer.estado = "";
      alert("error");
    }
    if (this.props.state.permisoReducer.estado == "exito" && this.props.state.permisoReducer.type == "anular") {
      this.props.state.permisoReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.permisoReducer.estado == "exito" && this.props.state.permisoReducer.type == "registro") {
      this.props.state.permisoReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.permisoReducer.estado == "exito" && this.props.state.permisoReducer.type == "editar") {
      this.props.state.permisoReducer.estado = "";
      this.props.navigation.goBack();
    }
    var urlImage = AppParams.servicios["roles_permisos"] + "permiso/" + this.data.key;
    const getButtomAnular = () => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />;
      // }
      // if (!pagina.permisos["anular_permiso"]) {
      //   return <View />;
      // }
      if (!this.data.key) {
        return <View />;
      }
      return (
        <ActionButtom label="ANULAR"
          style={{
            backgroundColor: "#99000077"
          }}
          styleText={{
            color: "#fff"
          }}
          onPress={() => {
            var object = {
              component: "permiso",
              type: "editar",
              estado: "cargando",
              key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
              data: {
                ...this.data,
                estado: 0,
              }
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
          }}
        />
      )
    }
    const getButtomEditar = () => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />;
      // }
      // if (!pagina.permisos["editar_permiso"]) {
      //   return <View />;
      // }

      return (
        <ActionButtom label={this.props.state.permisoReducer.estado == "cargando" ? "cargando" : this.TextButom}
          onPress={() => {
            if (this.props.state.permisoReducer.estado == "cargando") {
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
                component: "permiso",
                estado: "cargando",
              };
              if (!this.data.key) {
                object = {
                  ...object,
                  type: "registro",
                  key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                  data: {
                    key_page: this.key_page,
                    ...objectResult
                  },
                }
              } else {
                object = {
                  ...object,
                  type: "editar",
                  key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
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
      )
    }

    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BackgroundImage />
        <BarraSuperior title={"Crear permiso"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{
          flex: 2,
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
            // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
            // if (!pagina) {
            //   return <View />;
            // }
            // if (!pagina.permisos["editar_permiso"]) {
            //   return <View />;
            // }
            SImageImput.choseFile({
              servicio: "roles_permisos",
              component: "permiso",
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
          {Object.keys(this.imputs).map((key) => {
            return this.imputs[key].getComponent();
          })}
        </View>
        <View style={{

          flex: 1,
          width: "100%",
          maxWidth: 600,
          justifyContent: 'center',
          flexDirection: "row",
        }}>

          {getButtomEditar()}
          {getButtomAnular()}
        </View>

      </View >
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PermisoCrearPage);