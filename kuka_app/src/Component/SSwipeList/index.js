import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated, PanResponder, ScrollView } from 'react-native';
import SwipeIten from './SwipeIten';

export default class SSwipeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dimensiones: false,
        }
    }

    componentDidMount() {

    }

    getItens() {
        if (!this.state.dimensiones) {
            return <View />
        }
        if (!this.props.children) {
            return <View />
        }
        return this.props.children.map((obj, key) => {
            if (!obj) {
                return <View />
            }
            return (<SwipeIten dimensiones={this.state.dimensiones} obj={obj.props.obj} key={key} style={{
                marginTop: 8,
                // height:"100%",
                flex: 1,
                justifyContent: "center",
            }}
                leftContent={this.props.leftContent}
                leftAction={this.props.leftAction}
                rigthContent={this.props.rigthContent}
                rigthAction={this.props.rigthAction}

            >
                {obj}
            </SwipeIten>)
        })
    }

    render() {
        return (
            <View style={{ flex: 1,  justifyContent: 'center', ...this.props.style }} >
                <ScrollView style={{
                    width: "100%",
                    // height:"100%",
                    // height:this.props.style.height
                }}
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                    {...this.props.scrollProps}
                    disableScrollViewPanResponder={true}
                    onLayout={(evt) => {
                        var { x, y, width, height } = evt.nativeEvent.layout;
                        this.state.dimensiones = {
                            x, y, width, height
                        }
                        this.setState({ ...this.state });
                    }}>
                    {this.getItens()}
                </ScrollView>
            </View>
        )
    }
}
