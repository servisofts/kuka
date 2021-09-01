import React from 'react';
import { Platform, Text } from 'react-native';
import Logo from '../img/logo.svg';
import LogoB from '../img/logoblanco.svg';
import See from '../img/see.svg';
import Folder from '../img/ssfolder.svg';
import EPUndefined from '../img/extensionPack/undefined.svg';
import Usuarios from '../img/usuarios.svg';
import Ajustes from '../img/ajustes.svg';
import Finanza from '../img/finansa.svg';
import Ssmenu from '../img/ssmenu.svg';
import Boxeo from '../img/boxeo.svg';
import Bar from '../img/bar.svg';
import Carrito from '../img/carrito.svg';
import Basedatos from '../img/basedatos.svg';
import Asegurado from '../img/asegurado.svg';
import Codigo from '../img/codigo.svg';
import Server from '../img/server.svg';
import Santiguo from '../img/santiguo.svg';
import Login from '../img/login.svg';
import Add from '../img/add.svg';
import Delete from '../img/delete.svg';
import Editar from '../img/Editar.svg';
import NoDelete from '../img/noDelete.svg';
import Cerrar from '../img/cerrar.svg';

import Card from '../img/card.svg';
import Cheque from '../img/cheque.svg';
import Qr from '../img/qr.svg';
import Money from '../img/money.svg';


import Arrg from '../img/arrg.svg';
import Arrr from '../img/arrr.svg';

import Caja from '../img/caja.svg';
import Paquete from '../img/paquete.svg';

type typeName = "logo"
    | "logoBlanco"
    | "see"
    | "folder"
    | "EPUndefined"
    | "Usuarios"
    | "Ajustes"
    | "Finanza"
    | "Ssmenu"
    | "Boxeo"
    | "Bar"
    | "Carrito"
    | "BaseDatos"
    | "Asegurado"
    | "Codigo"
    | "Server"
    | "Santiguo"
    | "Login"
    | "Add"
    | "Delete"
    | "noDelete"
    | "Editar"
    | "car"
    | "cheque"
    | "qr"
    | "money"
    | "arrg"
    | "arrr"
    | "caja"
    | "paquete"


type svgProps = {
    name: typeName,
    resource: String
}
const Svg = (props: svgProps) => {

    if (props.resource) {
        return (Platform.OS == "web" ? <img style={props.style} src={props.resource.default} /> : <props.resource.default style={props.style} />);
    }
    switch (props.name) {
        case "logo":
            return (Platform.OS == "web" ? <img style={props.style} src={Logo} /> : <Logo style={props.style} />);
        case "logoBlanco":
            return (Platform.OS == "web" ? <img style={props.style} src={LogoB} /> : <LogoB style={props.style} />);
        case "see":
            return (Platform.OS == "web" ? <img style={props.style} src={See} /> : <See style={props.style} />);
        case "folder":
            return (Platform.OS == "web" ? <img style={props.style} src={Folder} /> : <Folder style={props.style} />);
        case "EPUndefined":
            return (Platform.OS == "web" ? <img style={props.style} src={EPUndefined} /> : <EPUndefined style={props.style} />);
        case "Usuarios":
            return (Platform.OS == "web" ? <img style={props.style} src={Usuarios} /> : <Usuarios style={props.style} />);
        case "Ajustes":
            return (Platform.OS == "web" ? <img style={props.style} src={Ajustes} /> : <Ajustes style={props.style} />);
        case "Finanza":
            return (Platform.OS == "web" ? <img style={props.style} src={Finanza} /> : <Finanza style={props.style} />);
        case "Ssmenu":
            return (Platform.OS == "web" ? <img style={props.style} src={Ssmenu} /> : <Ssmenu style={props.style} />);
        case "Boxeo":
            return (Platform.OS == "web" ? <img style={props.style} src={Boxeo} /> : <Boxeo style={props.style} />);
        case "Bar":
            return (Platform.OS == "web" ? <img style={props.style} src={Bar} /> : <Bar style={props.style} />);
        case "Carrito":
            return (Platform.OS == "web" ? <img style={props.style} src={Carrito} /> : <Carrito style={props.style} />);
        case "BaseDatos":
            return (Platform.OS == "web" ? <img style={props.style} src={Basedatos} /> : <Basedatos style={props.style} />);
        case "Asegurado":
            return (Platform.OS == "web" ? <img style={props.style} src={Asegurado} /> : <Asegurado style={props.style} />);
        case "Codigo":
            return (Platform.OS == "web" ? <img style={props.style} src={Codigo} /> : <Codigo style={props.style} />);
        case "Server":
            return (Platform.OS == "web" ? <img style={props.style} src={Server} /> : <Server style={props.style} />);
        case "Santiguo":
            return (Platform.OS == "web" ? <img style={props.style} src={Santiguo} /> : <Santiguo style={props.style} />);
        case "Login":
            return (Platform.OS == "web" ? <img style={props.style} src={Login} /> : <Login style={props.style} />);
        case "Add":
            return (Platform.OS == "web" ? <img style={props.style} src={Add} /> : <Add style={props.style} />);
        case "Delete":
            return (Platform.OS == "web" ? <img style={props.style} src={Delete} /> : <Delete style={props.style} />);
        case "noDelete":
            return (Platform.OS == "web" ? <img style={props.style} src={NoDelete} /> : <NoDelete style={props.style} />);
        case "Editar":
            return (Platform.OS == "web" ? <img style={props.style} src={Editar} /> : <Editar style={props.style} />);
        case "Cerrar":
            return (Platform.OS == "web" ? <img style={props.style} src={Cerrar} /> : <Cerrar style={props.style} />);
        case "card":
            return (Platform.OS == "web" ? <img style={props.style} src={Card} /> : <Card style={props.style} />);
        case "cheque":
            return (Platform.OS == "web" ? <img style={props.style} src={Cheque} /> : <Cheque style={props.style} />);
        case "qr":
            return (Platform.OS == "web" ? <img style={props.style} src={Qr} /> : <Qr style={props.style} />);
        case "money":
            return (Platform.OS == "web" ? <img style={props.style} src={Money} /> : <Money style={props.style} />);
        case "arrg":
            return (Platform.OS == "web" ? <img style={props.style} src={Arrg} /> : <Arrg style={props.style} />);
        case "arrr":
            return (Platform.OS == "web" ? <img style={props.style} src={Arrr} /> : <Arrr style={props.style} />);
        case "Caja":
            return (Platform.OS == "web" ? <img style={props.style} src={Caja} /> : <Caja style={props.style} />);
        case "Paquete":
            return (Platform.OS == "web" ? <img style={props.style} src={Paquete} /> : <Paquete style={props.style} />);
        default: return <Text>Not Found</Text>
    }
}

Svg.propsType = {
    name: String,
    resource: Object,
}

export default Svg;