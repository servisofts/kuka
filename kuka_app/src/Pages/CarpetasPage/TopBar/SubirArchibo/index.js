import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import * as SFileImput from '../../../../Component/SFileImput';
import { connect } from 'react-redux';
import Svg from '../../../../Svg';
import { getFilesInPath, getPosicionDisponible } from '../../../../FileFunction';

class SubirArchibo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        if (Platform.OS == "web") {
            return <View />
        }
        return (
            <TouchableOpacity style={{
                width: 42,
                height: 42,
                paddingTop: 2,
                // borderWidth: 1, 
                // borderRadius: 8,
                // backgroundColor:"#000",
                borderColor: "#ddd",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                var curFile = getFilesInPath(this.props);
                if (!curFile) {
                    return;
                }

                var posicion = getPosicionDisponible({
                    curFile, props: {
                        ...this.props.stateParent
                    }
                });


                SFileImput.choseFile({
                    component: "file",
                    type: "subir",
                    estado: "cargando",
                    path: this.props.state.fileReducer.routes,
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    positions: [posicion]
                    // key: this.data.key
                }, (resp) => {
                    // fetch(urlImage);
                    // var obj= JSON.parse(resp.data);
                    // this.props.dispatch(obj)
                });
            }}>
                <Svg resource={require('../../../../img/upload.svg')} style={{
                    width: 26,
                    height: 26,
                }} />
                {/* <Text style={{
                    fontSize:10,    
                    color: "#aaa",
                    fontWeight: "bold",
                    textAlign: "center"
                }}> Subir archibo </Text> */}
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SubirArchibo);