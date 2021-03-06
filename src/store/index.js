import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

function configureStore (initialState) {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(
            rootReducer,
            initialState,
            applyMiddleware(sagaMiddleware)
        ),
        runSaga: sagaMiddleware.run
    };
}

const store = configureStore();
store.runSaga(rootSaga);

export default store;
