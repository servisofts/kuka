import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, Platform, TouchableOpacity, TextInput, Linking, Dimensions, TouchableWithoutFeedback } from 'react-native';
import TouchableDouble from '../../../../Component/TouchableDouble';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg';
import FilePreview from '../../FilePreview';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class FileDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isLive: true,
            select: 0,
            panActive: true,
            // url: ,
            pan: new Animated.ValueXY({ x: props.position.x, y: props.position.y }),
            curpost: { x: (props.position.x / this.props.scale), y: (props.position.y / this.props.scale) }
        }

        this.timePanIn =0;
        this.parametros = {
            useNativeDriver: (Platform.OS != "web"),
        }

        this.createPam();
    }

    verPerfil = async (url) => {

        await delay(300)
        this.props.navigation.navigate("FilePerfil", this.props.obj);
    }

    unSelect() {

        this.state.select = 0;
        this.state.isEdit = false;
        if (!this.state.isEdit) {
            if (this.newName && this.newName != this.props.obj.descripcion) {
                this.props.obj.descripcion = this.newName;
                this.props.editarNombre(this.props.obj);
            }
        }
        this.setState({ ...this.state });
    }
    createPam() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => (gestureState.dx != 0 || gestureState.dy != 0),
            // onShouldBlockNativeResponder:(evt,gh)=>true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: () => {
                this.lastPosition = {
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                }
                this.state.pan.flattenOffset();
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                });
                this.props.scrollView.setNativeProps({ scrollEnabled: false })
                this.timePanIn = new Date().getTime();


            },
            onPanResponderMove: (evt, gs) => {
                this.state.pan.setValue({ x: gs.dx, y: gs.dy });
            },
            onPanResponderRelease: () => {
                this.props.scrollView.setNativeProps({ scrollEnabled: true })
            },
            onPanResponderEnd: () => {
                this.props.scrollView.setNativeProps({ scrollEnabled: true })
                this.timePanEnd = new Date().getTime();
                // console.log("x:" + this.state.pan.x._value + " y:" + this.state.pan.y._value)
                var time = this.timePanEnd - this.timePanIn;
                var force = (this.state.pan.x._value + this.state.pan.y._value) / 3 / time;
                if (force > 0.7) {
                    // console.log(force);
                    this.state.pan.setValue({ x: 0, y: 0 });
                    this.state.pan.flattenOffset();
                    return;
                }
                this.timePanIn = new Date().getTime();

                var x = (this.state.pan.x._value / this.props.scale) + this.state.curpost.x;
                var y = (this.state.pan.y._value / this.props.scale) + this.state.curpost.y;

                var limitx = this.props.layoutParent.width / this.props.scale
                var limity = this.props.layoutParent.height / this.props.scale
                if (x > limitx || x < 0 || y > limity || y < 0) {
                    console.log(this.state.curpost);
                    return;
                }
                this.state.curpost = {
                    x: x,
                    y: y
                }
                this.props.actualizarPosicion({
                    ...this.props.obj,
                    posx: this.state.curpost.x,
                    posy: this.state.curpost.y
                })
                this.state.pan.flattenOffset();
                // this.setState({
                //     ...this.state
                // })
            },
        });
    }
    move(data) {
        this.timePanIn = new Date().getTime();
        Animated.timing(this.state.pan, {
            toValue: data,
            duration: 100,
            useNativeDriver: this.parametros.useNativeDriver
        }).start(() => {
            this.state.pan.setValue(data)
            this.state.pan.flattenOffset();
            this.setState({
                curpost: {
                    x: this.props.obj.posx,
                    y: this.props.obj.posy
                }
            })
        });
    }
    onPress() {
        if (this.state.select == 0) {
            this.setState({ select: 1 })
        } else {
            if (!this.state.isEdit) {
                this.setState({ isEdit: true })
            }
        }
    }
    getName() {
        if (this.state.isEdit) {
            return (
                <TextInput style={{
                    width: "100%",
                    fontSize: 8 * this.props.scale,
                    padding: 0,
                    flex: 1,
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "transparent"
                }}
                    onBlur={() => {
                        if (this.newName) {
                            this.newName.trim();
                            this.unSelect()
                        }
                    }}
                    onKeyPress={(evt) => {
                        if (evt.nativeEvent.key == "Enter") {
                            this.unSelect()
                        }
                    }}
                    selectTextOnFocus={true}
                    multiline={true}
                    numberOfLines={5}
                    autoFocus={true}
                    defaultValue={this.props.obj.descripcion}
                    onChangeText={(text) => {
                        this.newName = text;
                    }}
                />
            )
        } else {
            var sec = this.props.obj.descripcion;
            var dicant = 18;
            if (!this.state.select && sec.length > dicant) {
                sec = sec.substring(0, dicant).trim() + "..."
            }
            return (
                <Text style={{
                    height: "100%",
                    color: "#fff",
                    fontSize: 8 * this.props.scale,
                    textAlign: "center",
                    textAlignVertical: "top",
                    flexWrap: "wrap"
                }
                }> {sec}</Text >
            )
        }

    }
    getPosition() {
        return (
            <Text style={{ width: "100%", color: "#fff", fontSize: 8 * this.props.scale, textAlign: "center", flex: 1, maxHeight: 40, position: "absolute" }}>
                {"cur x:" + this.state.curpost.x.toFixed(0) + " y:" + this.state.curpost.y.toFixed(0)} {"\n"}
                {"obj x:" + this.props.obj.posx.toFixed(0) + " y:" + this.props.obj.posy.toFixed(0)}{"\n"}
                {"pan x:" + (this.state.pan.x._value / this.props.scale).toFixed(0) + " y:" + (this.state.pan.y._value / this.props.scale).toFixed(0)}

            </Text>
        )
    }
    getSize() {
        var byte = this.props.obj.tamano;
        var kbyte = byte / 1024
        var tamano_str = kbyte.toFixed(0) + " Kb";
        return (
            <Text style={{ width: "98%", color: "#fff", fontSize: 8, textAlign: "center", flex: 1, maxHeight: 40 }}>
                {tamano_str}
            </Text>
        )
    }
    getPreview() {
        return <FilePreview src={AppParams.urlImages + this.props.obj.key} obj={this.props.obj} />
    }
    render() {
        if (!this.state.isLive) {
            return <View />
        }
        if (!this.props.obj) {
            return <View />
        }
        if (
            (this.props.obj.posx + 0.0).toFixed(0) != this.state.curpost.x.toFixed(0)
            || (this.props.obj.posy + 0.0).toFixed(0) != this.state.curpost.y.toFixed(0)
        ) {
            if (new Date().getTime() - this.timePanIn > 500) {
                var post = { x: this.props.obj.posx * this.props.scale, y: this.props.obj.posy * this.props.scale };
                // console.log(post);
                this.move(post);
            }
        }
        return (

            <Animated.View
                {...this.panResponder.panHandlers}
                style={{
                    width: (90 * this.props.scale),
                    height: (110 * this.props.scale),
                    position: "absolute",
                    top: 0,
                    left: 0,
                    // borderWidth: 1,
                    borderRadius: 4 * this.props.scale,
                    // borderColor: "#ddd",
                    backgroundColor: (this.state.select == 0 ? "#00000000" : "#4444ff88"),
                    transform: [
                        { translateX: this.state.pan.x },
                        { translateY: this.state.pan.y }
                    ]
                }} onLayout={(event) => {
                    this.setState({ position: event.nativeEvent.layout })
                }}>

                <TouchableDouble style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }} onSinglePress={async () => {
                    this.onPress()
                }} onDoublePress={async () => {
                    // alert(this.props.obj.tipo)
                    if (this.props.obj.tipo == 0) {
                        this.props.moveFolder(this.props.obj);
                    } else {
                        this.props.navigation.navigate("DescargaPage", this.props.obj)
                    }
                }}
                    onLongPress={async () => {
                        this.verPerfil()
                    }}
                >
                    <View style={{
                        width: "90%",
                        height: 75 * this.props.scale,
                        marginTop: 4 * this.props.scale,
                        padding: 4 * this.props.scale,
                        borderRadius: 8 * this.props.scale,
                        borderColor: "#ddd",
                        justifyContent: "center",
                        alignItems: "center",
                        // overflow: "hidden"
                    }}>
                        {this.getPreview()}
                    </View>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        // backgroundColor:"#000"
                    }}>
                        {this.getName()}
                        {/* {this.getSize()} */}
                        {/* {this.getPosition()} */}
                    </View>


                </TouchableDouble>
            </Animated.View>
        );
    }
}
