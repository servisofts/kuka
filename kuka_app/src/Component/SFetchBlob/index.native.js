import { Linking, Platform } from "react-native";
import FileViewer from 'react-native-file-viewer';
var RNFS = require("react-native-fs");
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class SFetchBlob {

    constructor() {

    }
    descargar = async (props, callback) => {
        console.log("INICIANDO DESCARGA....");
        var arrUr = props.descripcion.split("/");
        var name = arrUr[arrUr.length - 1]
        var pathDirectori = "";
        if (Platform.OS == "android") {
            // pathDirectori = RNFS.ExternalDirectoryPath;
            pathDirectori = RNFS.DownloadDirectoryPath;
        } else {
            pathDirectori = RNFS.DocumentDirectoryPath;
        }
        var path = pathDirectori + '/Servisofts/Drive';
        var urlImage = props.url + "." + (name.split(".")[1]);
        console.log(urlImage)
        var toPath = path + "/" + props.descripcion
        console.log(toPath);
        await RNFS.mkdir(path, {}).catch((err) => {
            console.log("Asdasdsa");
            console.log(err)
        })
        RNFS.downloadFile({
            fromUrl: urlImage,
            headers: {
                'key_usuario': props.key_usuario,
            },
            toFile: toPath,
            begin: () => {
                console.log("begim");

                callback(0.999)
            },
            progress: (evt) => {
                callback(1 - (evt.bytesWritten / evt.contentLength))
            },

        }).promise.then((r) => {
            console.log(r);
            callback(0)
            FileViewer.open(toPath, { showOpenWithDialog: true })
                .then(() => {
                    // success
                })
                .catch(error => {
                    // error
                });
        })
    }
}


