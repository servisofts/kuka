const initialState = {
    estado: "Not Found",
    session: {}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "SSSocket") {
        state = { ...state };
    }
    return state;
}