import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';
import Kitties from '../Kitties';

export function * getMyKitties (action) {
    let kitties = yield call(KittiesProvider.getKittiesByOwner, Kitties.defaultAccountAddress());

    yield put({ type: 'UPDATE_MY_KITTIES', kitties });
}

export default function * flow () {
    yield takeEvery('GET_MY_KITTIES', getMyKitties);
};
