import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';
import Kitties from '../Kitties';

export function * buy (action) {
    yield call(Kitties.buy, action.kitty.id);
}

export default function * flow () {
    yield takeEvery('BUY', buy);
};
