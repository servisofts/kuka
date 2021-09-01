import React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';
import Svg from '../../../../Svg';

const MarkerMedio = (props) => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: "absolute",
                bottom: "50%",
                borderRadius: 100,
                borderColor: '#fff',
                // paddingBottom: 60
            }}>
            <Svg resource={require("../../../../img/milocation.svg")}
                style={{
                    width: 30,
                    height: 30,
                    fill: "#000"
                }} />
            {/* {getMarkerOrigen()} */}
        </View>
    )
}


export default MarkerMedio;
