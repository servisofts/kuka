
export const getItem= async (key,callback)=>{
    var text= localStorage.getItem(key)
    callback(text)
}
export const setItem=(key,data)=>{
    localStorage.setItem(key,data);
}
export const removeItem=(key)=>{
    localStorage.removeItem(key);
}