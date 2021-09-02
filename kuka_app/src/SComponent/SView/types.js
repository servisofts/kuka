import { StyleSheet } from "react-native"
import { STheme } from "../STheme"

export type TypeType = "default"

export const Type = (type: TypeType) => {

    switch (type) {
        default:
            return StyleSheet.create({
                "View": {
                    backgroundColor: STheme().colorPrimary,
                }
            })
    }

}

