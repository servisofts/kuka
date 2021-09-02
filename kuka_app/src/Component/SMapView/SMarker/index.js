import React, { Component } from 'react';

const SMarker = (props) => {
    return <div style={{
        cursor: "pointer",
        textAlign: "center",
    }}
        onClick={() => {
            props.onPress();
        }}>
        {props.contenido}
    </div>
}
export default SMarker;