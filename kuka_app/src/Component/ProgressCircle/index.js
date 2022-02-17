
import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
type Props = {
    strokeWidth: Number,
    initialColor: String,
    finalColor: String,
    porcentInicio: Number,
    duration: Number,
    width: Number,
    onFinish: Function
}
class ProgressCircle extends Component<Props> {

    constructor(props) {
        super(props);
        props = { ...this.defaultProps, ...props }
        this.state = {
            dimension: { width: this.props.width, height: this.props.width },
            anim: new Animated.Value(this.props.porcentInicio / 100)
        };
    }
    static defaultProps = {
        strokeWidth: 10,
        initialColor: "#00ff00",
        finalColor: "#ff0000",
        porcentInicio: 0,
        duration: 5000,
        width: 100,
        onFinish: () => { }
    }
    animateTo(value, duration) {
        
        Animated.timing(this.state.anim, {
            toValue: value,
            duration: !duration ? this.props.duration : duration,
            // useNativeDriver:true,
        }).start(()=>{
            this.props.onFinish()
            this.state.anim.setValue(value);
        });
        
    }
    componentDidMount() {

    }
    render() {
        var scale = this.state.dimension.width - this.props.strokeWidth;

        return (
            <View style={{
                width: this.state.dimension.width,
                height: this.state.dimension.width,
                borderRadius: 1000,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                transform: [
                    { rotateZ: "-90deg" }
                ]
            }}>
                <Svg width={this.state.dimension.width} height={this.state.dimension.width} fill="transparent" >
                    <AnimatedCircle
                        cx={this.state.dimension.width / 2}
                        cy={this.state.dimension.width / 2}
                        r={scale / 2}
                        stroke={this.state.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.props.initialColor, this.props.finalColor]
                        })}
                        strokeDasharray={scale * Math.PI}
                        strokeDashoffset={this.state.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [((scale * 0.001) * Math.PI), ((scale * 1) * Math.PI)]
                        })}
                        strokeWidth={this.props.strokeWidth} />
                </Svg>
                <View style={{
                    width: scale - this.props.strokeWidth / 2,
                    height: scale - this.props.strokeWidth / 2,
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1000,
                    overflow: "hidden",
                    transform: [
                        { rotateZ: "90deg" }
                    ]
                }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default ProgressCircle;
