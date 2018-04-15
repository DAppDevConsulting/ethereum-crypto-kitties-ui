import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';
import Kitties from '../Kitties';

export function * mint (action) {
    yield call(KittiesProvider.mint, action.kitty);
}

export default function * flow () {
    yield takeEvery('MINT', mint);
};
