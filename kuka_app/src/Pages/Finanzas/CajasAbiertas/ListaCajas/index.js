import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { SView, SScrollView2, SText } from '../../../../SComponent';
import { connect } from 'react-redux';
import AppParams from '../../../../Params/index';
import SOrdenador from '../../../../Component/SOrdenador/index';
import MovimientosGraphic from './MovimientosGraphic';
import SDate from '../../../../SComponent/SDate/index';

class ListaCajas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.anim = new Animated.Value(0);
    }
    componentDidMount() {
        this.startAnimated();
    }
    startAnimated() {
        Animated.loop(
            Animated.timing(this.anim, {
                toValue: 1,
                delay: 0,
                duration: 1000,
            }),
            { iterations: 6 },
        ).start();
    }
    getSucursal(key_sucursal) {
        var data = this.props.state.sucursalReducer.data;
        if (!data) {
            if (this.props.state.sucursalReducer.estado == "cargando") {
                return false;
            }
            var object = {
                component: "sucursal",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return false;
        }
        return data[key_sucursal];
    }
    getUsuarios(key_usuario) {
        if (this.props.state.usuarioReducer.data["registro_administrador"]) {
            var data = this.props.state.usuarioReducer.data["registro_administrador"]
            if (data[key_usuario]) {
                return data[key_usuario];
            }
        }
        if (this.props.state.usuarioReducer.estado == "cargando") return {};
        var object = {
            component: "usuario",
            version: "2.0",
            type: "getAll",
            estado: "cargando",
            cabecera: "registro_administrador",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return {};
    }
    getMovimientos(key_caja) {
        var reducer = this.props.state["cajaMovimientoReducer"];
        var data = reducer["activas"];
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "cajaMovimiento",
                type: "getAllActivas",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return false;
        }
        return reducer["data"][key_caja];
    }
    getLista() {
        var reducer = this.props.state["cajaReducer"];
        var data = reducer["activas"];
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "caja",
                type: "getActivas",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return false;
        }
        return reducer["usuario"];
    }
    getFoto(sucursal) {
        return <View style={{
            width: 40,
            height: 40,
            marginRight: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ff999933",
            borderRadius: 100,
            overflow: "hidden"
        }}>
            {this.props.state.imageReducer.getImage(AppParams.urlImages + "sucursal_" + sucursal.key, {
                width: "100%",
                objectFit: "cover",
                resizeMode: "cover",

            })}
        </View>
    }

    getMovimientosItem(movimientos) {
        var total = 0;
        return new SOrdenador([{ key: "fecha_on", order: "asc", peso: 1 }]).ordernarObject(movimientos).map((key) => {
            total += movimientos[key].monto;
            return (
                <SView key={key} style={{
                    width: 70,
                    height: 50,
                    backgroundColor: "#f0f",
                }}>
                    <SText style={{ textTransform: "capitalize" }}>{total} - </SText>
                </SView>
            )
        })
    }
    getItems() {
        var lista = this.getLista();
        if (!lista) return <ActivityIndicator color={"#fff"} />;
        return Object.keys(lista).map((key) => {
            var obj = lista[key];
            if (!key) return <View />
            if (!obj) return <View />
            if (!obj.key_usuario) return <View />
            var usuario = this.getUsuarios(obj.key_usuario);
            usuario.key = obj.key_usuario;
            var movimientos = this.getMovimientos(obj.key);
            var total = 0;
            if (movimientos) {
                Object.keys(movimientos).map((key) => {
                    total += movimientos[key].monto;
                })
            }
            var sucursal = this.getSucursal(obj.key_sucursal);
            if (total % 1 > 0) total = total.toFixed(2);
            return <SView key={key}
                col={"xs-11"}
                style={{
                    borderRadius: 4,
                    height: 140,
                    backgroundColor: "#66000044",
                    marginTop: 8,
                    padding: 4,
                }}>
                <SView animated col={"xs-12"}
                    style={{
                        backgroundColor: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["#ffffff09", "#ffffff00"],
                        }),
                    }}
                    row onPress={() => {
                        this.props.navigation.navigate("DetalleCaja", { key: obj.key });
                    }}>
                    {this.getFoto(sucursal)}
                    <SView flex>
                        <SText style={{ fontSize: 14 }}>{sucursal.descripcion}</SText>
                        <SText style={{
                            textTransform: "lowercase",
                            fontSize: 10,
                            color: "#999"
                        }}>{usuario.Nombres} {usuario.Apellidos}</SText>
                        <SText style={{ fontSize: 10, color: "#999" }}>{new SDate(obj.fecha_on).toString("yyyy-MM-dd hh:mm")}</SText>
                    </SView>
                    <SView center style={{
                        height: 35,
                    }}>
                        <SText style={{ fontSize: 14 }}>Bs. {total}</SText>
                    </SView>
                </SView>

                <SView col={"xs-12"} style={{
                    flex: 1,
                }}>
                    <MovimientosGraphic data={movimientos} />
                </SView>

            </SView >
        })
    }
    render() {
        return (
            <SView props={{
                col: "xs-12",
            }} style={{
                flex: 1,
            }}>
                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView props={{
                        col: "xs-12",
                        variant: "center"
                    }}>
                        {this.getItems()}
                    </SView>
                    <SView col={"xs-12"} style={{
                        height: 200,
                    }}>

                    </SView>
                </SScrollView2>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaCajas);
