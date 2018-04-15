import { channel } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import Genes from '../components/kitty/Genes';
import KittiesProvider from '../services/KittiesProvider';

const changeChannel = channel();
KittiesProvider.onChange((changedSet) => {
    changeChannel.put({type: 'CHANGED', changedSet});
});


export function * init (action) {
    yield call(Genes);
    KittiesProvider.init();

    yield put({ type: 'INITIALIZED' });
}

export function * updateState(action) {
    yield put({type: 'GET_ALL_KITTIES'});
    yield put({ type: 'GET_MY_KITTIES' });
    yield put({ type: 'GET_KITTIES_FROM_MARKETPLACE' });
}

export default function * flow () {
    yield takeEvery('INIT', init);
    yield takeEvery(changeChannel, updateState);
};
