import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AppParams from '../../../../../Params/index';
import { connect } from 'react-redux';
import { SView } from '../../../../../SComponent/SView/index';
import BackgroundImage from '../../../../../Component/BackgroundImage';
import { SText } from '../../../../../SComponent/SText/index';
import { SForm, SPopupClose, SScrollView2 } from '../../../../../SComponent';
import { SPopupOpen } from '../../../../../SComponent/SPopup/index';
import BancoSelect from '../../../../Banco/BancoSelect/index';
import TiposDePago from './TiposDePago';
import Actions from '../../../../../Actions';

class PopupCerrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            cuenta: false,
        };
    }

    getMenos200() {
        var val = this.props.total - 200;
        if (val < 0) val = 0;
        return val;
    }


    render() {
        var MovimientosCaja = Actions.CajaMovimiento.getByKeyCaja(this.props.data.key, this.props)
        if (!MovimientosCaja) return <ActivityIndicator color={"#fff"} />
        if (this.state.hidden) return <View />
        return (
            <SView col={"xs-12 md-8 xl-6"}
                withoutFeedback
                style={{
                    maxHeight: "90%",
                    height: 800,
                    borderRadius: 8,
                }}>
                <BackgroundImage />
                <SScrollView2 disableHorizontal>
                    <SView col={"xs-12"} center>
                        <SText fontSize={20}>Cerrar caja</SText>
                        <SView col={"xs-12"} style={{
                            height: 16,
                        }}></SView>
                        <SView col={"xs-12 md-10 xl-9"}>
                            <TiposDePago key_sucursal={this.props.data.key_sucursal} movimientos={MovimientosCaja} preventEdit onPress={() => {
                                var obj = {
                                    component: "caja",
                                    type: "cierre",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        key_caja: this.props.data.key,
                                        // key_cuenta_banco: this.state.cuenta.key,
                                        // monto: data.monto * -1,
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    }
                                }
                                this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
                                SPopupClose("cerrarCaja")
                            }} />
                        </SView>
                        <SView col={"xs-12"} style={{
                            height: 16,
                        }}></SView>
                        {/* <SForm props={{
                            variant: "center",
                            col: "xs-11",
                            // direction: "row",
                        }}
                            inputProps={{
                                customStyle: "calistenia",
                            }}
                            inputs={{
                                // cuenta: {
                                //     label: 'Cuenta',
                                //     type: "select",
                                //     isRequired: true,
                                //     placeholder: "Cuenta",
                                //     value: this.state.cuenta.descripcion,
                                //     col: "xs-11",
                                //     onPress: () => {
                                //         SPopupOpen({
                                //             key: "selectbanco",
                                //             content: <BancoSelect onSelect={(cuenta_banco) => {
                                //                 SPopupClose("selectbanco");
                                //                 this.setState({ cuenta: cuenta_banco });
                                //             }} />
                                //         })
                                //         // this.props.navigation.navigate("BancoPage", {
                                //         //     onSelect: (cuenta) => {

                                //         //     }
                                //         // });
                                //     },
                                // },
                                monto_caja: {
                                    type: 'money',
                                    label: 'monto en caja',
                                    defaultValue: this.props.total + "",
                                    isRequired: true,
                                    disabled: true,
                                    col: "xs-11 md-8"
                                },
                                monto: {
                                    type: 'money',
                                    label: 'monto a depocitar',
                                    placeholder: '0.00',
                                    value: this.getMenos200() + "",
                                    // defaultValue: this.getMenos200()+"",
                                    isRequired: true,
                                    col: "xs-11 md-8"
                                },
                            }}
                            onSubmitProps={{
                                type: "danger",
                                variant: "default"
                            }}
                            onSubmitName={"Cerrar"}
                            onSubmit={(data) => {
                                var obj = {
                                    component: "caja",
                                    type: "cierre",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        key_caja: this.props.data.key,
                                        key_cuenta_banco: this.state.cuenta.key,
                                        monto: data.monto * -1,
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    }
                                }
                                this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
                                SPopupClose("cerrarCaja")
                            }}
                        >

                        </SForm> */}


                    </SView>
                </SScrollView2>
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PopupCerrar);