import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import STheme from '../../../STheme';

const ServicioDePaquete = (props) => {
    const [select, setSelect] = React.useState(false);
    let reducer = props.state.servicioReducer;
    let data = reducer.data;
    if (!data) {
        if (reducer.estado == "cargando") return <ActivityIndicator color={"#fff"} />
        if (reducer.estado == "error") return <Text>ERROR</Text>
        var object = {
            component: "servicio",
            type: "getAll",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return <View />
    }
    const getRoles = () => {
        let data_p = {};
        if (props.keyPaquete) {
            let reducer_p = props.state.paqueteServicioReducer;
            data_p = reducer_p.data[props.keyPaquete];
            // console.log(data_p);
            if (!data_p) {
                if (reducer_p.estado == "cargando") return <ActivityIndicator color={"#fff"} />
                if (reducer_p.estado == "error") return <Text>ERROR</Text>
                var object = {
                    component: "paqueteServicio",
                    type: "getAll",
                    estado: "cargando",
                    key_paquete: props.keyPaquete,
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                }
                props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                return <View />
            }
            if (!select) {
                setSelect(data_p);
                props.onChange(select);
            }

        } else {
            if (!select) {
                setSelect({});
            }
        }

        var Lista = Object.keys(data).map((key) => {
            var obj = data[key];
            var isActivo = false;
            if (select[key]) {
                isActivo = true;
            }

            return <TouchableOpacity style={{
                width: 160,
                height: 140,
                margin: 8,
                borderRadius: 10,
                borderWidth: 1,
                // borderColor: "#ffffff44",
                backgroundColor: STheme.color.card,
                // padding:4,

            }}
                onPress={() => {
                    if (props.keyPaquete) {
                        if (!select[key]) {
                            var object = {
                                component: "paqueteServicio",
                                type: "registro",
                                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                estado: "cargando",
                                data: {
                                    key_paquete: props.keyPaquete,
                                    key_servicio: key,
                                }
                            }
                            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        } else {
                            var object = {
                                component: "paqueteServicio",
                                type: "editar",
                                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                estado: "cargando",
                                data: { ...select[key], estado: 0 }
                            }
                            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        }
                    } else {
                        if (select[key]) {
                            delete select[key];
                        } else {
                            select[key] = obj;
                        }
                        setSelect({ ...select });
                        props.onChange(select);
                    }


                }}>
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        padding: 8,
                        // backgroundColor: "#ffffff11",
                        height: 120,
                        borderRadius: 8,
                        overflow: "hidden"
                    }}>
                        {props.state.imageReducer.getImage(AppParams.urlImages + "servicio_" + obj.key, {})}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: STheme.color.text
                        }}>{obj.descripcion}</Text>
                    </View>
                </View>
                {(isActivo ? <View /> : <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    backgroundColor: "#000000dd",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: "#ffffff",
                        fontWeight: "bold"
                    }}>Activar</Text>
                </View>)}
            </TouchableOpacity>
        })
        return <View style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
        }}>
            {Lista}
        </View>
    }

    return <View style={{
        marginTop: 16,
        width: "96%",
        maxWidth: 1080,
        borderRadius: 8,
        // padding: 8,
        minHeight: 220,
        marginBottom: 32,

    }}>
        <Text style={{
            padding: 8,
            fontSize: 12,
            color: "#999",
            width: "100%",
            textAlign: "center"
        }}>Servicios que incluye el paquete:</Text>
        {getRoles()}
    </View>
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ServicioDePaquete);