import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SSRolesPermisosValidate } from '../../..';
import ActionButtom from '../../../../Component/ActionButtom';
import Buscador from '../../../../Component/Buscador';
import SOrdenador from '../../../../Component/SOrdenador';
import AppParams from '../../../../Params';
import STheme from '../../../../STheme';

class PermisosDelRol extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        var data = this.props.state.pageReducer.data;
        if (!data) {
            if (this.props.state.pageReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            var object = {
                component: "page",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        var key_rol = this.props.data.key;
        var rolPermiso = this.props.state.rolPermisoReducer.rol[key_rol];
        if (!rolPermiso) {
            if (this.props.state.rolPermisoReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            var object = {
                component: "rolPermiso",
                type: "getAll",
                estado: "cargando",
                key_rol: this.props.data.key,
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }

        const getPermisos = (page) => {
            var key_page = page.key;
            var permisos = this.props.state.permisoReducer.data[page.key];
            if (!permisos) {
                if (this.props.state.permisoReducer.estado == "cargando") {
                    return <Text>Cargando</Text>
                }
                var object = {
                    component: "permiso",
                    type: "getAll",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                return <View />
            }
            var Lista = Object.keys(permisos).map((key) => {
                var objPermiso = permisos[key];
                // fetch(AppParams.urlImages + "permiso/" + objPermiso.key)
                if (!SSRolesPermisosValidate({ page: page.url, permiso: objPermiso.type })) {
                    return <View />
                }
                if (objPermiso.key_page != key_page) {
                    return <View />
                }
                var permisoActivo = false;
                if (rolPermiso[objPermiso.key]) {
                    var key_rol_permiso = rolPermiso[objPermiso.key]
                    permisoActivo = this.props.state.rolPermisoReducer.data[key_rol_permiso];
                    if (permisoActivo.estado == 0) {
                        permisoActivo = false;
                    }

                }
                return <View style={{
                    width: 80,
                    height: 100,
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        margin: 4,
                        width: 60,
                        height: 100,
                        alignItems: "center"
                    }} onPress={() => {
                        if (!permisoActivo) {
                            var object = {
                                component: "rolPermiso",
                                type: "registro",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: {
                                    key_rol: this.props.data.key,
                                    key_permiso: objPermiso.key
                                }
                            }
                            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        } else {
                            var object = {
                                component: "rolPermiso",
                                type: "editar",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: { ...permisoActivo, estado: 0 }
                            }
                            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                        }
                        // this.props.navigation.navigate("PermisoCrearPage", { key: objPermiso.key });
                    }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            borderColor: STheme.color.card,
                            overflow: 'hidden',
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}>
                            {this.props.state.imageReducer.getImage((AppParams.servicios["roles_permisos"] + "permiso/" + objPermiso.key), {
                                position: "absolute",
                            })}

                            {(permisoActivo ? <View /> : <View style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#00000099",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}>Activar</Text>
                            </View>)}
                        </View>
                        <Text style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: 10,
                            color: STheme.color.text
                        }}>{objPermiso.descripcion}</Text>
                    </TouchableOpacity>
                </View>
            })
            return Lista;
            return <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                {Lista}
            </View>
        }
        const getLista = () => {
            if(!this.state.buscador){
                return <View/>
            }
            var Lista = new SOrdenador([
                { key: "descripcion", order: "asc", peso: 2 },
            ]).ordernarObject(
                this.state.buscador.buscar(data)
            ).map((key) => {
                var obj = data[key];

                if (!SSRolesPermisosValidate({ page: obj.url, permiso: "ver" })) {
                    return <View />
                }
                return <View style={{
                    justifyContent: "center",
                    // alignItems: "center",
                    backgroundColor: STheme.color.card,
                    borderRadius: 8,
                    padding: 4,
                    // borderBottomWidth: 1,
                    // borderColor: "#ddd",
                    marginBottom: 8,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 80,
                        marginBottom: 8,
                        borderBottomColor: "#660000",
                        borderBottomWidth: 1,
                    }}>
                        <View style={{
                            width: 45,
                            height: 45,
                            margin: 4,
                        }}>
                            {this.props.state.imageReducer.getImage(AppParams.servicios["roles_permisos"] + "page/" + key, {})}
                        </View>
                        {/* <Text style={{
              color: "#999"
            }}>descripcion: </Text> */}
                        <View style={{
                            flex: 2,
                            // alignItems: "center"
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: STheme.color.text
                            }}>{obj.descripcion}</Text>
                            <Text style={{
                                fontSize: 10,
                                color: STheme.color.text
                            }}>{"/" + obj.url}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        width: "100%",
                        flexWrap: "wrap",
                        padding: 8,
                    }}>
                        {getPermisos(obj)}

                    </View>
                </View>
            })
            return <View style={{
                // flexDirection: "row",. 
            }}>
                {Lista}
            </View>
        }


        return <View style={{
            marginTop: 32,
            width: "96%",
            borderRadius: 8,
            // backgroundColor: "#fff",
            padding: 4,
            minHeight: 400,
            marginBottom: 32,

        }
        }>
            <Text style={{
                fontSize: 14,
                padding: 4,
                color: "#999",
                width: "100%",
                textAlign: "center"
            }}>Permisos del rol</Text>
            <Buscador placeholder={"Buscar."} ref={(ref) => {
                if (!this.state.buscador) this.setState({ buscador: ref });
            }} repaint={() => { this.setState({ ...this.state }) }}
                eliminados={false}
            />
            {getLista()}

        </View >
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PermisosDelRol);