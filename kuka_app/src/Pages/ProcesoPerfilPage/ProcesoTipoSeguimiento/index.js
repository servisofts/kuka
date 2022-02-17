import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SFechaFormat } from '../../../Component/SFecha';
import SImageFetch from '../../../Component/SImageFetch';
import SOrdenador from '../../../Component/SOrdenador';
import SSwipeList from '../../../Component/SSwipeList';
import AppParams from '../../../Params';
class ProcesoTipoSeguimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        var object = {
            component: "tipoSeguimiento",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    getLista() {
        var data = this.props.state.tipoSeguimientoReducer.data;
        if (!data) {
            if (this.props.state.tipoSeguimientoReducer.estado == "cargando") {
                return <ActivityIndicator color={"#fff"} />
            }
            if (this.props.state.tipoSeguimientoReducer.estado == "error") {
                return <ActivityIndicator color={"#fff"} />
            }
            var object = {
                component: "tipoSeguimiento",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <ActivityIndicator color={"#Fff"} />
        }
        // return new SOrdenador({ data: data }).ordernarObject([
        //     { key: "tipo", order: "asc" }
        // ]).map((key) => {
        var obj = data[this.props.data.key_tipo_seguimiento];
        if (obj.estado == 0) {
            return false;
        }
        return <View style={{
            // flex:1,
            width: "100%",
            // minHeight: 600 * i / 5,
            // height: 130,
            padding: 10,
        }} obj={obj}>
            <View style={{
                flex: 1,
                // width: "100%",
                // height: "100%",
                backgroundColor: "#66000033",
                borderRadius: 8,
                overflow: "hidden",
            }}>
                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // flexDirection: "row",
                }}>
                    <View style={{
                        width: "100%",
                        height: 30,
                        // borderRadius: 8,
                        overflow: "hidden",
                        backgroundColor: obj.color + "66",
                        justifyContent: "center",
                        alignItems: "center",
                        // borderWidth: 1,
                        // borderColor: "#666"
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: "#666",
                            marginStart: 10,
                        }}>{obj.descripcion}</Text>
                    </View>

                    {/* <View style={{
                            flex: 1,
                            // backgroundColor: "#f0f",
                            // height: 40,
                            // justifyContent:"center"
                        }}>



                        </View> */}

                </View>
                <View style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 30,
                    height: 30,
                    // borderRadius: 100,
                    borderTopLeftRadius: 8,
                    backgroundColor: (obj.tipo == 0 ? "#66000044" : "#00660044"),
                }}>

                </View>

            </View>
        </View>
        // })
    }
    render() {
        if (this.props.state.tipoSeguimientoReducer.estado == "exito" && this.props.state.tipoSeguimientoReducer.type == "editar") {
            this.props.state.tipoSeguimientoReducer.estado = "";
            this.setState({ ...this.state });
            return <ActivityIndicator color={"#fff"} />
        }
        return (this.getLista());
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesoTipoSeguimiento);