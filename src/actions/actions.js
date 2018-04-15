export function init () {
    return {
        type: 'INIT'
    };
}

export function getAllKitties () {
    return {
        type: 'GET_ALL_KITTIES'
    };
}

export function getMyKitties () {
    return {
        type: 'GET_MY_KITTIES'
    };
}

export function getKittiesFromMarketplace () {
    return {
        type: 'GET_KITTIES_FROM_MARKETPLACE'
    };
}

export function mint (kitty) {
    return {
        type: 'MINT',
        kitty
    };
}

export function sellKitty(kitty, price) {
    return {
        type: 'SELL',
        kitty,
        price
    }
}

export function buyKitty(kitty) {
    return {
        type: 'BUY',
        kitty
    }
}

export function breed(myKitty, otherKitty) {
    return {
        type: 'BREED',
        myKitty,
        otherKitty
    }
}
