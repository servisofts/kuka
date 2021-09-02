import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../../Actions';
import Page from '../../../Component/Page';
import Elements from '../../../Elements';
import { SScrollView2, SText, SView } from '../../../SComponent';
import Movimientos from './Movimientos';

class DetalleCaja extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_caja = props.navigation.getParam("key");
    }

    render() {
        var caja = Actions.Caja.getByKey(this.props, this.key_caja);
        if (!caja) return <ActivityIndicator />
        return (
            <Page
                navigation={this.props.navigation}
                title="Detalle de caja "
            >
                {/* <SText>{JSON.stringify(caja)}</SText> */}
                <SScrollView2 disableHorizontal>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11.8 md-8 xl-6"}>
                            <Elements.Usuario.Perfil key_usuario={caja.key_usuario} />
                        </SView>
                        <Movimientos caja={caja} />
                    </SView>

                </SScrollView2>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleCaja);

