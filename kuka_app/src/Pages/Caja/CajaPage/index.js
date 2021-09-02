import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BackgroundImage from '../../../Component/BackgroundImage';
import BarraSuperior from '../../../Component/BarraSuperior';
import CalisPage from '../../../Component/CalisPage';
import { SScrollView, SScrollView2, SText, STheme, SView } from '../../../SComponent';
import EstadoCaja from './EstadoCaja';
import Movimientos from './Movimientos';
import Sucursal from './Sucursal';
import Menu from './Menu/index';
import FloatButtom from '../../../Component/FloatButtom/index';

export default class CajaPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      sucursal: false,
      activa: false,
      montoEnCaja: 0,
    };
  }

  render() {
    return (<CalisPage {...this.props} title={"Caja"}>
      <SView props={{
        col: "xs-12",
      }} style={{
        flex: 1,
        width: "100%",
      }}>
        <SScrollView2 disableHorizontal style={{
          width: "100%"
        }}>
          <SView props={{
            col: "xs-12",
            variant: "center",
          }} style={{
            marginTop: 8,
          }}>

            <Sucursal navigation={this.props.navigation} key_sucursal={this.state.key_sucursal} sucursal={this.state.sucursal} setSucursal={(suc) => { this.setState({ sucursal: suc }) }} />
            <EstadoCaja
              montoEnCaja={this.state.montoEnCaja}
              navigation={this.props.navigation}
              sucursal={this.state.sucursal}
              setKeySucursal={(suc) => {
                if (!this.state.key_sucursal) {
                  this.setState({ key_sucursal: suc })
                }
              }} />
            <Menu />
            <Movimientos setActiva={(caja) => {
              if (!this.state.activa) {
                this.setState({ activa: caja })
              }
            }} />
          </SView>
          <SView style={{
            height: 20,
          }}></SView>

        </SScrollView2>
        <FloatButtom label={"+"} onPress={() => {
          if (!this.state.activa.key) {
            return null;
          }
          this.props.navigation.navigate("CajaMovimientoRegistroPage", { key_caja: this.state.activa.key });
        }} />
      </SView>
    </CalisPage>
    );
  }
}
