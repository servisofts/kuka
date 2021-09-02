export default class SFetchBlob {

    constructor() {
    }
    descargar = async (props, callback) => {
        console.log("INICIANDO DESCARGA....");
        var url = props.url;
        console.log(url);
        var myInit = {
            method: 'GET',
            cache: "no-cache",
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                // "Access-Control-Allow-Headers": "http://localhost:3000",
                "key_usuario":props.key_usuario,
            }
        };
        try {
            var myRequest = new Request(url, myInit);
            let response = await fetch(myRequest);
            const reader = response.body.getReader();
            const contentLength = +response.headers.get('Content-Length');
            // console.log(contentLength)
            let receivedLength = 0; // received that many bytes at the moment
            let chunks = []; // array of received binary chunks (comprises the body)
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                chunks.push(value);
                receivedLength += value.length;
                callback(1 - (receivedLength / contentLength))
                // console.log(`Received ${receivedLength} of ${contentLength}`)
            }
            let chunksAll = new Uint8Array(receivedLength); // (4.1)
            let position = 0;
            for (let chunk of chunks) {
                chunksAll.set(chunk, position); // (4.2)
                position += chunk.length;
            }
            var blob = new Blob([chunksAll]);
            const uri = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = uri;
            var arrUr = props.descripcion.split("/");
            var name = arrUr[arrUr.length - 1]
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(uri);
        } catch (error) {
            console.log(error)
        }

    }
}


