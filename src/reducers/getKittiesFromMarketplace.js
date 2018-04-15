const initialState = {
    kitties: []
};

export default function getKittiesFromMarketplace (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_KITTIES_FROM_MARKETPLACE':
            return {...state, kitties: action.kitties};

        default:
            return state;
    }
}
