const initialState = {
    isInitialized: false
};

export default function init (state = initialState, action) {
    switch (action.type) {
        case 'INITIALIZED':
            return {...state, isInitialized: true};

        default:
            return state;
    }
}
