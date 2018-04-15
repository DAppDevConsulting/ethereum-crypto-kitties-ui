const initialState = {
    kitties: []
};

export default function geMyKitties (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_MY_KITTIES':
            return {...state, kitties: action.kitties};

        default:
            return state;
    }
}
