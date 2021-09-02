import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import SImage from '../../../Component/SImage';

export default class ListaDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                borderRadius: 4,
                backgroundColor: "#eee",
                padding: 4,
                marginTop:4,
                width: "100%",
            }}>
                <Text>{this.props.title}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                    }}
                >
                    {this.props.data.map((obj) => {
                        return (<View style={{
                            width: 80,
                            height: 80,
                            margin: 4,
                            borderRadius: 4,
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <SImage source={obj.img} style={{
                                width: "60%",
                                height: "60%",
                                resizeMode: "contain"
                            }} />
                            <Text>{obj.title}</Text>
                        </View>)
                    })}

                </ScrollView>
            </View>
        );
    }
}
