import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ClientesDuplicados from './clientes_duplicados.json';
export default class EtapaMigracion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
            }}>
                <Text style={{
                    color: "#fff",
                    fontWeight: "bold"
                }}>Etapa de migracion </Text>

                <Text style={{
                    marginTop: 8,
                    color: "#fff",
                    textAlign: "justify",
                }}>Durante la etapa de migración se ha iniciado por el análisis de los clientes del sistema notando la inconsistencia de los datos y la gran cantidad de duplicados.</Text>
                <Text style={{
                    marginTop: 8,
                    color: "#fff",
                }}>Se realizó la unificación de estos en su mayoría, debido al estado de los mismos los siguiente usuario no cumplieron nuestros estrictos niveles de consistencia por ende fueron denegados.</Text>
                <Text style={{
                    marginTop: 8,
                    color: "#fff",
                }}>cantidad de errores : ({ClientesDuplicados.length})</Text>
                <TouchableOpacity style={{
                    padding: 4,
                }} onPress={() => {
                    this.props.navigation.navigate("ServisoftsUsuarioConErrorPage");
                }}>
                    <Text style={{
                        color: "#669",
                        textAlign: "justify",
                        textDecorationLine: "underline"
                    }}>Ver usuarios con error</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
