import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { View } from 'react-native';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class DropArea {

    static propTypes = {
        children: PropTypes.node,
    };

    constructor(onChange) {
        this.onChange = onChange;
        this._popup = document.createElement('div');
        this._popup.id = "dropFile"
        this._popup.style.width = "100%";
        this._popup.style.height = "100vh";
        this._popup.style.background = "#000000aa";
        this._popup.style.position = "fixed";
        this._popup.style.display = "flex";
        this._popup.style.top = 0;
        this._popup.style.left = 0;
        this._popup.style.zIndex = 999;
        this._popup.style.justifyContent = "center";
        this._popup.style.alignItems = "center";
        document.body.appendChild(this._popup);
        this._popup.addEventListener('click', () => {
            document.getElementById("dropFile").remove();
        })
        this._render();
    }

    // componentWillUnmount() {
    //     ReactDOM.unmountComponentAtNode(this._popup);
    //     document.body.removeChild(this._popup);
    // }

    getChildren() {
        return <div style={{
            width: "90%",
            height: "90%",
            backgroundColor: "#ffffffaa",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            position: "absolute"
        }} id="dropFile-area" className="dropZone">
            <div id={"contenido"} style={{
                width: "100%",
                height: "100%",
                position: "absolute"
            }}>

            </div>
            <input type='file' name='file' className='drop-zone__input' accept="*" style={{
                display: "none"
            }} />
            <span style={{
                color: "#999"
            }}>Drop file or click to upload!!!</span>
        </div>
    }
    esperar = async () => {
        await delay(300)
        var dropFileArea = document.getElementById("dropFile-area");
        document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
            const dropZoneElement = inputElement.closest(".dropZone");
            dropZoneElement.addEventListener("click", (e) => {
                inputElement.click();
                e.stopPropagation();
            });

            inputElement.addEventListener("change", (e) => {
                if (inputElement.files.length) {
                    alert("change" + inputElement.files.length)
                    // updateThumbnail(dropZoneElement, inputElement.files[0]);
                }
            });

            dropZoneElement.addEventListener("dragover", (e) => {
                e.preventDefault();
                // dropZoneElement.classList.add("drop-zone--over");
            });

            ["dragleave", "dragend"].forEach((type) => {
                dropZoneElement.addEventListener(type, (e) => {
                    // dropZoneElement.classList.remove("drop-zone--over");
                });
            });

            dropZoneElement.addEventListener("drop", (e) => {
                e.preventDefault();
                var Load = 0;
                if (e.dataTransfer.files.length) {
                    var listItem = [];
                    inputElement.files = e.dataTransfer.files;
                    this.onChange(inputElement);
                    document.getElementById("dropFile").remove();
                }
            });
        });
    }
    _render() {
        ReactDOM.render(this.getChildren(), this._popup);
        this.esperar();
    }

}