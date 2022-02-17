import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import buttons from './data.json';
import * as SSStorage from '../../../SSStorage';
import Params from '../../../Params';
import AppParams from '../../../Params';
const NaviDrawerContent = (props) => {

    const getListaPaginas = () => {
        var permisos = props.state.usuarioPageReducer.data;
        if (!permisos) {
            if (props.state.usuarioPageReducer.estado == "cargando") {
                return <View />;
            }
            var object = {
                component: "usuarioPage",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            }
            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />;
        }

        return Object.keys(permisos).map((key) => {
            var obj = permisos[key];
            return getItem(obj);
        })
    }

    const getLista = () => {
        return buttons.map((obj, key) => {
            return getItem(obj);
        })
    }
    const getItem = (obj) => {
        return (
            <TouchableOpacity onPress={() => {
                if (obj.url) {
                    props.navigation.navigate(obj.url);
                }
                if (obj.event) {
                    switch (obj.event) {
                        case "salir":
                            props.state.usuarioReducer.usuarioCargado = false;
                            SSStorage.removeItem(Params.storage.urlLog);
                            props.navigation.replace("CargaPage");
                            break;
                    }
                }
            }}>
                <View style={{
                    padding: 4,
                    // borderBottomWidth: 2,
                    borderColor: "#eee",
                    minHeight: 50,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#999",
                        ...obj.styleText

                    }}>{obj.descripcion}</Text>
                    {/* <Text style={{
                        fontSize: 10,
                        color: "#999",
                    }}>{JSON.stringify(obj.permisos)}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <ScrollView style={{
            flex: 1,
            width: "100%",
            height: "100%",
            elevation: 100,
        }}>
            <View style={{
                width: "100%",
                height: 160,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <View style={{
                    width: 130,
                    height: 130,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: "#dddddd44"
                }}>

                </View>
            </View>
            {getLista()}

            {/* {getListaPaginas()} */}
            <View style={{
                width: "100%",
                height: 40,
            }}></View>

            {getItem({
                "descripcion": "Salir",
                "event": "salir",
                "styleText": {
                    "color": "#600",
                    "fontSize": 12,
                    "fontWeight": ""
                }
            })}
            <View style={{
                width: "100%",
                height: 200,
            }}></View>

        </ScrollView>
    );
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NaviDrawerContent);