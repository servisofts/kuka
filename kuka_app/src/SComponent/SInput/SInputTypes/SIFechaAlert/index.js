import React, { Component } from 'react';
import { View, Text, NativeScrollEvent } from 'react-native';
import SScrollView, { onSrollEndEvt } from '../../../SScrollView';
import { SText } from '../../../SText';
import { SView } from '../../../SView';
import SDate from '../../../SDate';
import SThread from '../../../../Component/SThread';
import { STheme } from '../../../STheme';
import SBackground from '../../../SBackground';
import { SScrollView2 } from '../../../../SComponent';
type typeResp = {
    year: Number,
    month: Number,
    day: Number
}
type typeConfig = {
    defaultValue: SDate,
    minYear: Number,
    maxYear: Number,
}
type typeProps = {
    style: ViewStyle,
    props: typeConfig,
    onChange: { (value: SDate): boolean }
    // ViewPropTypes,
    // TouchableOpacityProps,
    //callBack:Function,
}
export default class SIFechaAlert extends Component<typeProps> {
    constructor(props) {
        super(props);
        this.sdate = new SDate(new Date())
        if (this.props.props.defaultValue) {
            this.sdate = this.props.props.defaultValue
        }
        this.state = {
            initial: {
                year: this.sdate.get("year"),
                month: this.sdate.get("month"),
                day: this.sdate.get("day"),
            },
            select: {
                year: 0,
                month: 0,
                day: 0,
            }
        };
        this.scroll = {};
        this.refItens = {
            year: {},
            month: {},
            day: {},
        };
        this.inital();
    }
    inital() {
        new SThread(100, "moveDate", true).start(() => {
            var ready = true;
            if (!this.state.select["year"]) {
                this.selectIten("year", this.state.initial["year"])
                ready = false;
            }
            if (!this.state.select["month"]) {
                this.selectIten("month", this.state.initial["month"])
                ready = false;
            }
            if (!this.state.select["day"]) {
                this.selectIten("day", this.state.initial["day"])
                ready = false;
            }
            if (!ready) {
                this.inital();
            }
        })
    }
    onScrollEnd = (key, evt: onSrollEndEvt) => {
        var center = (evt.vertical.contentOffset.y + (evt.vertical.layoutMeasurement.height / 2));
        Object.keys(this.refItens[key]).map((keyD) => {
            var obj = this.refItens[key][keyD];
            if (!obj) return;
            var layout = obj.getLayout()
            if (
                layout.y < center
                && layout.y + layout.height > center
            ) {
                this.selectIten(key, obj.getProp("data").val)
            }
        })
    }
    selectIten(key, y) {
        if (this.refItens[key][y]) {
            var lay = this.refItens[key][y].getLayout();
            if (!lay) {
                return false;
            }
            this.scroll[key].scrollTo({ x: lay.x + 50, y: lay.y + 20 });
            this.state.select[key] = y;
            this.setState({ select: { ...this.state.select } })
            var sdate = new SDate(this.state.select.year + "-" + SDate.formatCero(this.state.select.month) + "-" + SDate.formatCero(this.state.select.day), "yyyy-MM-dd");
            if (sdate.isValid()) {
                if (this.props.onChange) this.props.onChange(sdate)
            }
            return true;
        }
        return false;
    }
    getListaKey = (key) => {
        var arr = [];
        switch (key) {
            case "year":
                for (let i = (!this.props.props.minYear ? 1888 : this.props.props.minYear); i <= (!this.props.props.maxYear ? (new SDate(new Date()).toJson().year) : this.props.props.maxYear); i++) {
                    arr.push({
                        type: key,
                        val: i,
                        data: i + ""
                    })
                }
                break;
            case "month":
                for (let i = 1; i <= 12; i++) {
                    arr.push({
                        type: key,
                        val: i,
                        data: SDate.getMonth(i).text,
                    })
                }
                break;
            case "day":
                for (let i = 1; i <= 31; i++) {
                    arr.push({
                        type: key,
                        val: i,
                        data: i + ""
                    })
                }
                break;
        }
        return arr.map((obj) => {
            if (obj.type == "day" && this.state.select.year && this.state.select.month) {
                var fecha = this.state.select.year + "-" + this.state.select.month + "-" + obj.val
                if (!SDate.isValid(fecha)) {
                    return <View />
                }
            }

            return (<SView
                props={{
                    variant: "center"
                }}
                style={{
                    width: "100%",
                    height: 40,
                }}
                data={obj}
                ref={(ref) => { this.refItens[obj.type][obj.val + ""] = ref }}
                onPress={(evt) => {
                    this.scroll[key].scrollTo({ x: evt.layout.x + 50, y: evt.layout.y + 20 });
                }}>

                <SText options={{
                    variant: "h3",
                    type: "primary"
                }}>
                    {obj.data}

                </SText>
            </SView>)
        });
    }
    // componentDidMount() {
    // setTimeout(() => {
    //     this.scroll["year"].scrollToEnd();
    //     this.scroll["month"].scrollToEnd();
    //     this.scroll["day"].scrollToEnd();
    // }, 2000)
    // }
    getLista = (key,size) => {
        return <SView props={{
            col:size,
            height: "100%",
            variant: "center"
        }}>

            <SView style={{
                position: "absolute",
                width: "100%",
                height: 40,
                backgroundColor: STheme().colorPrimary + "44"
            }}>

            </SView>
            <SScrollView2 disableHorizontal
                ref={(ref) => { this.scroll[key] = ref }}
                // reverse
                onScrollEnd={(evt) => {
                    this.onScrollEnd(key, evt);
                }}
            >
                <SView style={{
                    width: "100%",
                }}>
                    <SView style={{
                        height: 80
                    }}></SView>
                    {this.getListaKey(key)}
                    <SView style={{
                        height: 80
                    }}></SView>
                </SView>
            </SScrollView2>

        </SView>;
    }
    getInfo() {
        return <SView props={{
            direction: "row",
        }} style={{
            flex: 1,
        }}>
            {JSON.stringify(this.state.select)}
        </SView>
    }
    render() {
        return <SView
            props={{
                col: "xs-11 md-6",
                variant: "center",
                withoutFeedback: true
            }}
            style={{
                height: 200,
                borderRadius: 8,
                // overflow:"hidden"
            }}>
            <SBackground />
            <SView props={{
                direction: "row"
            }} style={{
                width: "100%",
                height: 200,
            }}>
                {this.getLista("day","xs-3")}
                {this.getLista("month","xs-6")}
                {this.getLista("year","xs-3")}
            </SView>
        </SView>
    }
}
SIFechaAlert.defaultProps = {
    props: {},
    style: {}
};