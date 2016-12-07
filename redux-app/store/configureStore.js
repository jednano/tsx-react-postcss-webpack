import {
    createStore,
    applyMiddleware
} from 'redux';
import { compact } from 'lodash';
import { routerMiddleware } from 'react-router-redux';
import thunkOptionsMiddleware from './thunkOptionsMiddleware';
import rootReducer from '../reducers';

export default function configureStore({ initialState, options, history }) {

    const createStoreWithMiddleware = options => applyMiddleware(
        ...compact([
            thunkOptionsMiddleware(options),
            history && routerMiddleware(history)
        ])
    )(createStore);

    const store = createStoreWithMiddleware(options)(rootReducer, initialState);

    return store;
}
