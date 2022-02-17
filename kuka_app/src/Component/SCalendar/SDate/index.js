import CalendarFunctions from "../CalendarFunctions";

export default class SDate {

    constructor(date) {
        if (!date) {
            this.date = new Date();
            return;
        }
        if (typeof date == "string") {
            this.date = new Date(date);
        } else {
            this.date = date;
        }
    }
    clone() {
        return new SDate(new Date(this.date.getTime()));
    }
    getTime() {
        return this.date.getTime();
    }
    getDay() {
        return this.date.getDate();
    }
    setDay(val) {
        this.date.setDate(val);
    }
    addDay(val) {
        this.date.setDate(this.getDay() + val);
    }
    addMonth(val) {
        this.date.setMonth(this.getMonth() - 1 + val);
    }
    getMonth() {
        return this.date.getMonth() + 1;
    }
    getMonthJson() {
        return CalendarFunctions.getMonth(this.getMonth());
    }
    getDayOfWeek() {
        return this.date.getDay();
    }
    getDayOfWeekJson() {
        return CalendarFunctions.getDayOfWeek(this.date.getDay());
    }
    equalDay(sdate) {
        if (this.toString("yyyy-MM-dd") == sdate.toString("yyyy-MM-dd")) {
            return true;
        }
        return false;
    }
    isAfter(sdate) {
        if (this.getTime() >= sdate.getTime()) {
            return true;
        }
        return false;
    }
    isBefore(sdate) {
        if (this.getTime() <= sdate.getTime()) {
            return true;
        }
        return false;
    }
    isCurDate() {
        if (this.toString("yyyy-MM-dd") == new SDate().toString("yyyy-MM-dd")) {
            return true;
        }
        return false;
    }
    formatCero(val) {
        var txt = val + "";
        if (txt.length > 1) {
            return val;
        }
        return "0" + val
    }
    toString(format) {
        if (!format) {
            format = "yyyy-MM-dd hh:mm"
        }
        var json = this.toJson();
        format = format.replace("yyyy", json.year);
        format = format.replace("MM", this.formatCero(json.month));
        format = format.replace("MONTH", this.getMonthJson(json.month).text);
        format = format.replace("MON", this.getMonthJson(json.month).textSmall);
        format = format.replace("dd", this.formatCero(json.day));
        format = format.replace("hh", this.formatCero(json.hour));
        format = format.replace("mm", this.formatCero(json.minutes));
        return format;
    }
    toJson() {
        return {
            minutes: this.date.getMinutes(),
            hour: this.date.getHours(),
            day: this.date.getDate(),
            dayOfWeek: this.date.getDay(),
            month: this.getMonth(),
            year: this.date.getFullYear()
        }
    }

}
