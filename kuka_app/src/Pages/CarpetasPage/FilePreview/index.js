import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SImage from '../../../Component/SImage';
import Svg from '../../../Svg';
import SharePreview from './SharePreview';

export default class FilePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    getMimeType() {
        var arrs = this.props.obj.descripcion.split(".");
        var type = arrs[arrs.length - 1]
        var Item = false;
        if (this.props.obj.tipo == 0) {
            return <><Svg resource={require('../../../img/folder.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
                {/* <Text style={{ position: "absolute" }}>{this.props.obj.key}</Text> */}
            </>
        }
        if (["svg",].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/svg.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["png", "jpg", "jpeg", "bmp", "gif", "raw", "nef", "dwg"].includes(type.toLocaleLowerCase())) {
            return <View style={{
                width: "100%",
                height: "100%",
                borderWidth: 2,
                borderColor: "#999",
                backgroundColor: "#fff",
                borderRadius: 4,

            }}><SImage source={{ uri: this.props.src }} style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain"
            }} />
            </View>;
        }

        if (["json",].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/json.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["m1v", "mp2v", "mp4", "mpa", "mpe", "mpeg", "mpg", "mpv2", "avi", "wm", "wmv", "ivf", "dvd", "wob", "div", "divx"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/video.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["mp3", "mid", "midi", "wav", "wma", "cda", "ogg", "ogm", "acc", "ac3", "flac", "mp4", "aym"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/audio.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["ps", "psd"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/ps.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["ai",].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/ai.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["iso",].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/iso.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["pdf",].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/pdf.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["doc", "docx"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/doc.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["ppt", "pptx"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/doc.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["xls", "xlsx"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/doc.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["zip", "rar"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/zip.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["js", "ts"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/js.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        if (["apk"].includes(type.toLocaleLowerCase())) {
            return <Svg resource={require('../../../img/extensionPack/apk.svg')} style={{
                width: "100%",
                height: "100%",
            }} />
        }
        return <Svg resource={require('../../../img/extensionPack/undefined.svg')} style={{
            width: "100%",
            height: "100%",
        }} />
    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor:"#000"
            }}>
                {this.getMimeType()}
                <SharePreview file={this.props.obj} />
            </View>
        );
    }
}
