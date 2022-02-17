import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg'
type tprops = {
    direccion: String,
}
class ListaAutoCompleteItem extends Component<tprops> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getDetail = () => {
        // this.setState({ dir: this.props.direccion })

        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "locationGoogle",
            type: "detail",
            place_id: this.props.placeId,
            estado: "cargando",
            dirSearch: this.props.direccion
        }, true);
    }

    render() {

        if (this.props.state.locationGoogleReducer.estado == "exito" && this.props.state.locationGoogleReducer.type == "detail") {
            let datos = this.props.state.locationGoogleReducer.datosDetail;
            this.props.state.locationGoogleReducer.estado = "";
            console.log(this.props.direccion)
            // datos.direccion = this.state.direccion
            if (this.props.seleccionar) this.props.seleccionar(datos);

        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.getDetail();
                }}
                style={{
                    width: "95%",
                    height: 60,
                    margin: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                <View style={{
                    width: 50,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <Svg resource={require("../../../../img/reloj.svg")}
                        style={{
                            width: 40,
                            height: 40,
                            fill: "#ffffff"
                        }} />
                </View>

                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            color: "#000",
                            fontSize: 13,
                            margin: 5,
                        }}>{this.props.direccion}</Text>
                    </View>

                    <View style={{
                        height: 1.2,
                        width: "96%",
                        backgroundColor: "#a4a4a4"
                    }}>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
export default ListaAutoCompleteItem
