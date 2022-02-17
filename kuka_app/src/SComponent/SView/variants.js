import { StyleSheet } from "react-native"
import { STheme } from "../STheme"

export type Typesp = "default" | "center" | "center-horizontal" | "center-vertical" | "col-square"


export type TypeVariant = Typesp | [Typesp]

const getType = (type: TypeVariant) => {
    switch (type) {
        case "center":
            return StyleSheet.create({
                "View": {
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                }
            })
        case "center-horizontal":
            return StyleSheet.create({
                "View": {
                    justifyContent: "center"
                }
            })
        case "center-vertical":
            return StyleSheet.create({
                "View": {
                    alignItems: "center"
                }
            })
        case "col-square":
            return StyleSheet.create({
                "View": {
                   
                }
            })
        default:
            return StyleSheet.create({
                "View": {
                    overflow: "hidden",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }
            })
    }
}

export const Variant = (type: TypeVariant) => {
    var arrStyles = type;
    if (typeof type == "string") {
        arrStyles = type.split(" ");
    }
    var styleTemp = [getType("default")]
    for (let i = 0; i < arrStyles.length; i++) {
        styleTemp.push(getType(arrStyles[i]));
    }
    return StyleSheet.flatten(styleTemp)
}



