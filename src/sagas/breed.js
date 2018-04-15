import { takeEvery, put, call } from 'redux-saga/effects';
import KittiesProvider from '../services/KittiesProvider';
import Kitties from '../Kitties';

export function * breed (action) {
    yield call(Kitties.breed, action.myKitty.id, action.otherKitty.id);
}

export default function * flow () {
    yield takeEvery('BREED', breed);
};
