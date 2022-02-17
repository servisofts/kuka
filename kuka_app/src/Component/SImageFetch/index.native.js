import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
// import { connect } from 'react-redux';

type PropsT = {
    src: String,
    style: Component.style
}

export default class SImageFetch extends Component<PropsT> {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.descargar();
    }

    descargar = async () => {
        console.log("INICIANDO DESCARGA....");
        var url = this.props.src;
        console.log(url);
        var myInit = {
            method: 'GET',
            cache: "no-cache",
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "*",
                // "key_usuario": props.key_usuario,
            }
        };
        try {

            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open('POST', url);
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.setRequestHeader("Accept", "*/*");
            xhr.onreadystatechange = function () { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    // var objJson = ;
                    var blob = xhr.response.Blob
                    const uri = window.URL.createObjectURL(blob);
                    this.setState({ source: uri });
                    // callback({
                    //     estado:"exito",
                    //     data:objJson
                    // })
                }
            }
            xhr.send(body);

            // var myRequest = new Request(url, myInit);
            // let response = await fetch(myRequest);
            // const reader = response.body.getReader();
            // const contentLength = +response.headers.get('Content-Length');
            // // console.log(contentLength)
            // let receivedLength = 0; // received that many bytes at the moment
            // let chunks = []; // array of received binary chunks (comprises the body)
            // while (true) {
            //     const { done, value } = await reader.read();
            //     if (done) {
            //         break;
            //     }
            //     chunks.push(value);
            //     receivedLength += value.length;
            //     // callback(1 - (receivedLength / contentLength))
            //     // console.log(`Received ${receivedLength} of ${contentLength}`)
            // }
            // let chunksAll = new Uint8Array(receivedLength); // (4.1)
            // let position = 0;
            // for (let chunk of chunks) {
            //     chunksAll.set(chunk, position); // (4.2)
            //     position += chunk.length;
            // }

            // const a = document.createElement('a');
            // a.style.display = 'none';
            // a.href = uri;

            // var arrUr = url;
            // var name = arrUr[arrUr.length - 1]
            // a.download = name;
            // // alet
            // document.body.appendChild(a);
            // a.click();
            // window.URL.revokeObjectURL(uri);
        } catch (error) {
            this.setState({ source: false });
            console.log(error)
        }

    }
    render() {
        if (!this.state.source) {
            return <View />
        }
        return (
            <Image src={this.state.source} width="100%" height="100%" style={{ ...this.props.style }} draggable="false" />
        );
    }
}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(SImageFetch);