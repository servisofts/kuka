import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import CalendarFunctions from '../CalendarFunctions';
import { SDate } from '../../../SComponent'
import Task from './Task';
import { SView, STheme, SAPanResponder } from '../../../SComponent'

export default class SC_Mes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new SDate(),

        };
        this.anim = new Animated.ValueXY({ x: 0, y: 0 });
        this.createPan();
        this.refDay = {};

    }
    getSDate() {
        return this.state.date;
    }
    getHeader() {
        var daysOfWeek = CalendarFunctions.getDaysOfWeek()
        var daysOfWeekItems = Object.keys(daysOfWeek).map((key) => {
            var day = daysOfWeek[key];
            return <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[this.props.style.text, { fontSize: 12 }]}>{day.textSmall}</Text>
            </View>
        })
        return <View style={[{
            width: "100%",
            flexDirection: "row",
            height: 20,
            alignItems: "center",
        },
        this.props.style.border
        ]}>
            {daysOfWeekItems}
        </View>
    }
    getControll() {
        return <View style={[{
            width: "98%",
            flexDirection: "row",
            height: 40,
            alignItems: "center",
        }, this.props.style.border]}>

            <TouchableOpacity style={{
                flex: 5,
                height: "100%",
                justifyContent: "center",
            }}>
                <Text style={[this.props.style.text, { fontSize: 20 }]}>{this.state.date.toString("MONTH de yyyy")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.state.date.addMonth(-1);
                this.setState({ ...this.state })
            }}>
                <Text style={[this.props.style.text, { fontSize: 30 }]}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.state.date.addMonth(1);
                this.setState({ ...this.state })
            }}>
                <Text style={[this.props.style.text, { fontSize: 30 }]}>{">"}</Text>
            </TouchableOpacity>
        </View>
    }
    getSelectorDrag(date) {
        return <SView
            {...this.pan.getPanHandlers()}
            ref={(ref) => { this.selector = ref }}
            props={{
                animated: true
            }}
            style={{
                position: "absolute",
                borderRadius: 100,
                width: 30,
                height: 30,
                backgroundColor: "#ff000066",
                transform: [
                    { translateX: this.anim.x },
                    { translateY: this.anim.y }
                ]
            }}>

        </SView>
    }

    getSelect(isCurDate) {
        if (!isCurDate) {
            return <View />
        }
        return <SView
            ref={(ref) => { this.selector = ref }}
            props={{
                animated: true
            }}
            style={{
                position: "absolute",
                borderRadius: 100,
                width: 30,
                height: 30,
                backgroundColor: "#ff000066",
            }}>

        </SView>
    }
    getBody() {
        var date = this.state.date.clone();
        date.setDay(1);
        date.addDay(-date.getDayOfWeek());
        // date.addDay(-1);
        // date.addDay(date.getDay()*-1)
        var ITEM_mes = []
        for (let semana = 1; semana <= 6; semana++) {
            var ITEM_semana = []
            for (let dia = 0; dia <= 6; dia++) {
                date.addDay(1);
                var dateJson = date.toJson();
                var isCurMonth = (dateJson.month == this.state.date.getMonth())
                var isCurDate = date.isCurDate();
                var dateClone = date.clone();
                ITEM_semana.push(
                    <View style={{
                        flex: 1,
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        // borderRadius:8,
                        borderBottomWidth: 1,
                        borderColor: "#66000044",
                        backgroundColor: (isCurMonth ? "#66000011" : "#66000044")
                    }}>
                        <SView style={{
                            flex: 1,
                            width: "100%",
                        }} onPress={() => {
                            var fecha_fin = dateClone.clone();
                            fecha_fin.addDay(this.props.task.dias - 1);
                            this.props.onChange({
                                fecha_inicio: dateClone,
                                fecha_fin: fecha_fin
                            })
                        }}
                            refData={(ref, key) => {
                                if (key) {
                                    this.refDay[key] = ref;
                                }
                            }} data={date.toString("yyyy-MM-dd")}>
                            <SView
                                props={{
                                }}
                                style={{
                                    width: 30,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Text style={[
                                    {
                                        fontSize: 14,
                                        color: (isCurMonth ? "#fff" : "#666")
                                    },
                                ]}>{date.toString("dd")}</Text>
                            </SView>
                            {this.getSelect(isCurDate)}
                        </SView>
                        <Task date={date.clone()} task={this.props.task} />
                    </View >
                )
            }
            ITEM_mes.push(<View style={[{
                width: "100%",
                flexDirection: "row",
                height: 60,
                alignItems: "center",

            },
                // this.props.style.border
            ]}>
                {ITEM_semana}
            </View>);
        }
        return <View style={[{
            width: "100%",
            alignItems: "center",
        }, this.props.style.border]}>
            {ITEM_mes}
            {/* {this.getSelectorDrag(date)} */}

        </View>;
    }
    render() {
        if (!this.props.layout) {
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={[{
                width: "100%",
                alignItems: "center",
                // backgroundColor: "#fff"
            }]}>
                {this.getControll()}
                {this.getHeader()}
                {this.getBody()}
            </View>
        );
    }

    createPan() {
        this.pan = new SAPanResponder({
            onGrand: (e, gs) => {
                this.startAnim = {
                    x: this.anim.x._value,
                    y: this.anim.y._value,
                }
                this.anim.flattenOffset();
            },
            onMove: (e, gs) => {
                // if (this.startWidth + gs.dx <= 10) {
                //     return;
                // }
                this.anim.setValue({ x: this.startAnim.x + gs.dx, y: this.startAnim.y + gs.dy })
                if (this.refDay) {
                    var layoutSelc = this.selector.getLayout();
                    var layoutSelcCenter = {
                        x: layoutSelc.left + this.anim.x._value + (layoutSelc.width / 2),
                        y: layoutSelc.top + this.anim.y._value + (layoutSelc.height / 2)
                    }
                    Object.keys(this.refDay).map((keyDay) => {
                        var objDay: SView = this.refDay[keyDay];
                        if (objDay) {
                            var layoutDay = objDay.getLayout();
                            // console.log(layoutDay);
                            if (
                                (layoutDay.left < layoutSelcCenter.x && layoutDay.left + layoutDay.width > layoutSelcCenter.x)
                                && (layoutDay.top < layoutSelcCenter.y && layoutDay.top + layoutDay.height > layoutSelcCenter.y)
                            ) {
                                if (this.props.onChange) {
                                    if (this.props.task) {
                                        var fecha_inicio = new SDate(keyDay, "yyyy-MM-dd");
                                        if (fecha_inicio.isBefore(this.state.date) || fecha_inicio.equalDay(this.state.date)) {
                                            fecha_inicio = this.state.date;
                                        }
                                        var fecha_fin = fecha_inicio.clone();
                                        fecha_fin.addDay(this.props.task.dias - 1);
                                        if (!fecha_inicio || !fecha_fin) {
                                            console.log("das")
                                            return;
                                        }
                                        if (fecha_inicio.equalDay(this.props.task.fecha_inicio) && fecha_fin.equalDay(this.props.task.fecha_fin)) {
                                            return;
                                        }

                                        this.props.onChange({
                                            fecha_inicio: fecha_inicio,
                                            fecha_fin: fecha_fin
                                        })
                                    }
                                }
                            }
                        }
                    })
                }
            },
            onRelease: () => {
            }
        });
    }
}
