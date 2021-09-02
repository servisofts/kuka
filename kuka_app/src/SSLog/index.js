
export const Log = (mensaje, color) => {console.log("\x1b["+(!color?"39":color)+"m" + "" + mensaje + "\x1b[39m")}
