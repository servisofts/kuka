import React, { Component } from 'react';
import { Image } from 'react-native';

const SImage = (props) => {
    return (
        <Image {...props} />
    );
}
SImage.prototype = {
    source: String
}
export default SImage;