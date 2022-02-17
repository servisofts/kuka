import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
const NaviDrawerButtom = (props) => {
  return (
    <TouchableOpacity style={{
      position: "absolute",
      left: 10,
      bottom: 10,
      width: 60,
      height: 60,
      backgroundColor: "#00000099",
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#eee",
      justifyContent: "center",
      alignItems: "center"
    }} onPress={() => {
      props.open();
    }}>
      <Text style={{
        color: "#fff"
      }}>MENU</Text>

    </TouchableOpacity>
  );
}
export default NaviDrawerButtom;