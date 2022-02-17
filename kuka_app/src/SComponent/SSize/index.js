import React, { Component } from 'react';
import { View, Text } from 'react-native';
let INSTANCE = {};
export default class SSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static getSize(colp) {
    if (!INSTANCE) return {};
    if (colp == "default") {
      return {}
    }
    var col = {};
    if (typeof colp == "string") {
      colp.split(" ").map((row) => {
        var cols = /((xs|sm|md|lg|xl)-(([0-9]{1,2}.[0-9])|([0-9]{1,2})))/.exec(row);
        if (cols[2] && cols[3]) {
          col[cols[2]] = cols[3];
        }
      })

    } else {
      col = colp;
    }

    const getMax = (type) => {
      var options = ["xs", "sm", "md", "lg", "xl"];
      var resp = false;
      var isMySize = false;
      for (let i = 0; i < options.length; i++) {
        var ms = options[i];
        if (ms == type) {
          isMySize = ms;
        }
        if (col[ms]) {
          resp = {
            col: ms,
            val: col[ms]
          }
        }
        if (isMySize) {
          if (resp) {
            return resp;
          } else {
            return {
              col: "xs",
              val: "12"
            };
          }
        }
      }
      return {
        col: "xs",
        val: "12"
      };
    }
    // var opts = col.split("-");
    var layout = INSTANCE.state.layout;
    if (!layout) {
      return {}
    }
    var maxMedida = {};
    if (layout.width >= 1200) {
      maxMedida = getMax("xl")
    } else if (layout.width >= 992) {
      maxMedida = getMax("lg")
    } else if (layout.width >= 768) {
      maxMedida = getMax("md")
    } else if (layout.width >= 576) {
      maxMedida = getMax("sm")
    } else {
      maxMedida = getMax("xs")
    }

    switch (maxMedida.col) {
      case "xl":
        return { width: ((maxMedida.val * 100) / 12) + "%" }
      case "lg":
        return { width: ((maxMedida.val * 100) / 12) + "%" }
      case "md":
        return { width: ((maxMedida.val * 100) / 12) + "%" }
      case "sm":
        return { width: ((maxMedida.val * 100) / 12) + "%" }
      case "xs":
        return { width: ((maxMedida.val * 100) / 12) + "%" }
      default: return { width: "100%" }
    }

  }

  render() {
    INSTANCE = this;
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        onLayout={(evt) => {
          if (this.state.layout) {
            var { width, height } = evt.nativeEvent.layout;
            var diference = Math.abs(this.state.layout.width - width);
            if (diference > 10) {
              this.setState({ layout: evt.nativeEvent.layout });
              this.props.repaint();
            }
          } else {
            this.setState({ layout: evt.nativeEvent.layout });
            this.props.repaint();
          }
          // console.log(evt.nativeEvent.layout)
        }}>
        {this.props.children}
      </View>
    );
  }
}
