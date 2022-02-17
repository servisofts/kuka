import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import NaviDrawer from '../../../Component/NaviDrawer';
import NaviDrawerButtom from '../../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../../SSNavigation'
import ActionButtom from '../../../Component/ActionButtom';
import AppParams from '../../../Params';
import DeleteButtom from '../../../Component/DeleteButtom';
import BarraSuperior from '../../../Component/BarraSuperior';
import STheme from '../../../STheme';
import BackgroundImage from '../../../Component/BackgroundImage';
import DeleteBtn from '../../../Component/DeleteBtn';
import FloatButtom from '../../../Component/FloatButtom';
import SSCrollView from '../../../Component/SScrollView';
import { SSRolesPermisosValidate } from '../..';


class RolPage extends Component {
  static navigationOptions = {
    title: "Lista de roles.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {

    const getButtonCrear = () => {
      // var pagina = this.props.state.usuarioPageReducer.data["RolPage"];
      // if (!pagina) {
      //   return <View />;
      // }
      // if (!pagina.permisos["crear"]) {
      //   return <View />;
      // }
      return (<FloatButtom label={"+"} onPress={() => {
        this.props.navigation.navigate("RolRegistroPage");
      }} />)
    }
    const getButtonEditar = (obj) => {
      if (!SSRolesPermisosValidate({ page: "rolPage", permiso: "editar" })) {
        // return <View />
      }
      
      return (<ActionButtom label="EDITAR"
        onPress={() => {
          this.props.navigation.navigate("RolRegistroPage", { key: obj.key });
        }} style={{
          width: 60,
          height: 25,
          borderRadius: 4,
          margin: 0,
        }} />
      )
    }

    const getButtomAnular = (obj) => {
      // var pagina = this.props.state.usuarioPageReducer.data["RolPage"];
      // if (!pagina) {
      //   return <View />;
      // }
      // if (!pagina.permisos["anular"]) {
      //   return <View />;
      // }
      return (<DeleteBtn onDelete={() => {
        var object = {
          component: "rol",
          type: "anular",
          estado: "cargando",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
          key: obj.key
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      }} />)
    }
    const getLista = () => {
      var reducer = this.props.state.rolReducer;
      var permisos = reducer.data;
      if (!permisos) {
        if (reducer.estado == "cargando") {
          return <ActivityIndicator color={STheme.color.secondary} />
        }
        if (reducer.estado == "error") {
          return <Text>error</Text>
        }
        var object = {
          component: "rol",
          type: "getAll",
          estado: "cargando",
          key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return <View />
      }

      return Object.keys(permisos).map((key) => {
        var obj = permisos[key];

        var urlImage = AppParams.servicios["roles_permisos"] + "rol/" + obj.key;
        return <View style={{
          width: "95%",
          maxWidth: 600,
          height: 60,
          padding: 4,
          marginBottom: 8,
          borderRadius: 8,
          backgroundColor: STheme.color.card
          // borderWidth: 1,
          // borderColor: STheme.color.secondary + "22",
        }}>


          <View style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}>
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              {this.props.state.imageReducer.getImage(urlImage, {})}
            </View>
            <View style={{
              flex: 1,
              // alignItems: "center",
              paddingStart: 8,
              justifyContent: "center",
            }}>
              <Text style={{
                fontSize: 18,
                color: STheme.color.text,
                fontWeight: "bold"
              }}>{obj.descripcion}</Text>


            </View>
            <View style={{
              justifyContent: "space-evenly",
              alignItems: "center"
            }}>
              {getButtonEditar(obj)}
              {getButtomAnular(obj)}

            </View>
          </View>
        </View>
      })
    }
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BackgroundImage />
        <BarraSuperior title={"Roles de usuario"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView>
            {getLista()}
          </SSCrollView>

        </View>
        {getButtonCrear()}
      </View>

    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(RolPage);