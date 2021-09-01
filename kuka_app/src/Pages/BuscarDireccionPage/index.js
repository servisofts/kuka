import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BarraSuperior from './BarraSuperior';
import ListaAutoComplete from './ListaAutoComplete';
import MapaAutoComplete from './MapaAutoComplete';

export default class BuscarDireccionPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var dir = false;
        if (this.props.navigation.state.params) {
            if (this.props.navigation.state.params.direccion) {
                // this.setState({ ubicacion: })
                dir = this.props.navigation.state.params.direccion;
            }
        }

        this.state = {
            ubicacion: dir,
            type: "lista",
        };
    }
    seleccionar = (dataUbicacion) => {
        // console.log("UBICACION SELECCIONADA");
        // console.log(dataUbicacion);
        this.setState({ ubicacion: dataUbicacion });
        if (this.props.navigation.state.params.select) {
            this.props.navigation.state.params.select(dataUbicacion);
        }
        if (this.state.type == "lista") {
            this.props.navigation.goBack();
        }
    }
    getType = () => {
        if (this.state.type == "lista") {
            return <ListaAutoComplete {...this.props} seleccionar={(dt) => this.seleccionar(dt)} changeType={() => {
                this.setState({ type: "mapa" })
            }} />
        } else {
            return <MapaAutoComplete   value={this.state.ubicacion}  seleccionar={(dt) => this.seleccionar(dt)} changeType={() => {
                this.setState({ type: "lista" })
            }} />
        }
    }
    render() {

        return (
            <View style={{
                flex: 1,
            }}>
                <BarraSuperior {...this.props} value={this.state.ubicacion} />
                {this.getType()}
            </View>
        );
    }
}

