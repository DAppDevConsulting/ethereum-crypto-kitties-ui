import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';

export function * getKittiesFromMarketplace (action) {
    let kitties = yield call(KittiesProvider.getKittiesFromMarketplace);

    yield put({ type: 'UPDATE_KITTIES_FROM_MARKETPLACE', kitties });
}

export default function * flow () {
    yield takeEvery('GET_KITTIES_FROM_MARKETPLACE', getKittiesFromMarketplace);
};
