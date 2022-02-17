import { AsyncStorage } from "react-native"

export const getItem=async (key,callback)=>{
    AsyncStorage.getItem(key).then((resp)=>{
        console.log(resp);
        callback(resp);
        ////
    });
    // return {}
}
export const setItem=(key,data)=>{
    AsyncStorage.setItem(key,data);
}
export const removeItem=(key)=>{
    AsyncStorage.removeItem(key);
}