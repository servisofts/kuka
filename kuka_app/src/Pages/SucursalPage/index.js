import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../SSNavigation'
import ActionButtom from '../../Component/ActionButtom';
import AppParams from '../../Params';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SSCrollView from '../../Component/SScrollView';
import FloatButtom from '../../Component/FloatButtom';
import SOrdenador from '../../Component/SOrdenador';
import Buscador from '../../Component/Buscador';
class SucursalPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                curPage: 1,
            }
        };
        SSNavigation.setProps(props);

    }
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
        this.onSelect = this.props.navigation.getParam("onSelect");
        const getLista = () => {
            var data = this.props.state.sucursalReducer.data;
            if (!data) {
                if (this.props.state.sucursalReducer.estado == "cargando") {
                    return <Text>Cargando</Text>
                }
                var object = {
                    component: "sucursal",
                    type: "getAll",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                return <View />
            }

            if (!this.state.buscador) {
                return <View />
            }
            // console.log(clientes);
            // var dto = data;
            // console.log("REPINTO===")
            return this.pagination(
                new SOrdenador([
                    { key: "Peso", order: "desc", peso: 4 },
                    { key: "Descripcion", order: "asc", peso: 2 },
                ]).ordernarObject(
                    this.state.buscador.buscar(data)
                )
            ).map((key) => {
                var obj = data[key];
                return <TouchableOpacity style={{
                    width: "90%",
                    maxWidth: 600,
                    height: 50,
                    margin: 4,
                    borderRadius: 10,
                    backgroundColor: "#66000044"
                }} onPress={() => {
                    if (this.onSelect) {
                        this.onSelect(obj);
                        this.props.navigation.goBack();
                        return;
                    }
                    this.props.navigation.navigate("SucursalRegistroPage", {
                        key: key
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
                                {this.props.state.imageReducer.getImage(AppParams.urlImages + "sucursal_" + key, {
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
                                    textTransform: "capitalize"
                                }}>{obj["descripcion"] + " "}</Text>
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
                <BarraSuperior title={"Sucursales"} navigation={this.props.navigation} goBack={() => {
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
                            // console.log(evn);
                            var heigth = evn.contentSize.height;
                            if (heigth - posy <= 0) {
                                this.state.pagination.curPage += 1;
                                // console.log(this.state.pagination.curPage);
                                this.setState({ ...this.state })
                            }
                        }}
                    >
                        {getLista()}
                    </SSCrollView>
                    <FloatButtom esconder={this.onSelect} onPress={() => {
                        this.props.navigation.navigate("SucursalRegistroPage")
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
export default connect(initStates)(SucursalPage);