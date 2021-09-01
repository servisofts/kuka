import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SFechaFormat } from '../../../Component/SFecha';
import SImageFetch from '../../../Component/SImageFetch';
import SOrdenador from '../../../Component/SOrdenador';
import SSwipeList from '../../../Component/SSwipeList';
import AppParams from '../../../Params';
import Svg from '../../../Svg';
class ProcesoTipoSeguimiento extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.state = {
            select: false,
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
        var i = 0;
        return new SOrdenador({ data: data }).ordernarObject([
            { key: "tipo", order: "asc" }
        ]).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) {
                return false;
            }
            if (obj.tipo == 0 && this.data.key_usuario != this.props.state.usuarioReducer.usuarioLog.key) {
                return <View />
            }
            i++;

            var isSelect = obj.key == this.state.select;
            return <View style={{
                width: "50%",
                // minHeight: 600 * i / 5,
                // height: 130,
                padding: 10,
            }} obj={obj}>

                <TouchableOpacity style={{
                    flex: 1,
                    // width: "100%",
                    // height: "100%",
                    backgroundColor: "#66000033",
                    borderRadius: 8,
                    overflow: "hidden",
                }} onPress={() => {
                    this.setState({ select: obj.key })
                    this.props.onChange(obj);
                }}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        // flexDirection: "row",
                    }}>
                        <View style={{
                            width: "100%",
                            // height: 30,
                            // borderRadius: 8,
                            justifyContent: "center",
                            // alignItems: "center",
                            overflow: "hidden",
                            height: 30,
                            backgroundColor: obj.color + "99"
                            // borderWidth: 1,
                            // borderColor: "#666"
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: (!isSelect ? "#666" : "#fff"),
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
                        backgroundColor: (obj.tipo == 0 ? "#660000" : "#006600"),
                        opacity: !isSelect ? 0.2 : 1
                    }}>
                        {/* {!isSelect ? <View /> : <Svg name={"send"} style={{
                            width: 20,
                            height: 20,
                        }} />} */}
                    </View>

                </TouchableOpacity>
            </View>
        })
    }
    render() {
        if (this.props.state.tipoSeguimientoReducer.estado == "exito" && this.props.state.tipoSeguimientoReducer.type == "editar") {
            this.props.state.tipoSeguimientoReducer.estado = "";
            this.setState({ ...this.state });
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={{
                width: "90%",
                flex: 1,
                paddingBottom: 10,
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                // alignItems:"center"
            }}>
                <Text style={{
                    fontSize: 15,
                    color: "#666",
                    // marginStart: 10,
                    marginTop: 16,
                }}>Selecciona el tipo de seguimiento</Text>
                {this.getLista()}

            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesoTipoSeguimiento);