import { StyleSheet } from "react-native"
import { STheme } from "../STheme"

type xs = "xs-1" | "xs-2" | "xs-3" | "xs-4" | "xs-5" | "xs-6" | "xs-7" | "xs-8" | "xs-9" | "xs-10" | "xs-11" | "xs-12";
type sm = "sm-1" | "sm-2" | "sm-3" | "sm-4" | "sm-5" | "sm-6" | "sm-7" | "sm-8" | "sm-9" | "sm-10" | "sm-11" | "sm-12";
type md = "md-1" | "md-2" | "md-3" | "md-4" | "md-5" | "md-6" | "md-7" | "md-8" | "md-9" | "md-10" | "md-11" | "md-12";
type lg = "md-1" | "lg-2" | "lg-3" | "lg-4" | "lg-5" | "lg-6" | "lg-7" | "lg-8" | "lg-9" | "lg-10" | "lg-11" | "lg-12";
type xl = "xl-1" | "xl-2" | "xl-3" | "xl-4" | "xl-5" | "xl-6" | "xl-7" | "xl-8" | "xl-9" | "xl-10" | "xl-11" | "xl-12";

type typencol = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
type typeUnion = xs | sm | md | lg | xl

type typeUnion2 = typeUnion[]

export type TypeCol = {
    'xs': typencol,
    'sm': typencol,
    'md': typencol,
    'lg': typencol,
    'xl': typencol,
} | typeUnion | typeUnion2


