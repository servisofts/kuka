import { Platform, StyleSheet } from "react-native"
import { STheme } from "../STheme"

//------ESTILOS------
// En los estilos NO SE DEVE colocar
//Tamanhos y fomas


type Typesp = "default" | "primary" | "secondary" | "calistenia"


export type TypeStyles = Typesp | [Typesp]

const getType = (type: TypeStyles) => {
    switch (type) {
        case "calistenia":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorPrimary + "22",
                    borderWidth: 1,
                    borderColor: STheme().colorOpaque+"44",
                    borderRadius: 4,
                    marginTop: 32,
                    paddingStart:8,
                },
                "LabelStyle": {
                    position: "absolute",
                    top: -22,
                    left: 8,
                    fontSize: 14,
                    color:STheme().colorPrimary,
                    // backgroundColor:STheme().colorPrimary+"22",
                    // borderRadius:4,
                    // padding:4,

                },
                "InputText": {
                    fontSize: 14,
                    color: STheme().colorPrimary,
                    ...(Platform.OS != "web" ? {} : { placeholderTextColor: STheme().colorOpaque }),
                },
                "placeholder": {
                    color: STheme().colorOpaque
                },
                "error": {
                    borderColor: STheme().colorDanger,
                    // color: STheme().colorPrimary + "66"
                },
            })
        case "secondary":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorSecondary,
                    borderWidth: 1,
                    borderColor: STheme().colorPrimary,
                    borderRadius: 4,
                },
                "LabelStyle": {

                },
                "InputText": {
                    padding: 4,
                    color: STheme().colorPrimary,
                    ...(Platform.OS != "web" ? {} : { placeholderTextColor: STheme().colorOpaque }),
                },
                "placeholder": {
                    color: STheme().colorOpaque
                },
                "error": {
                    borderColor: STheme().colorDanger,
                    // color: STheme().colorPrimary + "66"
                },
            })
        case "primary":
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorPrimary,
                    borderWidth: 1,
                    borderColor: STheme().colorSecondary,
                    borderRadius: 4,
                },
                "LabelStyle": {

                },
                "InputText": {
                    padding: 4,
                    color: STheme().colorSecondary,
                    ...(Platform.OS != "web" ? {} : { placeholderTextColor: STheme().colorOpaque + "aa" }),
                },
                "placeholder": {
                    color: STheme().colorOpaque + "aa"
                },
                "error": {
                    borderColor: STheme().colorDanger,
                    // color: STheme().colorPrimary + "66"
                },
            })
        default:
            return StyleSheet.create({
                "View": {

                },
                "LabelStyle": {

                },
                "InputText": {

                },
                "placeholder": {
                },
                "error": {
                    borderColor: STheme().colorDanger,
                },
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

