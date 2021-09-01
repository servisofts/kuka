import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import NaviDrawer from '../../../Component/NaviDrawer';
import NaviDrawerButtom from '../../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../../SSNavigation'
import ActionButtom from '../../../Component/ActionButtom';
import BarraSuperior from '../../../Component/BarraSuperior';
import AppParams from '../../../Params';


class PermisoPage extends Component {
  static navigationOptions = {
    title: "Lista de permisos.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {
    var permisos = this.props.state.permisoReducer.data;
    if (!permisos) {
      if (this.props.state.permisoReducer.estado == "cargando") {
        return <Text>Cargando</Text>
      }
      var object = {
        component: "permiso",
        type: "getAll",
        estado: "cargando"
      }
      this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      return <View />
    }

    const getLista = () => {
      return Object.keys(permisos).map((key) => {
        var obj = permisos[key];
        return <View style={{
          width: "90%",
          maxWidth: 500,
          height: 100,
          padding: 8,
          margin: 8,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#ddd",
        }}>
          <View style={{
            flex: 1
          }}>
            <View style={{
              flexDirection: "row",
            }}>
              <Text style={{
                color: "#999"
              }}>descripcion: </Text>
              <Text>{obj.descripcion}</Text>
            </View>
            <View style={{
              flexDirection: "row"
            }}>
              <Text style={{
                color: "#999"
              }}>type: </Text>
              <Text>{obj.type}</Text>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <ActionButtom label="Editar" style={{
              height: 30,
            }}
              onPress={() => {
                this.props.navigation.navigate("PermisoCrearPage", { key: obj.key });
              }} />
            <ActionButtom label="Eliminar"
              style={{
                height: 30,
                backgroundColor: "#99000077"
              }}
              styleText={{
                color: "#fff"
              }}
              onPress={() => {
                var object = {
                  component: "permiso",
                  type: "anular",
                  estado: "cargando",
                  key: obj.key
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
              }}
            />
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
        <BarraSuperior title={"Lista de usuarios"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ActionButtom label="NUEVO"
          onPress={() => {
            this.props.navigation.navigate("PermisoCrearPage");
          }}
        />
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          {getLista()}
        </ScrollView>

        <NaviDrawerButtom open={() => {
          this.state.naviDrawer.open();
        }} />
      </View>
      <NaviDrawer ref={(ref) => {
        this.state.naviDrawer = ref;
      }} navigation={this.props.navigation} />
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PermisoPage);