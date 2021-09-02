import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import NaviDrawer from '../../../Component/NaviDrawer';
import NaviDrawerButtom from '../../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../../SSNavigation'
import ActionButtom from '../../../Component/ActionButtom';
import FloatButtom from '../../../Component/FloatButtom';
import AppParams from '../../../Params';
import BarraSuperior from '../../../Component/BarraSuperior';
import SSCrollView from '../../../Component/SScrollView';
import STheme from '../../../STheme';
import BackgroundImage from '../../../Component/BackgroundImage';
import DeleteBtn from '../../../Component/DeleteBtn';
import Svg from '../../../Svg';
import SOrdenador from '../../../Component/SOrdenador';
import Buscador from '../../../Component/Buscador';


class PermisoPagePage extends Component {
  static navigationOptions = {
    title: "Permisos page.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {
    var permisos = this.props.state.pageReducer.data;
    if (!permisos) {
      if (this.props.state.pageReducer.estado == "cargando") {
        return <Text>Cargando</Text>
      }
      var object = {
        component: "page",
        type: "getAll",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
      }
      this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      return <View />
    }
    // console.log(permisos)
    const getPermisos = (key_page) => {
      var reducer = this.props.state.permisoReducer;
      var permisos = reducer.data[key_page];
      if (!permisos) {
        if (Object.keys(reducer.data).length > 0) {
          permisos = {};
        } else {
          if (reducer.estado == "cargando") {
            return <Text>Cargando</Text>
          }
          var object = {
            component: "permiso",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
          }
          this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
          return <View />
        }
      }
      var Lista = new SOrdenador([
        { key: "descripcion", order: "asc", peso: 2 },
      ]).ordernarObject(
        permisos
      ).map((key) => {
        var objPermiso = permisos[key];
        // fetch(AppParams.urlImages + "permiso/" + objPermiso.key)

        if (objPermiso.key_page != key_page) {
          return <View />
        }
        if (objPermiso.estado == 0) {
          return <View />
        }
        var urlImage = AppParams.servicios["roles_permisos"] + "permiso/" + objPermiso.key;
        return <TouchableOpacity style={{
          width: 80,
          height: 120,
          alignItems: "center",
        }} onPress={() => {
          // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
          // if (!pagina) {
          //   return true;
          // }
          // if (!pagina.permisos["ver_perfil_permiso"]) {
          //   return true;
          // }
          this.props.navigation.navigate("PermisoCrearPage", { key: objPermiso.key, key_page: objPermiso.key_page });
        }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: STheme.color.card,
            borderColor: "#ddd",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
          }}>
            {this.props.state.imageReducer.getImage((urlImage), {
              position: "absolute",

            })}

          </View>
          <Text style={{
            width: "90%",
            textAlign: "center",
            fontSize: 10,
            // backgroundColor: "#000",
            color: STheme.color.text,
          }}>{objPermiso.descripcion}</Text>
        </TouchableOpacity>
      })
      const getButtomCrearPermiso = (obj) => {
        // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
        // if (!pagina) {
        //   return <View />
        // }
        // if (!pagina.permisos["agregar_permiso"]) {
        //   return <View />
        // }
        return (
          <TouchableOpacity style={{
            height: 80,
            width: 80,
            alignItems: "center"
          }}
            onPress={() => {
              this.props.navigation.navigate("PermisoCrearPage", { key_page: key_page });
            }} >
            <Svg name={"Add"} style={{
              width: 60,
              height: 60
            }} />
          </TouchableOpacity>
        )
      }
      return <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}>
        {getButtomCrearPermiso()}
        {Lista}
      </View>
    }
    const getButtomEditar = (obj) => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />
      // }
      // if (!pagina.permisos["editar"]) {
      //   return <View />
      // }
      return (<ActionButtom styleText={{ fontSize: 10, }} label="Editar" onPress={() => {
        this.props.navigation.navigate("PermisoPageRegistroPage", { key: obj.key });
      }} style={{
        width: 60,
        height: 25,
        borderRadius: 4,
        margin: 0,
      }} />)
    }
    const getButtomAnular = (obj) => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />
      // }
      // if (!pagina.permisos["anular"]) {
      //   return <View />
      // }
      return (<DeleteBtn title="Anular"
        onDelete={() => {
          var object = {
            component: "page",
            type: "editar",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data: {
              ...obj,
              estado: 0,
            },
          }
          this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        }}
      />)
    }

    const getLista = () => {
      if (!this.state.buscador) {
        return <ActivityIndicator color={"#fff"} />
      }

      return new SOrdenador([
        { key: "descripcion", order: "asc", peso: 2 },
      ]).ordernarObject(
        this.state.buscador.buscar(permisos)
      ).map((key) => {
        var obj = permisos[key];
        if (obj.estado == 0) {
          return <View />
        }
        return <View style={{
          width: "95%",
          // padding: 4,
          padding: 4,
          marginBottom: 8,
          borderRadius: 10,
          // borderWidth: 2,
          borderColor: "#ddd",
          justifyContent: "center",
          backgroundColor: STheme.color.card
          // alignItems:"ce"
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            marginBottom: 8,
            borderBottomColor: "#660000",
            borderBottomWidth: 1,
          }}>
            <View style={{
              width: 45,
              height: 45,
              margin: 4,
            }}>
              {this.props.state.imageReducer.getImage(AppParams.servicios["roles_permisos"] + "page/" + key, {})}
            </View>
            {/* <Text style={{
              color: "#999"
            }}>descripcion: </Text> */}
            <View style={{
              flex: 2,
              // alignItems: "center"
            }}>
              <Text style={{
                fontSize: 18,
                color: STheme.color.text
              }}>{obj.descripcion}</Text>
              <Text style={{
                fontSize: 10,
                color: STheme.color.text
              }}>{"/" + obj.url}</Text>
            </View>

            <View style={{
              // flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 4,
            }}>
              {getButtomEditar(obj)}
              <View style={{
                height: 8,
              }}></View>
              {getButtomAnular(obj)}

            </View>
          </View>

          <View style={{
            marginTop: 4,
            flex: 1,
            flexDirection: "column",
          }}>
            {getPermisos(obj.key)}
          </View>
        </View>
      })
    }
    const getButtomCrear = () => {
      // var pagina = this.props.state.usuarioPageReducer.data["PermisoPagePage"];
      // if (!pagina) {
      //   return <View />
      // }
      // if (!pagina.permisos["crear"]) {
      //   return <View />
      // }
      return (
        <FloatButtom text="nuevo"
          onPress={() => {
            this.props.navigation.navigate("PermisoPageRegistroPage");
          }}
          label={"+"}
        />
      )
    }
    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BackgroundImage />
        <BarraSuperior title={"Lista de paginas"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

        <View style={{
          flex: 1,
          width: "100%",
          alignItems: 'center',

          // justifyContent:"Ce"
        }}>

          <Buscador placeholder={"Buscar."} ref={(ref) => {
            if (!this.state.buscador) this.setState({ buscador: ref });
          }} repaint={() => { this.setState({ ...this.state }) }}
            eliminados={false}
          />
          <View style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',
          }}>
            <SSCrollView style={{
              maxWidth: "100%",
            }}>
              {getLista()}
            </SSCrollView>
          </View>
        </View>

        {getButtomCrear()}
      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PermisoPagePage);