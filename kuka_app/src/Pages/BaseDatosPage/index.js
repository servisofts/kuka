import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SImage from '../../Component/SImage';
import Ventanas from '../../Component/Ventanas';
import AppParams from '../../Params';
import Svg from '../../Svg';

class BaseDatosPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  getFunciones = () => {
    var data = this.props.state.oldReducer.bdInfo;
    if (!data) {
      if (this.props.state.oldReducer.estado == "cargando") {
        return <ActivityIndicator color="#fff" />
      }
      if (this.props.state.oldReducer.estado == "error") {
        return <ActivityIndicator color="#fff" />
      }
      return <ActivityIndicator color="#fff" />
    }
    return <View style={{
      width: "100%",
      height: "100%",
    }}>

      <ScrollView style={{
        width: "100%",
        height: Dimensions.get("window").height - 70,
      }} nestedScrollEnabled={true} contentContainerStyle={{
        paddingBottom: 100,
        // height: "100%",
      }}>
        {data.procedures.map((obj, key) => {
          return <View style={{
            width: "100%",
            // height: 100,
            borderBottomWidth: 1,
            borderColor: "#444",
            paddingTop: 8,
            // paddingLeft: 4,
            // paddingRight: 4,
            // alignItems: "center"
          }}>
            <View style={{
              width: "100%",
              flexDirection: "row",
            }}>
              <Text style={{
                color: "#fff",
                flex: 1,
              }}>{obj}</Text>
              {/* <Text style={{
              color: "#666"
            }}>{obj.length}</Text> */}
            </View>
          </View>
        })}
      </ScrollView>
    </View >
  }
  getBaseDatos = () => {
    var data = this.props.state.oldReducer.bdInfo;
    if (!data) {
      if (this.props.state.oldReducer.estado == "cargando") {
        return <ActivityIndicator color="#fff" />
      }
      if (this.props.state.oldReducer.estado == "error") {
        return <ActivityIndicator color="#fff" />
      }
      var object = {
        component: "old",
        type: "bdInfo",
        estado: "cargando",
      }
      this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      return <ActivityIndicator color="#fff" />
    }
    return <View style={{
      width: "100%",
      height: "100%",
    }}>
      <ScrollView style={{
        width: "100%",
        height: Dimensions.get("window").height - 70,
      }} nestedScrollEnabled={true} contentContainerStyle={{
        // height: "100%",
        paddingBottom: 100,
      }}>
        {Object.keys(data.tables).map((key) => {
          var obj = data.tables[key];
          return <View style={{
            width: "100%",
            height: 100,
            borderBottomWidth: 1,
            borderColor: "#444",
            paddingTop: 8,
            // paddingLeft: 4,
            // paddingRight: 4,
            // alignItems: "center"
          }}>
            <View style={{
              width: "100%",
              flexDirection: "row",
            }}>
              <Text style={{
                color: "#fff",
                flex: 1,
              }}>{key}</Text>
              <Text style={{
                color: "#666"
              }}>{obj.length}</Text>
            </View>
            <View style={{
              width: "100%",
              flexDirection: "row",
              flex: 1,
            }}>
              <ScrollView
                style={{
                  width: "100%",
                  height: "100%"
                }}
                horizontal={true}>
                {obj.map((obj1, key1) => {
                  return <View style={{
                    width: 100,
                    height: "100%",
                    marginLeft: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Text style={{
                      color: "#999",
                      textAlign: "center",
                      fontSize: 10,
                    }}>{obj1.Field}</Text>
                    <Text style={{
                      color: "#666",
                      textAlign: "center",
                      fontSize: 10,
                    }}>{obj1.Type}</Text>
                  </View>
                })}
              </ScrollView>
            </View>
          </View>
        })}
      </ScrollView>
    </View >
  }
  render() {
    return (<>
      <View style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center"
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Base de datos"} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <ScrollView style={{
          width: "100%",
          flex: 1,
        }}>
          <View style={{
            width: "100%",
            // justifyContent: "center",
            alignItems: "center"
          }}>


            <View style={{
              flex: 1,
              width: "90%",
              maxWidth: 500,
              paddingTop: 8,
              // justifyContent: "center",
              alignItems: "center"
            }}>
              <Svg name={"BaseDatos"} style={{
                width: "80%",
                height: 150,
              }} />
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                fontSize: 18,
                fontWeight: "bold"
              }}>
                Base de datos
                </Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify"
              }}>Como todos sabemos los más importante para las empresas son sus datos, estos son la única forma de saber el estado actual de la misma. Todos los movimientos de la empresa deberían transformarse en datos para saber el estado de nuestra empresa en el tiempo y a si poder realizar análisis más precisos. {"\n"}
              Al conjunto de datos almacenados sistemáticamente para su posterior uso se le llama Base de datos.  {"\n"}
              El primer paso al momento de hacer una ingeniería inversa es salvar la base de datos, para esto la empresa Servisofs realizamos un backup de el último estado encontrado de su base de datos, desde su estructura (meta-data) hasta los datos y procedimientos almacenados.{"\n"}
              A continuación le presentamos una estructura de las tablas de su antiguo sistema y sus características.</Text>

              <View style={{
                marginTop: 16,
                width: 200,
                height: 200,
                // backgroundColor: "#fff",
                borderRadius: 20,
                backgroundColor: "#ffffffdd"
              }}>
                <SImage source={require("../../img/mysql.png")} style={{ resizeMode: "center", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", }} />
              </View>

            </View>
            <View style={{
              marginTop: 8,
              width: "90%",
              height: Dimensions.get("window").height - 70
              // borderRadius: 8,
              // backgroundColor: "#fff",
            }}>

              <Ventanas ref={(ref) => { this.ventanas = ref }} default={"Tablas"} ventanas={{
                Tablas: this.getBaseDatos(),
                Procedimientos: this.getFunciones()
              }} />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(BaseDatosPage);