import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SScrollView from '../../SScrollView';
import { SText } from '../../SText';
import { SView } from '../../SView';
class Cuadricula extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getCuadricula({ width, height, space }) {

        var Cuadricula = [];
        var separation = !space ? 20 : space
        for (let i = 0; i < height; i += separation) {
            for (let j = 0; j < width; j += separation) {
                var pos = {
                    x: j / separation,
                    y: i / separation
                }
                Cuadricula.push(<SView
                    props={{
                        customStyle: (((pos.x + pos.y) % 2) == 0 ? "primary" : "secondary")
                    }}
                    onPress={(evt) => {
                        this.scroll.scrollTo({ x: evt.layout.x+50, y: evt.layout.y+50 });
                    }}
                    style={{
                        width: separation,
                        height: separation
                    }}>
                    {/* {`{ x: ${j/separation}, y: ${i/separation} }`} */}
                    {`${pos.x},${pos.y}`}
                </SView>)
            }
        }
        return Cuadricula;
    }
    render() {
        return (
            <SView props={{
                variant: "center",
                height: "100%",
            }} >
                <SView style={{
                    width: "90%",
                    height: "90%",
                }}>
                    <SView>Hola</SView>
                    <SScrollView ref={(ref) => { this.scroll = ref; }} >
                        <SView
                            props={{
                                direction: "row"
                            }}
                            style={{
                                width: 2000,
                                height: 2000,
                            }}>
                            {this.getCuadricula({
                                width: 2000,
                                height: 2000,
                                space: 100,
                            })}
                        </SView>
                    </SScrollView>
                    {/* <STable
                        header={[
                            { label: "Nombres", key: "Nombres/dato", width: 120 },
                            { label: "Apellidos", key: "Apellidos/dato", width: 120 },
                            { label: "Correo", key: "Correo/dato", width: 200 },
                            { label: "Fecha nacimineto", key: "Fecha de nacimiento/dato", width: 120 },
                            { label: "Teléfono", key: "Telefono/dato", width: 120 },
                            { label: "Sexo", key: "Sexo/dato", width: 80 },
                            { label: "Nacionalidad", key: "Nacionalidad/dato", width: 100 },
                            { label: "Domicilio actual", key: "Domicilio actual/dato/direccion", width: 250 },
                            { label: "Codigo de referencia", key: "Codigo de referencia/dato", width: 100 },
                            { label: "Carnet de identidad", key: "Carnet de identidad/dato/back", width: 100 },
                            { label: "Password", key: "Password/dato", width: 200 },
                            // { label: "Fecha", key: "Apellidos/fecha_on", width: 180 },
                        ]}
                        data={DataJson}
                    /> */}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state };
};

export default connect(initStates)(Cuadricula);
