import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../../Component/BackgroundImage';
import DropFileView, { uploadHttp } from '../../../Component/DropFileView';
import SOrdenador from '../../../Component/SOrdenador';
import { getFilesInPath } from '../../../FileFunction';
import AppParams from '../../../Params';
import IntemLista from './IntemLista';

class VistaLista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: {
                descripcion: {
                    title: "Nombre",
                    flex: 4,
                    order: false
                },
                fecha_on: {
                    title: "Creacion",
                    flex: 1.5,
                    order: false
                },
                tamano: {
                    title: "Size",
                    flex: 1,
                    order: false
                }
            },
            scale: this.props.scaleGlobal + 0.5
        };
    }
    getHeader() {

        var Cabeceras = Object.keys(this.state.header).map((key) => {
            var obj = this.state.header[key];
            return (<View style={{
                flex: obj.flex,
                justifyContent: "center",
                alignItems: "center",
                // borderRightWidth: 1,
                borderColor: "#aaa",
                flexDirection: "row",
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }} onPress={() => {
                    if (!obj.order) {
                        this.state.header[key].order = "asc";
                    } else if (this.state.header[key].order == "asc") {
                        this.state.header[key].order = "desc";
                    } else {
                        this.state.header[key].order = false;
                    }
                    this.setState({ header: { ...this.state.header } });
                    // alert("change order " + obj.title)
                }}>
                    <Text style={{
                        flex: 1,
                        color: "#666",
                        fontSize: 10,
                    }}>{obj.title}</Text>
                    <Text style={{
                        color: "#666",
                        fontSize: 10,
                    }}>{obj.order ? (obj.order == "asc" ? "/\\" : "\\/") : ""}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 20,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    // marginRight:8,
                }}>
                    <View style={{
                        width: 2,
                        height: "100%",
                        backgroundColor: "#ddd",
                    }}>
                    </View>
                </TouchableOpacity>
            </View>
            )
        })

        return <View style={{
            width: "100%",
            height: 30,
            backgroundColor: "#f2f2f2",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            flexDirection: "row",
            overflow: "hidden",
            paddingStart: 20,
        }}>
            <View style={{
                width: 25 * this.state.scale,
                height: 25 * this.state.scale,
            }}>
            </View>

            {Cabeceras}
        </View>
    }
    getFiles() {
        var dataFinal = getFilesInPath(this.props);
        if (!dataFinal) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (Object.keys(dataFinal).length <= 0) {
            return <Text>Vacio</Text>
        }

        this._files = {};
        var ordenador = new SOrdenador({
            listaKeys: dataFinal
        })
        var ordenadores = [];
        Object.keys(this.state.header).map((key, i) => {
            var obj = this.state.header[key];
            if (obj.order) {
                ordenadores.push({
                    key: key, order: obj.order, peso: i
                })
            }

        })
        var arrKeys = ordenador.ordernarObject([
            { key: "tipo", order: "desc", peso: 3 },
            ...ordenadores
        ]);
        return arrKeys.map((key, i) => {
            return <IntemLista
                ref={(ref => { this._files[key] = ref })}
                scale={this.state.scale}
                header={this.state.header}
                data={dataFinal[key]}
                background={(i % 2 == 0 ? ("#000000" + (Platform.OS == "web" ? "22" : "44")) : ("#666666") + (Platform.OS == "web" ? "66" : "44"))}
                navigation={this.props.navigation}
                editarNombre={(obj) => {
                    this.editarNombre(obj);
                }}
                moveFolder={(obj) => {
                    this.props.dispatch({
                        component: "file",
                        type: "moveFolder",
                        data: obj,
                        estado: "cargando",
                    })

                }}
                onSelect={(key) => {
                    Object.keys(this._files).map((keyRef) => {
                        if (key == keyRef) {
                            return;
                        }
                        if (this._files[keyRef]) {
                            this._files[keyRef].setSelect(false)

                        }
                    })
                }}
            />
        })

    }

    editarNombre(obj) {
        var object = {
            component: "file",
            type: "editar",
            path: this.props.state.fileReducer.routes,
            data: obj,
            estado: "cargando",
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    render() {
        return (
            <View style={{
                width: "100%",
                flex: 1,
                padding: 0,
                margin: 0,
                // backgroundColor:"#221D20"//apple
                backgroundColor: "#000"
            }}>
                <BackgroundImage
                    source={this.props.bgimage}
                />
                {this.getHeader()}

                <TouchableOpacity style={{
                    width: "100%",
                    flex: 1,
                }}
                    activeOpacity={1}
                    onPress={() => {
                        Object.keys(this._files).map((keyRef) => {
                            if (this._files[keyRef]) {
                                this._files[keyRef].setSelect(false)
                            }

                        })
                    }}
                >
                    <ScrollView style={{
                        width: "100%",
                        height: 1,
                    }} contentContainerStyle={{
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}>
                        <TouchableWithoutFeedback style={{
                        }} onPress={() => { }}>
                            <DropFileView style={{
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                // backgroundColor: "#00000022",
                            }} onUpload={(files, position) => {
                                var pos = {
                                    x: position.x / this.state.scale,
                                    y: position.y / this.state.scale,
                                }
                                var arrPos = [];
                                for (let i = 0; i < files.files.length; i++) {
                                    arrPos.push({
                                        x: pos.x + (i * 10),
                                        y: pos.y + (i * 10)
                                    })
                                }
                                uploadHttp({
                                    props: {
                                        component: "file",
                                        type: "subir",
                                        estado: "cargando",
                                        path: this.props.state.fileReducer.routes,
                                        positions: arrPos
                                    }, imput: files,
                                }, (resp) => {

                                })
                            }}>
                                {this.getFiles()}

                            </DropFileView>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
            </View>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(VistaLista);