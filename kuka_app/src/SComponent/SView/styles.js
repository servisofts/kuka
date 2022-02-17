import { StyleSheet } from "react-native"
import { STheme } from "../STheme"

//------ESTILOS------
// En los estilos NO SE DEVE colocar
//Tamanhos y fomas


type Typesp = "default" | "primary" | "secondary"


export type TypeStyles = Typesp | [Typesp]

const getType = (type: TypeStyles) => {
    switch (type) {
        case "secondary":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorSecondary,
                }
            })
        case "primary":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorPrimary,
                }
            })
        default:
            return StyleSheet.create({
                "View": {
                }
            })
    }
}

export const CustomStyles = (type: TypeStyles) => {
    var arrStyles = type;
    if (typeof type == "string") {
        arrStyles = type.split(" ");
    }
    var styleTemp = []
    for (let i = 0; i < arrStyles.length; i++) {
        styleTemp.push(getType(arrStyles[i]));
    }
    return StyleSheet.flatten(styleTemp)
}

