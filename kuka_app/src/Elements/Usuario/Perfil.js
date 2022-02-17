import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import { SText, SView } from '../../SComponent';
import Svg from '../../Svg';
import Actions from '../../Actions';

type Props = {
    key_usuario: string,
};
class index extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usr = Actions.Usuario.getByKey(this.props.key_usuario, this.props);
        if (!usr) return <ActivityIndicator />
        return <SView col={"xs-12"} style={{
            // height: 120,
            backgroundColor: "#66000066",
            // borderRadius: 4,
        }} center >
            <SView col={"xs-12"} row style={{
                height: 80,
            }} onPress={() => {
                this.props.navigation.navigate("UsuarioPerfilPage");
            }}>
                <SView style={{
                    width: 80,
                    height: "100%",
                }} center>
                    <SView style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        overflow: "hidden",
                    }}>
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + usr.key, {
                            width: "100%",
                            height: "100%",
                        })}
                    </SView>
                </SView>
                <SView flex style={{
                    height: "100%",
                    justifyContent: "center",
                    // borderBottomWidth: 1,
                    borderBottomColor: "#66666644",
                    paddingStart: 4,
                }}>
                    <SText style={{ fontSize: 18, fontWeight: "600", textTransform: "capitalize" }}>{`${usr.Nombres} ${usr.Apellidos}`}</SText>
                    <SText style={{ fontSize: 12, }}>{`${usr.Correo}`}</SText>
                </SView>
            </SView>
            {/* <SView col={"xs-12"}  center row style={{
                height: 50,
            }} onPress={() => {

            }}>
                <SView flex style={{
                    paddingStart: 8,
                }}>
                    <SText style={{
                        fontSize: 14,
                    }}>Ver ajustes de usuario</SText>
                </SView>
                <SView style={{
                    width: 60,
                    height: "100%",
                }} center>
                    <Svg name={"Login"} style={{
                        width: 25,
                        height: 25,
                    }} />
                </SView>
            </SView> */}
        </SView>
    }
}

export default connect((state) => {
    return { state }
})(index);