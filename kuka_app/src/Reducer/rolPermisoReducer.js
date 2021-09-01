const initialState = {
    estado: "Not Found",
    data: false,
    data:{},
    rol:{},
    permiso:{}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "rolPermiso") {
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
                state.rol[action.data.key_rol][action.data.key_permiso]  = action.data.key;    
            }
            if(state.permiso[action.data.key_permiso]){
                state.permiso[action.data.key_permiso][action.data.key_rol]  = action.data.key;    
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
        state.rol[action.data.key_rol][action.data.key_permiso]=action.data.key
        
        if(!state.permiso[action.data.key_permiso]){
            state.permiso[action.data.key_permiso] = {};
        }
        state.permiso[action.data.key_permiso][action.data.key_rol]=action.data.key
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
        if(action.key_permiso){
            state.permiso[action.key_permiso] = {};
        }
        Object.keys(action.data).map((key)=>{
            var obj = action.data[key];
            if(!state.rol[obj.key_rol]){
                state.rol[obj.key_rol] = {};
            }
            state.rol[obj.key_rol][obj.key_permiso]=obj.key
            
            if(!state.permiso[obj.key_permiso]){
                state.permiso[obj.key_permiso] = {};
            }
            state.permiso[obj.key_permiso][obj.key_rol]=obj.key
        })
    }
}

const anular = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            delete state.data[action.data.key];

            if(state.rol[action.data.key_rol]){
                delete state.rol[action.data.key_rol][action.data.key_permiso];
            }
            if(state.permiso[action.data.key_permiso]){
                delete state.permiso[action.data.key_permiso][action.data.key_rol];
            }
        }
    }
}
