import React, { Component } from 'react';
import {  Dimensions } from 'react-native';

const Responsive = {
    width:()=>{
        return Dimensions.get("window").width;
    },
    height:()=>{
        return Dimensions.get("window").height;
    }
}
export default Responsive;