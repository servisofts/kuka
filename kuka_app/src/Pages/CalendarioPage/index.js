import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../Actions';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SSCrollView from '../../Component/SScrollView';
import { SCalendar, SDate, SLoad, SPopup, SScrollView2, SView } from '../../SComponent';
import { SSRolesPermisosValidate } from '../../SSRolesPermisos';
import Svg from '../../Svg';

class CalendarioPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  getJornadas() {
    var jornadas = Actions.Jornada.getAll(this.props);
    if (!jornadas) {
      return <SLoad />
    }
    return <SCalendar
      jornadas={jornadas}
      onDelete={(jornada) => {

        if (SSRolesPermisosValidate({ page: "CalendarioPage", permiso: "eliminar" })) {
          SPopup.confirm(`Esta seguro de quitar la jornada \n ${jornada.descripcion}`, () => {
            Actions.Jornada.editar({
              ...jornada,
              estado: 0
            }, this.props)
          });
          return <View />
        }
        if (SSRolesPermisosValidate({ page: "CalendarioPage", permiso: "reservar" })) {
          this.props.navigation.navigate("MesaPage", { jornada: jornada });
          return <View />
        }

      }}
      onChange={(evt) => {
        // if (!SSRolesPermisosValidate({ page: "CalendarioPage", permiso: "reservar" })) {
        //   return <View />
        // }
        if (!SSRolesPermisosValidate({ page: "CalendarioPage", permiso: "registrar" })) {
          return <View />
        }
        var fecha = new SDate(evt.date).clone()
        var fecha_inicio = fecha.addHours(17).toString();
        var fecha_fin = fecha.addHours(10).toString();
        SPopup.input({
          title: `Esta seguro que atenderan el dia \n ${new SDate(evt.date).toString("day, dd MONTH ")}?`,
          props: {
            placeholder: "Escriba la tematica del evento...",
          },
          callback: (resp) => {
            if (!resp) {
              resp = "s/n";
            }
            Actions.Jornada.registro({
              descripcion: resp,
              fecha_inicio,
              fecha_fin,
            }, this.props)
          }
        })
      }
      }
    />
  }

  render() {
    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BackgroundImage />
        <BarraSuperior navigation={this.props.navigation} title={"Calendario"} goBack={() => { this.props.navigation.goBack() }} />

        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SScrollView2 disableHorizontal>
            <SView props={{
              col: "xs-12",
              variant: "center",
            }}>
              <SView props={{
                col: "xs-12 md-6 xl-4",
              }}>
                {this.getJornadas()}
              </SView>
            </SView>
          </SScrollView2>
        </View>

      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CalendarioPage);
