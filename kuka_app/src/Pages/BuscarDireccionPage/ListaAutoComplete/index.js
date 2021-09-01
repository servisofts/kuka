import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ListaAutoCompleteItem from './ListaAutoCompleteItem';
import ListaSelectPorMapa from './ListaSelectPorMapa';

class ListaAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista = () => {
        var lista = this.props.state.locationGoogleReducer.listaBusqueda;
        if (this.props.state.locationGoogleReducer.estado == "cargando" && this.props.state.locationGoogleReducer.type == "autoComplete") return <ActivityIndicator color={"#000"} />
        if (!lista) {
            return <View />
        }
        return lista.map((obj, key) => {
            return <ListaAutoCompleteItem direccion={obj.direccion} placeId={obj.place_id} seleccionar={this.props.seleccionar} {...this.props} />;
        })
    }
    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff"
            }}>
                <ScrollView style={{
                    flex: 1,
                }}>
                    <ListaSelectPorMapa changeType={() => { this.props.changeType() }} />
                    {this.getLista()}
                </ScrollView>
                {/* <View style={{
                    height:50,
                    backgroundColor:"#f00"
                }}>

                </View> */}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaAutoComplete);