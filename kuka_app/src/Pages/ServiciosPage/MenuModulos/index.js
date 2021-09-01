import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Svg from '../../../Svg';
import SSCrollView from '../../../Component/SScrollView';
import AppParams from '../../../Params';
export default class MenuModulos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItems = () => {
        let reducer = this.props.state.servicioReducer;
        let data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return <ActivityIndicator color={"#fff"} />
            if (reducer.estado == "error") return <Text>ERROR</Text>
            var object = {
                component: "servicio",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        // var pages = {
        //     as: {
        //         url: "UsuarioPage",
        //         key: "as",
        //         descripcion: "Usuario Page"
        //     }
        // }
        return Object.keys(data).map((key) => {
            var obj = data[key];
            // console.log(obj)
            var urlImage = AppParams.urlImages + "servicio_" + obj.key;
            // if (!SSRolesPermisosValidate({ page: obj.url, permiso: "ver" })) {
            //     return <View />
            // }
            return (<TouchableOpacity style={{
                width: 110,
                height: 110,
                margin: 4,
                alignItems: "center",
                justifyContent: "center"
            }} onPress={() => {
                // if (obj.url) {
                // console.log(obj)
                this.props.navigation.navigate("ServicioPerfilPage", {
                    key: key,
                });
                // }
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 16,
                    overflow: "hidden",
                    width: 92,
                    height: 92,
                    backgroundColor:"#ff999933"
                }}>
                    {this.props.state.imageReducer.getImage(urlImage, {
                        resizeMode: "cover",
                        objectFit: "cover"
                    })}
                </View>
                <View style={{
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                        textAlign:"center"
                    }}>{obj.descripcion}</Text>
                </View>

            </TouchableOpacity>)
        })
        // return [
        //     { descripcion: "RRHH", icon: "Usuarios", route: "RRHHPage" },
        //     { descripcion: "Usuarios", icon: "Usuarios", route: "UsuarioPage" },
        //     { descripcion: "Roles", icon: "Usuarios", route: "RolPage" },
        //     { descripcion: "Paginas", icon: "Usuarios", route: "PermisoPagePage" },
        //     { descripcion: "Servisofts", icon: "Ssmenu", route: "ServisoftsPage" },
        //     { descripcion: "Ajustes", icon: "Ajustes", route: "UsuarioPerfilPage" },
        // ].map((obj) => {

        // })

    }

    render() {
        return (
            <View style={{
                flexWrap: "wrap",
                flexDirection: "row",
            }}>
                {this.getItems()}
            </View>
        );
    }
}
