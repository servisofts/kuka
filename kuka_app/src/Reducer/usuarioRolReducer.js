const initialState = {
    estado: "Not Found",
    data: false,
    data:{},
    rol:{},
    usuario:{}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "usuarioRol") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "anular":
                anular(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
            if(state.rol[action.data.key_rol]){
                state.rol[action.data.key_rol][action.data.key_usuario]  = action.data.key;    
            }
            if(state.usuario[action.data.key_usuario]){
                state.usuario[action.data.key_usuario][action.data.key_rol]  = action.data.key;    
            }
            // state.data[action.data.key] = action.data;
        }
        state.lastRegister = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
        if(!state.rol[action.data.key_rol]){
            state.rol[action.data.key_rol] = {};
        }
        state.rol[action.data.key_rol][action.data.key_usuario]=action.data.key
        
        if(!state.usuario[action.data.key_usuario]){
            state.usuario[action.data.key_usuario] = {};
        }
        state.usuario[action.data.key_usuario][action.data.key_rol]=action.data.key
        state.lastEdit = action.data;
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = {
            ...state.data,
            ...action.data
        }
        if(action.key_rol){
            state.rol[action.key_rol] = {};
        }
        if(action.key_usuario){
            state.usuario[action.key_usuario] = {};
        }
        Object.keys(action.data).map((key)=>{
            var obj = action.data[key];
            if(!state.rol[obj.key_rol]){
                state.rol[obj.key_rol] = {};
            }
            state.rol[obj.key_rol][obj.key_usuario]=obj.key
            
            if(!state.usuario[obj.key_usuario]){
                state.usuario[obj.key_usuario] = {};
            }
            state.usuario[obj.key_usuario][obj.key_rol]=obj.key
        })
    }
}

const anular = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            delete state.data[action.data.key];

            if(state.rol[action.data.key_rol]){
                delete state.rol[action.data.key_rol][action.data.key_usuario];
            }
            if(state.usuario[action.data.key_usuario]){
                delete state.usuario[action.data.key_usuario][action.data.key_rol];
            }
        }
    }
}
