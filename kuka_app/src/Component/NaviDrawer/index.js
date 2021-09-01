import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, Animated, Dimensions } from 'react-native';
import Responsive from '../Responsive';
import NaviDrawerContent from './NaviDrawerContent';

export default class NaviDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      animatedTime: 350,
    };
    this.fadeAnim = new Animated.Value(0);
  }

  open() {
    this.state.isOpen = true;
    this.setState({ ...this.state });
    Animated.timing(
      this.fadeAnim,
      {
        toValue: 100,
        duration: this.state.animatedTime,
      }
    ).start();

  }
  close() {
    Animated.timing(
      this.fadeAnim,
      {
        toValue: 0,
        duration: this.state.animatedTime / 4 * 3,
      }
    ).start(() => {
      this.state.isOpen = false;
      this.setState({ ...this.state });
    });

  }

  render() {
    if (!this.state.isOpen) {
      return <View />
    }
    return (
      <TouchableWithoutFeedback onPress={(evt) => {
        this.close();
      }}>
        <Animated.View style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: this.fadeAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["#00000000", "#00000099"]
          }),
          display: (!this.state.isOpen ? "none" : "flex")
        }}>
          <TouchableWithoutFeedback>
            <Animated.View style={{
              position: "absolute",
              height: Responsive.height(),
              backgroundColor: "#fff",
              width: "60%",
              left: this.fadeAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [(Dimensions.get("window").width * 0.6 > 400 ? -400 : Dimensions.get("window").width * 0.6 * -1), 0]
              }),
              maxWidth: 400,
            }}>
              <NaviDrawerContent {...this.props} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
