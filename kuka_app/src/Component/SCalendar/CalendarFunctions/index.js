import CalendarParams from "../CalendarParams"

export default class CalendarFunctions {
    static getMonthsOfYear = () => {
        return CalendarParams.month;
    }
    static getMonth = (month) => {
        var dateJson = CalendarParams.month[month]
        return {
            ...dateJson,
            month: month,
        };
    }
    static getDaysOfWeek = () => {
        return CalendarParams.dayOfWeek;
    }
    
    static getDayOfWeek = (dia) => {
        var dateJson = CalendarParams.dayOfWeek[dia]
        return {
            ...dateJson,
            day: dia,
        };
    }
}
