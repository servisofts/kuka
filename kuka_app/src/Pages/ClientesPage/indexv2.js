import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
// import NaviDrawer from '../../Component/NaviDrawer';
// import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
// import * as SSNavigation from '../../SSNavigation'
// import ActionButtom from '../../Component/ActionButtom';
import AppParams from '../../Params';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SSCrollView from '../../Component/SScrollView';
import FloatButtom from '../../Component/FloatButtom';
import SOrdenador from '../../Component/SOrdenador';
import Buscador from '../../Component/Buscador';
class ClientesPage extends Component {
  static navigationOptions = {
    title: "Lista de usuario.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };
    // SSNavigation.setProps(props);

  }
  sendMail = (to) => {
    if (Platform.OS == "web") return;
    var subject = "Solicitud";
    var body = "";
    var options = {};
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link

    Linking.openURL(url);
  };
  callNumber = (phone) => {
    if (Platform.OS == "web") return;
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };
  pagination = (listaKeys) => {
    var pageLimit = 50
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }

    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);

    // console.log(actual);
    // console.log(actual + pageLimit);
    return listaKeys.slice(0, actual + pageLimit);
  }

  render() {

    const getLista = () => {
      var cabecera = "registro_administrador";
      var data = this.props.state.usuarioReducer.data[cabecera];
      if (!data) {
        if (this.props.state.usuarioReducer.estado == "cargando") {
          return <ActivityIndicator color={"#fff"} />
        }
        return <ActivityIndicator color={"#fff"} />
      }
      var reducer = this.props.state.usuarioRolReducer;
      var dataRU = reducer.rol["d16d800e-5b8d-48ae-8fcb-99392abdf61f"];
      if (!dataRU) {
        if (reducer.estado == "cargando") {
          return <ActivityIndicator color={"#fff"} />
        }
        return <ActivityIndicator color={"#fff"} />
      }
      var usuariosActivos = this.props.state.usuarioReducer;

      if (!usuariosActivos) {
        if (reducer.estado == "cargando") {
          return <ActivityIndicator color={"#fff"} />
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send({
          component: "usuario",
          type: "getAllActivos",
          estado: "cargando",
        }, true);
        return <ActivityIndicator color={"#fff"} />
      }


      if (!this.state.buscador) {
        return <ActivityIndicator color={"#fff"} />
      }
      var objFinal = {};
      Object.keys(data).map((key) => {
        if (!dataRU[key]) {
          return <View />
        }
        // if (data[key].estado == 0) {
        //   return <View />
        // }
        objFinal[key] = data[key];
      });
      return this.pagination(
        new SOrdenador([
          { key: "Peso", order: "desc", peso: 4 },
          { key: "Nombres", order: "asc", peso: 2 },
          { key: "Apellidos", order: "asc", peso: 1 },
        ]).ordernarObject(
          this.state.buscador.buscar(objFinal)
        )
      ).map((key) => {
        var usr = data[key];
        var obj = data[key];

        // if (!usr.estado) {
        //   return <View />
        // }
        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          height: 50,
          margin: 4,
          borderRadius: 10,
          backgroundColor: "#66000044"
        }} onPress={() => {
          this.props.navigation.navigate("ClientePerfilPage", {
            key_usuario: key
          })
        }}>
          <View style={{
            flex: 1,
            justifyContent: "center"
          }}>
            <View style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              alignItems: "center"
            }}>
              <View style={{
                width: 40,
                height: 40,
                marginRight: 8,
                justifyContent: "center",
                alignItems: "center",
                // padding: 1,
                // borderRadius: 200,
                backgroundColor: "#ff999933",
                borderRadius: 100,
                overflow: "hidden"
              }}>
                {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + key, {
                  width: "100%",
                  objectFit: "cover",
                  resizeMode: "cover",

                })}
              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "capitalize",
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
        <BarraSuperior title={"Clientes"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <Buscador ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }} />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView
            style={{ width: "100%" }}
            contentContainerStyle={{
              alignItems: "center"
            }}
            onScroll={(evt) => {
              var evn = evt.nativeEvent;
              var posy = evn.contentOffset.y + evn.layoutMeasurement.height;
              var heigth = evn.contentSize.height;
              if (heigth - posy <= 0) {
                this.state.pagination.curPage += 1;
                this.setState({ ...this.state })
              }
            }}
          >
            {getLista()}
          </SSCrollView>
          <FloatButtom onPress={() => {
            this.props.navigation.navigate("ClienteRegistroPage")
          }} />
        </View>
      </View>
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesPage);