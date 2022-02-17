import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import TouchableDouble from '../../../../Component/TouchableDouble';
import AppParams from '../../../../Params';
import FilePreview from '../../FilePreview';
import moment from 'moment';
import 'moment/locale/es';
moment.locale("es")
type type = {
    data: Object,
    background: String
}
export default class IntemLista extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {
            scale: this.props.scale,
            isSelec: false,
            isEdit: false,
        };
    }
    verPerfil = () => {
        this.props.navigation.navigate("FilePerfil", this.props.data);
    }
    setSelect(select) {
        this.setState({ isSelec: select, isEdit: false })
    }
    onPress = () => {
        if (!this.state.isSelec) {
            if (this.props.onSelect) this.props.onSelect(this.props.data.key)
            this.setState({ isSelec: true });
            return;
        }
        if (!this.state.isEdit) {
            this.setState({ isSelec: true, isEdit: true });
        }
    }
    getName() {
        if (this.state.isEdit) {
            return (
                <TextInput style={{
                    width: "100%",
                    fontSize: 10 * this.state.scale,
                    padding: 0,
                    margin: 0,
                    paddingTop: (Platform.OS == "web" ? 9 * this.state.scale : 0),
                    // flex: 1,
                    // height: 100,
                    // height: "100%",
                    // textAlign: "center",
                    // justifyContent: "center",
                    color: "#fff",
                    // backgroundColor: "transparent"
                    // backgroundColor: "#000"
                }}

                    onBlur={() => {
                        if (this.state.isEdit) {
                            if (this.newName && this.newName != this.props.data.descripcion) {
                                this.props.data.descripcion = this.newName;
                                this.props.editarNombre(this.props.data);
                            }
                        }
                    }}
                    selectTextOnFocus={true}
                    multiline={true}
                    numberOfLines={5}
                    autoFocus={true}
                    defaultValue={this.props.data.descripcion}
                    onChangeText={(text) => {
                        this.newName = text;
                    }}
                />
            )
        } else {
            var text = this.props.data.descripcion;
            if (!this.state.isSelec) {
                text = text.substring(0, 20);
            }
            return (
                <Text style={{
                    color: "#fff",
                    fontSize: 10 * this.state.scale,
                }}
                // onPress={(evt) => {
                //     if (this.state.isSelec) {
                //         this.setState({ isEdit: true });
                //     } else {
                //         this.onPress();
                //     }
                // }}
                >{text}</Text>
            )
        }

    }
    getFecha() {
        if (!this.props.data.fecha_on) {
            return "";
        }
        if (this.props.data.fecha_on == "now()") {
            this.props.data.fecha_on = new Date();
        }
        var fecha = moment(this.props.data.fecha_on);
        var fm = moment(fecha);
        return fm.fromNow()
    }
    getTamano() {
        var size = "--";
        if (this.props.data.tamano > 0) {
            var byte = this.props.data.tamano;
            var kbyte = byte / 1024;
            var Mg = kbyte / 1024;
            var Gb = Mg / 1024;

            if (Gb > 1) {
                size = Gb.toFixed(1) + " GB"
            } else if (Mg > 1) {
                size = Mg.toFixed(1) + " MB"
            } else if (kbyte > 1) {
                size = kbyte.toFixed(0) + " KB"
            } else if (byte > 1) {
                size = byte + " B"
            }

        }
        return size;
    }
    getItems() {
        var header = this.props.header;
        // if (!header) {
        return Object.keys(header).map((key) => {
            var obj = header[key];
            var text = "";
            switch (key) {
                case "descripcion":
                    text = this.getName()
                    break;
                case "fecha_on":
                    text = <Text style={{
                        color: "#bbb",
                        fontSize: 6 * this.state.scale,
                        // textAlign: "center"
                    }}> {this.getFecha()}</Text>
                    break;
                case "tamano":
                    text = <Text style={{
                        color: "#bbb",
                        fontSize: 6 * this.state.scale,
                        // textAlign: "center"
                    }}> {this.getTamano()}</Text>
                    break;
            }
            return (<View style={{
                flex: obj.flex,
                height: "100%",
                padding: 0,
                margin: 0,
                justifyContent: "center",
            }}>
                {text}
            </View >)
        })
        // }
        // return <View />
    }
    render() {
        var data = this.props.data;
        return (
            <View style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                // paddingTop: 4,
                paddingRight: 8,
                paddingLeft: 8,

            }}>
                <TouchableDouble style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 30 * this.state.scale,
                    backgroundColor: (this.state.isSelec ? "#4444ff88" : this.props.background),
                    borderRadius: 5 * this.state.scale,
                    alignItems: "center",
                    paddingStart: 10 * this.state.scale,
                }} onSinglePress={() => {
                    this.onPress()
                }} onDoublePress={() => {
                    // alert(this.props.obj.tipo)
                    if (this.props.data.tipo == 0) {
                        this.props.moveFolder(this.props.data);
                    } else {
                        this.props.navigation.navigate("DescargaPage", this.props.data)
                    }
                }}
                    onLongPress={() => {
                        this.verPerfil()
                    }}>
                    <View style={{
                        width: 25 * this.state.scale,
                        height: 25 * this.state.scale,
                        padding: 5 * this.state.scale,
                    }}>
                        <FilePreview src={AppParams.urlImages + data.key} obj={data} />
                    </View>

                    {this.getItems()}
                </TouchableDouble>

            </View>
        );
    }
}
