import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Svg from '../../../Svg';
import SSCrollView from '../../../Component/SScrollView';
import AppParams from '../../../Params';
import { SView } from '../../../SComponent';
export default class MenuModulos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItems = () => {

        var pages = SSRolesPermisosGetPages();
        // var pages = {
        //     as: {
        //         url: "UsuarioPage",
        //         key: "as",
        //         descripcion: "Usuario Page"
        //     }
        // }
        if (!pages) {
            return <View />
        }
        return Object.keys(pages).map((key) => {
            var obj = pages[key];
            // console.log(obj)
            if (!obj.is_page) {
                return <View />
            }
            var urlImage = AppParams.servicios["roles_permisos"] + "page/" + obj.key;
            if (!SSRolesPermisosValidate({ page: obj.url, permiso: "ver" })) {
                return <View />
            }
            return (<TouchableOpacity style={{
                width: 110,
                height: 110,
                margin: 4,
                alignItems: "center",
                justifyContent: "center"
            }} onPress={() => {
                if (obj.url) {
                    // console.log(obj)
                    this.props.navigation.navigate(obj.url);
                }
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 16,
                    overflow: "hidden",
                    width: 92,
                    height: 92,
                }}>
                    {this.props.state.imageReducer.getImage(urlImage, {
                        resizeMode: "cover",
                        objectFit: "cover"
                    })}
                </View>
                <View style={{
                    height: 22,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 12,
                        textAlign: "center",
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
            <SView props={{
                col: "xs-12",
                direction: "row",
                variant: "center"
            }}>
                {this.getItems()}
            </SView>
        );
    }
}
