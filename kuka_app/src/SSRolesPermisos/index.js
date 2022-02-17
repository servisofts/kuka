import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import AppParams from "../Params";
let INSTANCE = false;
const delay = ms => new Promise(res => setTimeout(res, ms));

export const SSRolesPermisosValidate = ({ page, permiso, isAlert }) => {
    var isValid = INSTANCE.isValid({ page, permiso });
    if (isAlert && !isValid) {
        alert("No tiene permisos. Contactese con el administrador.")
    }
    return isValid;
}

export const SSRolesPermisosGetPages = () => {
    if(!INSTANCE){
        return null;
    }
    return INSTANCE.getPages();
}

class SSRolesPermisos extends Component {
    constructor(props) {
        super(props);
    }
    getPages() {
        return this.permisos;
    }
    isValid({ page, permiso }) {
        // console.log("ENTRO IS VALID")
        var roles = this.props.state.usuarioRolReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!roles) {
            return false;
        }
        if(roles["01726154-c439-4d63-99a1-0615d9e15f15"]){
            return true;
        }

        if (!this.permisos) return false;
        var isValid = false;
        // console.log(this.permisos);
        // console.log(this.permisos[page]);
        if (!this.permisos[page]) {
            return false;
        }
        if (!this.permisos[page].permisos[permiso]) {
            return false;
        }
        // Object.keys(this.permisos).map((key) => {
        //     var obj = this.permisos[key];
        //     console.log(key);
        // })
        return true;
    }
    getPermisos = async () => {
        // await delay(2000);
        var object = {
            component: "usuarioPage",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    getMisRoles = async () => {
        // await delay(2000);
        var object = {
            component: "usuarioRol",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    render() {
        if (!this.props.state.socketReducer.session[AppParams.socket.name]) {
            return <View />
        }
        INSTANCE = this;
        if (!this.props.state.usuarioReducer.usuarioLog) {
            return <View />
        }
        var permisos = this.props.state.usuarioPageReducer.data;
        if (!permisos) {
            if (this.props.state.usuarioPageReducer.estado == "cargando") {
                console.log("CARGANDO PAGINAS")
                return <View />
            }
            if (this.props.state.usuarioPageReducer.estado == "error") {
                alert("error");
                return <View />
            }
            this.getPermisos();
            return <View />
        }
        this.permisos = permisos;

        var roles = this.props.state.usuarioRolReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!roles) {
            if (this.props.state.usuarioRolReducer.estado == "cargando") {
                console.log("CARGANDO ROLES DE USUARIOS")
                return <View />
            }
            this.getMisRoles();
            return <View />
        }
        return <View />
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SSRolesPermisos);
