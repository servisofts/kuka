import Reducers from "./Reducer"
import Actions from "../../Actions";

import ListaPage from "./ListaPage"
import RegistroMesa from "./RegistroMesa"
import ReservaPage from "./ReservaPage";
import IngresoPage from "./IngresoPage";

export default {
    "MesaPage": ListaPage,
    RegistroMesa,
    ReservaPage,
    IngresoPage
}

export const Reducer = Reducers;
export const Action = Actions;
