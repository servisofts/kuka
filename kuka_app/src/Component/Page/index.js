import React, { Component } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { SView, SScrollView2 } from '../../SComponent';
import BackgroundImage from '../BackgroundImage';
import BarraSuperior from '../BarraSuperior';

type PageType = {
  title: String,
  navigation: 'this.props.navigation',
  style: ViewStyle
}

export default class Page extends Component<PageType> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SView style={{
        width: "100%",
        flex: 1,
      }}>
        <BackgroundImage />
        <BarraSuperior navigation={this.props.navigation} title={this.props.title} goBack={() => {
          if (this.props.navigation) {
            this.props.navigation.goBack();
          }
        }} />
        <SView style={{
          width: "100%",
          flex: 1,
          ...this.props.style
        }}>
          {this.props.children}
        </SView>
      </SView>
    );
  }
}
