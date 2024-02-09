import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers/_root.reducer';

const store = createStore(
    // rootSaga contains all of our other reducers
    rootReducer,
    // adds middleware to our project
    applyMiddleware(logger),
);

export default store;