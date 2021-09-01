import React, { Component } from 'react';
import { Image } from 'react-native';

const initialState = {
    estado: "Not Found",
    IMAGES: {},
    getImage: (url, props) => {
        if (!initialState.IMAGES[url]) {
            var Imagen = createImage(url, props);
            initialState.IMAGES[url] = Imagen;
        }
        return initialState.IMAGES[url];
    }
}
const createImage = (url, props) => {
    return <Image source={{
        uri: url+"?fecha="+new Date().getTime(),
    }} style={{
        resizeMode: "contain",
        width: "100%",
        height: "100%",
        ...props
    }} />
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "image") {
        switch (action.type) {
            case "cambio":
                cambio(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}
const cambio = (state, action) => {
    // fetch(action.url);
    state.IMAGES[action.url] = createImage(action.url,action.props)
    // alert("cambio imagen");
}