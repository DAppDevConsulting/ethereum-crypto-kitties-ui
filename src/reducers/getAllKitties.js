const initialState = {
    kitties: []
};

export default function getAllKitties (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_ALL_KITTIES':
            return {...state, kitties: action.kitties};

        default:
            return state;
    }
}
