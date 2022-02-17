import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import ProgressCircle from '../../Component/ProgressCircle';
import STextImput from '../../Component/STextImput';
import Svg from '../../Svg';
import DescargaProgres from './DescargaProgres';
import SFetchBlob from '../../Component/SFetchBlob';
import AppParams from '../../Params';
import { connect } from 'react-redux';
 class DescargaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        if (!this.props.navigation.state) {
            this.props.navigation.goBack();
            return <View />
        }
        var params = this.props.navigation.state.params;
        this.state = {
            _url: new STextImput({
                defaultValue: AppParams.urlImages + params.key,
                style: {
                    width: "90%",
                    height: 40,
                    borderRadius: 4,
                    backgroundColor: "#ffffffaa",
                    textAlign: "center"
                }
            })
        };
    }
    render() {

        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>
                <BarraSuperior title={"Descarga."} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"

                }}>
                    <BackgroundImage source={require("../../img/fondos/color/1.jpg")} />
                    <View style={{
                        width: "90%",
                        borderRadius: 8,
                        height: "90%",
                        maxWidth: 500,
                        padding: 8,
                        backgroundColor: "#ffffff44",
                        alignItems: "center"
                    }}>
                        {this.state._url.getComponent()}
                        <DescargaProgres
                            descargar={() => {
                                var url = this.state._url.getValue();
                                new SFetchBlob().descargar({ url: url, ...this.props.navigation.state.params, key_usuario:this.props.state.usuarioReducer.usuarioLog.key }, (progres) => {
                                    // console.log(progres)
                                    this._progress.animateTo(progres, 1);
                                });
                            }}
                            ref={(ref) => {
                                this._progress = ref;
                            }} />

                    </View>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DescargaPage);