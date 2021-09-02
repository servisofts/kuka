import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SFechaFormat } from '../../../Component/SFecha';
import AppParams from '../../../Params';
import Svg from '../../../Svg';
import * as SImageImput from '../../../Component/SImageImput';
import STextImput from '../../../Component/STextImput';
import BTNEditar from '../../../Component/BTNEditar';

class ProcesoPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.data = props.data;
        this.imputs = {
            precio: new STextImput({
                placeholder: "00",
            })
        }
    }
    getProgeso() {
        return <View style={{
            width: "95%",
            height: 200,
            marginTop: 16,
            backgroundColor: "#99777711",
            borderRadius: 8,
            padding: 8,
        }}>
            <Text style={{
                color: "#ddd",
                marginTop: 8,
                fontSize: 12,
                fontWeight: "bold"
            }}>
                Progreso:
            </Text>
        </View>
    }
    getPrecio() {

        return <View style={{
            width: "95%",
            marginTop: 16,
            height: 100,
            backgroundColor: "#99777711",
            borderRadius: 8,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                color: "#ddd",
                // marginTop: 8,
                fontSize: 12,
                fontWeight: "bold"
            }}>
                Total:
            </Text>
            <View style={{
                width: 150,
                height: 50,
                backgroundColor: "#ffffff22",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <STextImput keyboardType={"numeric"} type={"Monto"} placeholder={"00"} style={{
                    width: "100%",
                    height: "100%",
                    color: "#ddd",
                    // borderW
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center"
                }} />
                <Text style={{
                    left: 20,
                    position: "absolute",
                    color: "#ddd",
                    fontSize: 20,
                    fontWeight: "bold",

                }}>
                    $
             </Text>
            </View>

        </View>
    }
    getFotoPerfil() {
        return (<View style={{
            width: "80%",
            marginTop: 16,
            maxWidth: 400,
            height: 300,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#66000022",
                borderRadius: 8,
                // overflow: "hidden",
            }} onPress={() => {
                if (this.data.key_usuario != this.props.state.usuarioReducer.usuarioLog.key) {
                    return false;
                }
                SImageImput.choseFile({
                    component: "proceso",
                    type: "subirFoto",
                    estado: "cargando",
                    key: this.data.key,
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key
                }, (resp) => {
                    this.props.dispatch({
                        component: "image",
                        type: "cambio",
                        url: AppParams.urlImages + "proceso_" + this.data.key,
                    })
                    // this.state.repaint = new Date().getTime()
                    // this.setState({ ...this.state });
                });
            }}>
                {/* {"foto"} */}
                {this.props.state.imageReducer.getImage(AppParams.urlImages + "proceso_" + this.data.key, {
                    width: "100%",
                    height: "100%",

                })}

            </TouchableOpacity>
            <TouchableOpacity style={{
                width: "100%",
                marginTop: 8,
                paddingTop: 8,
                alignItems: "center"
            }} onPress={() => {
                if (this.data.key_usuario != this.props.state.usuarioReducer.usuarioLog.key) {
                    return false;
                }
                this.props.navigation.navigate("ProcesoRegistroPage", {
                    data: this.data,
                    key: this.data.key
                });
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "bold"
                }}>
                    {this.data.descripcion}
                </Text>
                {/* <BTNEditar /> */}

                <Text style={{
                    color: "#666",
                    fontSize: 10,
                }}>
                    {SFechaFormat(this.data.fecha_on)}
                </Text>
                <Text style={{
                    color: "#fff",
                    marginTop: 8,
                    fontSize: 16,
                    fontWeight: "bold"
                }}>
                    {this.data.observacion}
                </Text>
            </TouchableOpacity>


        </View>)
    }
    getModulo() {
        return (<View style={{
            width: "95%",
            marginTop: 16,
            // maxWidth: 400,
            height: 80,
            // justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        }}>
            <View style={{
                width: 60,
                height: "100%",
                backgroundColor: "#66000022",
                borderRadius: 8,
                overflow: "hidden",
            }}>
                {/* {"foto"} */}
                {this.props.state.imageReducer.getImage(AppParams.urlImages + "modulo_" + this.modulo.key, {
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    objectFit: "cover",

                })}

            </View>
            <View style={{
                flex: 1,
                marginStart: 8,
            }}>

                <Text style={{
                    color: "#fff",
                    marginTop: 16,
                    fontSize: 18,
                    fontWeight: "bold"
                }}>
                    {this.modulo.descripcion}
                </Text>
                <Text style={{
                    color: "#666",
                    fontSize: 10,
                }}>
                    {SFechaFormat(this.modulo.fecha_on)}
                </Text>

            </View>


        </View>)
    }

    render() {
        this.modulo = this.props.state.moduloReducer.data[this.props.data.key_modulo];
        this.data = this.props.state.procesoReducer.data[this.props.data.key_modulo][this.props.data.key];
        return (
            <View style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
                // backgroundColor: "#f0f"
            }}>
                {this.getModulo()}
                {this.getFotoPerfil()}
                {/* {this.getPrecio()} */}


            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ProcesoPerfil);