import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import SPopup from '../../Component/SPopup';
import FilePreview from '../CarpetasPage/FilePreview';
import Compartir from './Compartir';
import Seguimiento from './Seguimiento';
import Ventanas from '../../Component/Ventanas';

class FilePerfil extends Component {

    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            obj: props.navigation.state.params
        };

    }
    getTamanho() {
        if (this.state.obj.tamano) {
            var kbyte = this.state.obj.tamano / 1024
            var tamano_str = kbyte.toFixed(0) + " Kb";
            return tamano_str;
        }
        return "0 Kb";
    }
    render() {
        var Select = false;
        var path = this.props.state.fileReducer.routes;
        var data = this.props.state.fileReducer.data;
        if (path.length > 0) {

            path.map((dir, i) => {
                data = data[dir.key]
                if (data.data) {
                    data = data.data;
                }
                Select = data;
            })
            if (!Select) {
                return <View />
            }
        } else {
            Select = data;
        }
        var curObj = Select[this.state.obj.key];
        if (!curObj) {
            this.props.navigation.goBack();
            return <View />
        }


        return (
            <View style={{
                width: "100%",
                height: "100%",
            }}>
                <BarraSuperior duration={500} title={"Detalle"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <BackgroundImage source={require("../../img/fondos/color/1.jpg")} />
                    <View style={{
                        width: "90%",
                        borderRadius: 8,
                        height: "90%",
                        maxWidth: 500,
                        backgroundColor: "#ffffff44",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: "95%",
                            height: 130,
                            borderBottomWidth: 1,
                            borderColor: "#aaa",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row"
                        }}>
                            <View style={{
                                width: 100,
                                height: 100,
                            }}>
                                <FilePreview src={AppParams.urlImages + this.state.obj.key} obj={this.state.obj} />
                            </View>
                            <View style={{
                                flex: 1,
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                                // backgroundColor:"#000"
                            }}>
                                <View style={{
                                    width: "95%",
                                    flex: 1,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        flex: 5,
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        color: "#fff"
                                    }}>{this.state.obj.descripcion}</Text>
                                    <Text style={{
                                        flex: 2,
                                        fontSize: 14,
                                        textAlign: "right",
                                        color: "#eee"
                                    }}>{this.getTamanho()}</Text>
                                </View>
                                <View style={{
                                    width: "95%",
                                    flex: 1,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        width: "90%",
                                        fontSize: 12,
                                        color: "#bbb"
                                    }}>Creado: {new Date(this.state.obj.fecha_on).toLocaleDateString()} {new Date(this.state.obj.fecha_on).toLocaleTimeString()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            width: "95%",
                            height: 60,
                            borderBottomWidth: 1,
                            borderColor: "#aaa",
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 11,
                            }}>Acciones</Text>
                            <View style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: "row",
                            }}>
                                <TouchableOpacity style={{
                                    padding: 4,
                                }} onPress={() => {
                                    this._confirmarEliminar.setObj(this.state.obj)
                                }}>
                                    <Svg resource={require('../../img/delete.svg')} style={{
                                        width: 50,
                                        height: "100%",
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity

                                    style={{
                                        padding: 4,
                                    }} onPress={() => {
                                        this._compartir.setObj(this.state.obj)
                                    }}>
                                    <Svg resource={require('../../img/shareFolder.svg')} style={{
                                        width: 50,
                                        height: "100%",
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    padding: 4,
                                }} onPress={() => {
                                    this.props.navigation.navigate("DescargaPage", this.state.obj)
                                }}>
                                    <Svg resource={require('../../img/download.svg')} style={{
                                        width: 50,
                                        height: "100%",
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Ventanas ref={(ref) => { this.ventanas = ref }} default={"Seguimiento"} ventanas={{
                            Seguimiento: <Seguimiento file={curObj} />,
                            Usuarios: <Seguimiento file={curObj} />
                        }} />

                    </View>
                </View>
                <SPopup ref={(ref) => { this._confirmarEliminar = ref }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 16,
                        padding: 8,
                        textAlign: "center",
                        textAlignVertical: "center"
                    }}>Esta seguro que desea enviar a papelera?</Text>
                    <View style={{
                        width: "100%",
                        marginTop: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around"
                        // backgroundColor:"#fff"
                    }}>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 40,
                            borderRadius: 8,
                            backgroundColor: "#ff555588",
                            justifyContent: "center",
                            alignItems: "center"
                        }} onPress={() => {
                            var obj = { ...this.state.obj };
                            delete obj["data"];
                            obj.estado = 0;
                            this.props.state.socketReducer.session[AppParams.socket.name].send({
                                component: "file",
                                type: "editar",
                                data: obj,
                                tipo_seguimiento: "enviar_papelera",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                path: this.props.state.fileReducer.routes
                            }, true);
                            this._confirmarEliminar.setObj(false)
                        }}>
                            <Text style={{ color: "#fff" }}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 40,
                            borderRadius: 8,
                            backgroundColor: "#ffffff88",
                            justifyContent: "center",
                            alignItems: "center"
                        }} onPress={() => {
                            this._confirmarEliminar.setObj(false)
                        }}>
                            <Text style={{ color: "#fff" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </SPopup>
                <SPopup ref={(ref) => { this._compartir = ref }} style={{
                    width: "94%",
                    height: 400,
                }}>
                    <Compartir
                        file={curObj}
                        close={() => {
                            this._compartir.setObj(false);
                        }} />
                </SPopup>
            </View>
        );
    }
}


const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FilePerfil);