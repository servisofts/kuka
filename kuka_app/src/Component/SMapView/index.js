import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';
import GoogleMapReact from 'google-map-react';
import MapStyle from './mapStyle.json'

class SMapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: props.initialRegion.latitude,
                longitude: props.initialRegion.longitude,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
            },
        };
        this.mapa = false;
    }

    getZoom = (region) => {
        var promedio = (region.longitudeDelta + region.latitudeDelta)
        let zoom = Math.round(promedio * 100)
        return zoom
    }

    getposition = () => {
        var _map = this.mapa;
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            // _map.setCenter({
            //     lat: position.coords.latitude,
            //     lng: position.coords.longitude
            // })
            // _map.setZoom(18)
        }, (error) => {
            console.log("error al optener ubicacion")
        }, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 1500
        });
    }


    componentDidMount() {
        console.log("hoola mundo")
        this.getposition();
    }

    // RenderMarker() {
    //     return this.props.markers.map((obj, key) => {
    //         return <View
    //             style={{
    //                 transform: [
    //                     { translateY: -35 },
    //                     { translateX: -17 }
    //                 ]
    //             }}
    //             onClick={() => {
    //                 obj.onPress();
    //             }}
    //             lat={obj.coordinate.latitude}
    //             lng={obj.coordinate.longitude}
    //         >
    //             <Svg name="logoSimple"
    //                 style={{
    //                     width: 35,
    //                     height: 35,
    //                 }} />
    //         </View >
    //     })
    // }
    setMarker() {

    }

    render() {

        console.log("holaaaa")

        return (
            <>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDYLp8tqYQvGbQLdL0BbsAGYaXWr8dxTUg" }}
                    defaultCenter={{
                        lat: this.state.region.latitude,
                        lng: this.state.region.longitude
                    }}
                    options={{
                        styles: MapStyle
                    }}
                    defaultZoom={this.getZoom(this.state.region)}
                    onGoogleApiLoaded={({ map, maps }) => {
                        this.mapa = map
                    }}
                    onDragEnd={(evt)=>{
                        var center={
                            latitude:evt.center.lat(),
                            longitude:evt.center.lng(),
                        }
                        if(this.props.onRegionChangeComplete)this.props.onRegionChangeComplete(center);
                    }}
                >
                    {this.props.children}
                </GoogleMapReact>
                    {/* <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: 100,
                            right: 8,
                            padding: 4,
                            backgroundColor: "#ccc",
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.getposition();
                        }}>
                        <Svg name="logoSimple"
                            style={{
                                width: 35,
                                height: 35,
                                fill: "#2C4C7E"
                            }} />
                    </TouchableOpacity> */}
            </>
        );
    }
}

export default SMapView;
