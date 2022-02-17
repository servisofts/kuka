import moment from "moment"

export const SFechaFormat = (fecha) => {
    var date = new Date(fecha);
    if (isNaN(date.getTime())) {
        return "--";
    }
    var fecha = moment(fecha).format("YYYY/MM/DD HH:mm");
    return fecha;
}
export const SDateFormat = (fecha) => {
    var date = new Date(fecha);
    if (isNaN(date.getTime())) {
        return "--";
    }
    var fecha = moment(fecha).format("YYYY/MM/DD");
    return fecha;
}
export const SFechaDiff = (fecha, fechaFin) => {
    var date = new Date(fecha);
    if (isNaN(date.getTime())) {
        return "--";
    }
    var date2 = new Date(fechaFin);
    if (isNaN(date2.getTime())) {
        return "--";
    }
    var fechai = moment(fecha);
    var fechaf = moment(fechaFin);

    return moment(fechaf - fechai).format('D[ días] H[ h] m[ m]');
}
