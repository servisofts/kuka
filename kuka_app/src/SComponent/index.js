import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { SThemeChange, SThemeClass, STheme } from './STheme';
import { SContainer } from './SContainer';
import { SText } from './SText';
import { SButtom } from './SButtom';
import { SAnimated } from './SAnimated';
import SPopup, { SPopupOpen, SPopupClose } from './SPopup';
import SSize from './SSize';
import { SInput } from './SInput';
import { SView } from './SView';
import SThread from './SThread';
import SAPanResponder from './SAnimated/SAPanResponder'
import SScrollView from './SScrollView'
import SScrollView2 from './SScrollView2'
import SImage from './SImage';
import SBackground from './SBackground';
import SSound from './SSound';
import SDate from './SDate';
import SForm from './SForm';
import SCalendar from './SCalendar';
export {
    SForm,
    SDate,
    STheme,
    SSound,
    SText,
    SButtom,
    SContainer,
    SThemeChange,
    SPopup,
    SPopupOpen,
    SPopupClose,
    SSize,
    SAnimated,
    SInput,
    SView,
    SThread,
    SAPanResponder,
    SScrollView,
    SScrollView2,
    SImage,
    SBackground,
    SCalendar
}
export class SComponentClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    repaint = () => {
        this.setState({ repaint: true })
    }
    getChildrens = () => {
        if (this.state.repaint) {
            this.setState({ repaint: false })
            return <View />
        }
        return this.props.children;
    }
    render() {
        return (<SView
            style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                alignItems: "stretch",
                overflow: "hidden",
                ...(Platform.OS == "web" ? {
                    position: "fixed",
                } : {
                    flex: 1,
                })
            }}>
            <SSize repaint={() => this.repaint()} >
                {this.getChildrens()}
            </SSize>
            <SThemeClass repaint={() => this.repaint()} />
            <SPopup />
        </SView>
        );
    }
}