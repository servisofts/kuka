import { StyleSheet, View, ColorPropType } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng,
}
export type propsType = {
    colorPrimary: ColorPropType,
    colorSecondary: ColorPropType,
    backgroundColor: ColorPropType,
    colorDanger: ColorPropType,
    colorSuccess: ColorPropType,
    colorOpaque: ColorPropType,
    card: string

}
const Themas = {
    default: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        backgroundColor: "#222222",
        colorDanger: "#C31C37",
        colorOpaque:"#444444",
        colorSuccess: "#8BCB2A",
        card:"#272021aa"
    },
    dark: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        backgroundColor: "#dddddd",
        colorDanger: "#C31C37",
        colorOpaque:"#884444",
        colorSuccess: "#8BCB2A",
        card:"#27202166"

    }
};
export default Themas;