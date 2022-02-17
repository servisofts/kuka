
import AppParams from '../../Params';
import DropArea from './DropArea';
export const choseFile = (props, callback) => {
    new DropArea((imput) => {
        var form = document.createElement("FORM");
        form.setAttribute("method", "POST");
        form.setAttribute("enctype", "multipart/form-data");

        // var x = document.createElement("INPUT");
        // x.setAttribute("type", "file");
        // x.setAttribute("name", "file");
        // x.setAttribute("accept", "*");
 
        form.appendChild(imput);

        var body = new FormData(form);
        var data = JSON.stringify(props);
        body.append('data', data);
        var myInit = {
            method: 'POST',
            body: body,
            mode: 'no-cors',
        };
        var myRequest = new Request(AppParams.urlImages + "multipart", myInit);
        fetch(myRequest)
            .then(function (response) {
                if (callback) {
                    callback({
                        estado: "exito",
                        data: response.data
                    });
                }
            }).catch(error => {
                callback({
                    estado: "error",
                    error: error
                });
            })
    });
}
