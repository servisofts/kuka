import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as SSSocketNative from '../../../SSSocket';
const ContenidoBarra = (props) => {

    const getLista = () => {
        return SSSocketNative.getLog().map((data) => {
            var expresion = /\[(.*?)\m/
            var expresion2 = /\[.*?\m/
            if (typeof data == "object") {
                try {
                    data = JSON.stringify(data);
                } catch (error) {
                    data = error.message;                    
                }
            }
            var arr;

            try {
                arr = data.split(expresion2);
            } catch (error) {
                arr = [];
            }
            var dataFinal = "";
            var color = "#000";
            arr.map((dt) => {
                var res = expresion.exec(data);
                if (res) {
                    switch (res[1]) {
                        case "30":
                            color = "#000";
                            break;
                        case "31":
                            color = "#600";
                            break;
                        case "32":
                            color = "#060";
                            break;
                        case "33":
                            color = "#660";
                            break;
                        case "34":
                            color = "#006";
                            break;
                    }
                }
                dataFinal += dt
                // data = data.replace(expresion, "");
                // }
            })

            return (<>
                <Text style={{
                    flex: 1,
                    marginTop: 8,
                    color: color
                }}>
                    <Text style={{
                        color: "#ccc",
                        backgroundColor: "#ffffff55",

                    }}> LOG  : </Text>
                    {dataFinal}
                </Text>
            </>)
        });
    }
    return (
        <View style={{
            width: "100%",
            alignItems: "center",
            height: "100%",
        }}>
            <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <View style={{
                    flex: 1,
                }}></View>
                <Text style={{ flex: 5, color: "#fff", textAlign: "center", fontSize: 25, fontWeight: "bold" }}>SSConsole</Text>
                <TouchableOpacity style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center"
                }} onPress={props.closeBar}>
                    <Text style={{ flex: 5, color: "#fff", textAlign: "center", fontSize: 25, fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{
                width: "100%",
                height: "100%",
                transform: [
                    { rotate: "180deg" }
                ]
                // backgroundColor: "#f0f",
            }}>
                <View style={{
                    transform: [
                        { rotate: "180deg" }
                    ]
                }}>
                    {getLista()}
                </View>
            </ScrollView>
        </View>
    )
}

export default ContenidoBarra;
