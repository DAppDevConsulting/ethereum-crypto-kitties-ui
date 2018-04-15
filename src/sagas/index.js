import { all, fork } from 'redux-saga/effects';
import getAllKitties from './getAllKitties';
import getMyKitties from './getMyKitties';
import getKittiesFromMarketplace from './getKittiesFromMarketplace';
import init from './init';
import mint from './mint';
import sell from './sell';
import buy from './buy';
import breed from './breed';

const sagas = [
    init,
    mint,
    sell,
    buy,
    breed,
    getAllKitties,
    getMyKitties,
    getKittiesFromMarketplace
];

export default function * root () {
    yield all(sagas.map(fork));
}
