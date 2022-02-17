import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import * as SImageImput from '../SImageImput';
class FotoPerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usuario = this.props.usuario;
        return (<TouchableOpacity style={{
            width: "90%",
            height: "90%",
            backgroundColor: "#ff999933",
            borderRadius: 8,
            overflow: "hidden",
        }} onPress={() => {
            if (this.props.disable) {
                return;
            }
            SImageImput.choseFile({
                servicio: AppParams.socket.name,
                component: "usuario",
                type: "subirFoto",
                estado: "cargando",
                key: usuario.key,
                key_usuario: usuario.key,
            }, (resp) => {
                this.props.dispatch({
                    component: "image",
                    type: "cambio",
                    url: AppParams.urlImages + "usuario_" + usuario.key,
                })
                // this.state.repaint = new Date().getTime()
                // this.setState({ ...this.state });
            });
        }}>
            {/* {"foto"} */}
            {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + usuario.key, {
                width: "100%",
                height: "100%",
            })}

        </TouchableOpacity>
        )
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FotoPerfilUsuario);
