import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SMapView from '../../../Component/SMapView';
import Svg from '../../../Svg';
import Geolocation from '@react-native-community/geolocation';
import MarkerMedio from './MarkerMedio';
import MapaSelectPorLista from './MapaSelectPorLista';
import AppParams from '../../../Params';

class MapaAutoComplete extends Component {
    constructor(props) {
        super(props);
        var region = {
            latitude: -17.78629,
            longitude: -63.18117,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
        }
        if (this.props.value) {
            console.log(this.props.value.latitude);
            if (this.props.value.latitude && this.props.value.longitude) {
                region.latitude = this.props.value.latitude
                region.longitude = this.props.value.longitude
            }

        }
        this.state = {
            region: region
        };
    }
    getDistancia = (lat1, lon1, lat2, lon2) => {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) { dist = 1 }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344
            return dist;
        }
    }
    OnRegionChangeComplete = (region) => {
        var distancia = this.getDistancia(this.state.region.latitude, this.state.region.longitude, region.latitude, region.longitude);
        // console.log(distancia)
        if (distancia <= 1) {
            return <View />
        }

        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "locationGoogle",
            type: "geocode",
            data: region,
            estado: "cargando"
        }, true);
    }
    getposition = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                this.mapa.animateToRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002
                }, 1000)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { timeout: 30000, enableHighAccuracy: false, maximumAge: 75000 }
        );
        // if (!currentPos) {
        //     return <View />
        // }
        // mapa.animateToRegion({
        //     latitude: currentPos.coords.latitude,
        //     longitude: currentPos.coords.longitude,
        //     latitudeDelta: 0.002,
        //     longitudeDelta: 0.002
        // }, 1000)
        return <View />
    }
    render() {

        if (this.props.state.locationGoogleReducer.estado == "exito" && this.props.state.locationGoogleReducer.type == "geocode") {
            this.props.state.locationGoogleReducer.estado = "";
            this.props.seleccionar(this.props.state.locationGoogleReducer.data);
        }
        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    backgroundColor: "#fff"
                }}>
                    <MapaSelectPorLista changeType={() => { this.props.changeType() }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {/* <MapView
                        style={{
                            flex: 1,
                            width: '100%',
                            height: "100%",
                        }}
                        ref={map => {
                            this.mapa = map;
                        }}
                        initialRegion={this.state.region}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        onRegionChangeComplete={(region) => this.OnRegionChangeComplete(region)}
                    >
                    </MapView> */}
                    <SMapView style={{
                        flex: 1,
                        width: '100%',
                        height: "100%",
                    }}
                        ref={map => {
                            this.mapa = map;
                        }}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                        onRegionChangeComplete={(region) => this.OnRegionChangeComplete(region)}>
                    </SMapView>
                    <MarkerMedio />
                    {/* <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: 200,
                            right: 10
                        }}
                        onPress={() => {
                            this.getposition();
                        }}>
                        <Svg resource={require("../../../img/gps.svg")}
                            style={{
                                width: 50,
                                height: 50,
                                fill: "#000"
                            }} />
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(MapaAutoComplete);
