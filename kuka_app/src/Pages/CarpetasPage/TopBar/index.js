import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import BackPath from './BackPath';
import NuevaCarpeta from './NuevaCarpeta';
// import RoutePath from './RoutePath';
import SubirArchibo from './SubirArchibo';
import ZoonFile from './ZoonFile';
// import ModoVista from './ModoVista';
// import CerrarSession from './CerrarSession';
import { openDropDown } from '../../../Component/DropDown';
import Vistas from './Vistas';
import Reload from './Reload';
export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: 40,
                flexDirection: "row"
            }}>
                {/* <BackPath /> */}
                {/* <RoutePath /> */}
                <NuevaCarpeta {...this.props}/>
                <SubirArchibo {...this.props} />


                <Vistas  {...this.props} />
                <ZoonFile {...this.props} val={-0.1} />
                <ZoonFile {...this.props} val={0.1} />

                <Reload/>
                {/* <CerrarSession {...this.props} /> */}

            </View>
        );
    }
}
