import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import EtapaMigracion from './EtapaMigracion';
import GraphicDB from './GraphicDB';
import Modulos from './Modulos';

class ServisoftsPage extends Component {
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
        width: "100%",
        height: "100%",
        alignItems: "center",
        position: "absolute"
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Servisofts"} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <ScrollView style={{
          width: "100%",
          flex: 1,
        }}>
          <View style={{
            width: "100%",
            // justifyContent: "center",
            paddingBottom: 40,
            alignItems: "center"
          }}>


            <View style={{
              flex: 1,
              width: "90%",
              maxWidth: 500,
              // justifyContent: "center",
              alignItems: "center"
            }}>
              <Svg name={"logoBlanco"} style={{
                width: "90%",
                height: 170,
              }} />
              <Text style={{
                color: "#fff",
                textAlign: "justify"
              }}>Somos una empresa de tecnológia especializada en análisis, diseño, desarrollo, implementación y mantenimiento de software y aplicaciones a medida.</Text>
              <TouchableOpacity style={{
                padding: 4,
              }} onPress={() => {
                this.props.navigation.navigate("LobyPage");
              }}>
                <Text style={{
                  color: "#669",
                  textAlign: "justify",
                  textDecorationLine: "underline"
                }}>servisofts.com</Text>
              </TouchableOpacity>
              <View style={{
                marginTop: 8,
                width: "100%",
                backgroundColor: "#999",
                height: 1,
              }}></View>
              <EtapaMigracion navigation={this.props.navigation} />
              <View style={{
                marginTop: 8,
                width: "100%",
                backgroundColor: "#999",
                height: 1,
              }}></View>
              <Modulos navigation={this.props.navigation} />

              <View style={{
                marginTop: 8,
                width: "100%",
                backgroundColor: "#999",
                height: 1,
              }}></View>
              <Text style={{
                marginTop: 16,
                color: "#999",
                fontSize: 12,
                textAlign: "justify"
              }}>Se llevo a cabo el proceso de analisis de la problematica que precenta la empresa Calistenia Bolivia .</Text>

              <View style={{
                marginTop: 16,
                width: "100%",
                borderRadius: 8,
                height: 200,
              }}>
                <GraphicDB />
              </View>
              <View style={{
                marginTop: 8,
                width: "100%",
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}>

                <TouchableOpacity style={{
                  width: 130,
                  height: 130,
                  margin: 4,
                }} onPress={() => {
                  this.props.navigation.navigate("AseguramientoPage");
                }}>
                  <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Svg name={"Asegurado"} style={{
                      width: "90%",
                      height: "90%",
                    }} />
                  </View>
                  <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Text style={{
                      color: "#ffffff",
                      fontSize: 14,
                      // fontFamily: "myFont"
                    }}>{"Aseguramiento"}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  width: 130,
                  height: 130,
                  margin: 4,
                }} onPress={() => {
                  this.props.navigation.navigate("BaseDatosPage");
                }}>
                  <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Svg name={"BaseDatos"} style={{
                      width: "90%",
                      height: "90%",
                    }} />
                  </View>
                  <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Text style={{
                      color: "#ffffff",
                      fontSize: 14,
                      // fontFamily: "myFont"
                    }}>{"Base de datos"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{
                marginTop: 8,
                width: "100%",
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}>
                <TouchableOpacity style={{
                  width: 130,
                  height: 130,
                  margin: 4,
                }} onPress={() => {
                  this.props.navigation.navigate("CodigoPage");
                }}>
                  <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Svg name={"Codigo"} style={{
                      width: "90%",
                      height: "90%",
                    }} />
                  </View>
                  <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Text style={{
                      color: "#ffffff",
                      fontSize: 14,
                      // fontFamily: "myFont"
                    }}>{"Codigo"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: 130,
                  height: 130,
                  margin: 4,
                }} onPress={() => {
                  this.props.navigation.navigate("ServidorPage");
                }}>
                  <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Svg name={"Server"} style={{
                      width: "90%",
                      height: "90%",
                    }} />
                  </View>
                  <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Text style={{
                      color: "#ffffff",
                      fontSize: 14,
                      // fontFamily: "myFont"
                    }}>{"Servidor"}</Text>
                  </View>
                </TouchableOpacity>
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
export default connect(initStates)(ServisoftsPage);