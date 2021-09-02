type TypeOrdenar = {
    key: String,
    order: "asc" | "desc",
    peso: Number
}
export default class SOrdenador {

    constructor(arrProps:TypeOrdenar[]) {
        this.arrProps = arrProps;
    }
    ordernarObject(data) {
        this.data = data;
        if (!this.data) {
            return [];
        }

        var arr = Object.keys(this.data);
        if (arr.length <= 0) {
            return [];
        }
        // var ordInt = (order == "asc" ? 1 : -1);
        var instance = this;
        arr.sort((a, b) => {
            // 0 iguales , 1 mayor ,  -1 menor
            var peso = 0;
            for (let i = 0; i < this.arrProps.length; i++) {
                const prop = this.arrProps[i];
                var prioridad = prop.peso || this.arrProps.length - i;
                var ordInt = (prop.order == "asc" ? 1 : -1);
                var valA = instance.data[a][prop.key] || 1;
                var valB = instance.data[b][prop.key] || 1;
                if (typeof valA == "string") valA = valA.toLowerCase();
                if (typeof valB == "string") valB = valB.toLowerCase();
                // console.log(prop)
                // console.log(valA)
                // console.log(valA)
                peso += (valA < valB) ? (-1 * prioridad * ordInt) : (valA > valB) ? (1 * prioridad * ordInt) : 0;
            }
            return (peso < 0) ? (-1) : (peso > 0) ? (1) : 0;
            // 
        })
        return arr;
    }
    ordernarArr({ key, order }) {
        return [];
    }
}
