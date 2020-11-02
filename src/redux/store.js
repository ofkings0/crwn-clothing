import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddlewear = createSagaMiddleware();

const middlewares = [sagaMiddlewear];

if (process.env.NODE_ENV === 'development') { //removes logging states from inspect view when deployed. 
    middlewares.push(logger);
} 

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddlewear.run(rootSaga);

export const persistor = persistStore(store);

export default {store, persistor};