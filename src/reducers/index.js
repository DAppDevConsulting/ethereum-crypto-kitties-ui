import { combineReducers } from 'redux';
import getAllKitties from './getAllKitties';
import getMyKitties from './getMyKitties';
import getKittiesFromMarketplace from './getKittiesFromMarketplace';
import init from './init';

export default combineReducers({
    init,
    getAllKitties,
    getMyKitties,
    getKittiesFromMarketplace
});
