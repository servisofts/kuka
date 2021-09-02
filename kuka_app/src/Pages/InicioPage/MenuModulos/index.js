import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Svg from '../../../Svg';
import SSCrollView from '../../../Component/SScrollView';
import AppParams from '../../../Params';
import { SText, SView } from '../../../SComponent';
export default class MenuModulos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItems = () => {

        var pages = SSRolesPermisosGetPages();
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


            return (
                <SView col={"xs-3 md-2 xl-1"} props={{
                    variant: ["col-square", "center"]
                }} >
                    <SView style={{
                        width:"70%",
                        height:"70%",
                        borderRadius: 16,
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:"#44000044",
                        padding:2,
                    }} onPress={() => {
                        this.props.navigation.navigate(obj.url);
                    }}>
                        {this.props.state.imageReducer.getImage(urlImage, {
                            resizeMode: "cover",
                            objectFit: "cover"
                        })}
                    </SView>
                    <SView col={"xs-12"} flex style={{
                        alignItems: "center",
                        paddingTop: 4,
                    }}>
                        <SText style={{
                            textAlign: "center",
                        }}>{obj.descripcion}</SText>
                    </SView>
                </SView >
            )
        })

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
