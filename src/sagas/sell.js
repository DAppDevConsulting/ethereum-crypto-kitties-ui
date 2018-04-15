import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';
import Kitties from '../Kitties';

export function * sell (action) {
    yield call(Kitties.sell, action.kitty.id, action.price);
}

export default function * flow () {
    yield takeEvery('SELL', sell);
};
