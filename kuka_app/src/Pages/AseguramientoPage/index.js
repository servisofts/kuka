import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import Svg from '../../Svg';

class AseguramientoPage extends Component {
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
        alignItems: "center"
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Aseguramiento"} goBack={() => {
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
              paddingTop: 8,
              maxWidth: 500,
              paddingBottom: 40,
              // justifyContent: "center",
            }}>
              <Svg name={"Asegurado"} style={{
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
                Aseguramiento
                </Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>En Servisofts antes de iniciar operaciones, nos encargamos del aseguramiento de sus datos.</Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>Para esto recolectamos la siguiente información.</Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>Un servidor es una computadora funcionando 24/7 conectada a internet en cualquier parte del mundo con una ip publica única XXX.XXX.XXX.XXX. Para un humano sería muy difícil recordar tantos números, para esto es necesario un dominio, este es un nombre que compramos para asignar a nuestra dirección IP y de esta manera cualquier persona logre recordar.</Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>Su proveedor de dominio es: {"\n"}
                dominio: calisteniabolivia.com{"\n"}
                URL: namecheap.com{"\n"}
                usuario: joseparada{"\n"}
                email: hostingcalistenia@gmail.com{"\n"}
                contraseña: calistenia2020{"\n"}
              </Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>Ahora que ya contamos con el dominio lo siguiente es encontrar el servidor en el cual se encuentra alojado el sistema.</Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>Su sistema está alojado en un servidor hosting con cpanel, cpanel es una interfaz amigable para que los usuarios puedan realizar tareas den manera más sencilla sobre el servidor. A continuación la manera de ingresar a su servidor:</Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>en su servidor se encuentran configurados los siguientes servicios:{"\n"}
                Servicio de correos{"\n"}
                Sistema java Web{"\n"}
                Base de datos Mysql{"\n"}
              </Text>
              <Text style={{
                color: "#ddd",
                textAlign: "justify",
                marginTop: 16,
              }}>Una vez logramos ingresar a su servidor, inmediatamente realizamos una replica de seguridad en los servidores de Servisofts, en estos momentos tenemos su base de datos, su codigo y su sistema funcionando de manera paralela bajo los servidores Servisofts.
              </Text>

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
export default connect(initStates)(AseguramientoPage);