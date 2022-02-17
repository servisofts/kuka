import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SImage from '../../Component/SImage';
import Svg from '../../Svg';

class CodigoPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  render() {
    return (<>
      <View style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Codigo"} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <ScrollView style={{
          width: "100%",
          flex: 1,
        }} contentContainerStyle={{
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
              paddingBottom: 40,
              // justifyContent: "center",
              alignItems: "center"
            }}>
              <Svg name={"Codigo"} style={{
                width: "80%",
                height: 150,
              }} />
              <Text style={{
                marginTop: 16,
                color: "#fff",
                textAlign: "justify",
                fontSize: 18,
                fontWeight: "bold"
              }}>
                Codigo
                </Text>
              <Text style={{
                marginTop: 16,
                color: "#fff",
                textAlign: "justify"
              }}>En el servidor normalmente se coloca el compilado de la aplicacion, pero el codigo fuente de la aplicacion (que es el molde para fabricar y nuevamente el compilado con las actualizaciones o cambios requeridos) no lograbamos encontrar, pasado 4 dias nos lograron conseguir el codigo que estaba alojado en google cloud.</Text>

              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>Una vez ingresado al drive, logramos descargar el codigo fuente, logrando realizar el siguiente analicis.</Text>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>El codigo esta desarrollado utilizando dos conocidos patrones de diseno:</Text>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>Para su conexion con la base de datos utilizan DAO (Data access object).</Text>
              <View style={{
                width: "100%",
                height: 200,
                // backgroundColor: "#fff"
              }}>
                <SImage source={require("../../img/codigo/1.png")} style={{ resizeMode: "center", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", }} />
              </View>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>Para su interacción backend front-end utilizan MVC (Modelo vista controlador)</Text>
              <View style={{
                width: "100%",
                // height: 200,
                // backgroundColor: "#fff"
              }}>
                <SImage source={require("../../img/codigo/2.jpeg")} style={{ resizeMode: "contain", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "contain", }} />
              </View>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}> El código mantiene una estructura Ant en java, creado con el IDE netbeans Web Aplications.</Text>

              <View style={{
                width: "100%",
                maxHeight: 200,
                // height: 200,
                // backgroundColor: "#fff"
              }}>
                <SImage source={require("../../img/codigo/3.jpeg")} style={{ resizeMode: "cover", width: "100%", maxHeight: "100%", maxWidth: 700, objectFit: "cover", }} />
              </View>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}> El front-end está desarrollado en una mezcla de html, jsp, jquery y javascript.</Text>
              <View style={{
                width: "100%",
                maxHeight: 100,
                flexDirection: "row",
                justifyContent: "space-between"
                // height: 200,
                // backgroundColor: "#fff"
              }}>
                <View style={{
                  flex: 1,
                  height: "100%",
                }}>
                  <SImage source={require("../../img/Jquery.png")} style={{ resizeMode: "contain", width: "100%", maxHeight: "100%", objectFit: "contain", }} />
                </View>
                <View style={{
                  flex: 1,
                  height: "100%",
                }}>
                  <SImage source={require("../../img/html.png")} style={{ resizeMode: "cover", width: 100, maxHeight: "100%", objectFit: "cover", }} />

                </View>
                <View style={{
                  flex: 1,
                  height: "100%",
                }}>
                  <SImage source={require("../../img/javascript.png")} style={{ resizeMode: "cover", width: 100, maxHeight: "100%", objectFit: "cover", }} />
                </View>
                <View style={{
                  flex: 1,
                  height: "100%",
                }}>
                  <SImage source={require("../../img/codigo/jsp.png")} style={{ resizeMode: "cover", width: 100, maxHeight: "100%", objectFit: "cover", }} />
                </View>
              </View>
              <Text style={{
                color: "#fff",
                textAlign: "justify",
                marginTop: 16,
              }}>El backend esta desarrollado en java con servlets y classes.</Text>
              <View style={{
                width: "100%",
                maxHeight: 200,
                flexDirection: "row",
                justifyContent: "center"
                // height: 200,
                // backgroundColor: "#fff"
              }}>
                <SImage source={require("../../img/java.png")} style={{ resizeMode: "cover", width: 100, maxHeight: 100, objectFit: "cover", }} />
              </View>
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
export default connect(initStates)(CodigoPage);