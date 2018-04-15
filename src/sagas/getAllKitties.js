import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';

export function * getAllKitties (action) {
    let kitties = yield call(KittiesProvider.getAllKitties);

    yield put({ type: 'UPDATE_ALL_KITTIES', kitties });
}

export default function * flow () {
    yield takeEvery('GET_ALL_KITTIES', getAllKitties);
};
