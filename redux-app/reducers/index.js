import { routerReducer } from 'react-router-redux';

import initialState from '../store/initialState';
import State from '../store/State';

import global from './global';

export default (state = initialState, action) => State.update(state, {
    global: { $set: global(state.global, action) },
    routing: { $set: routerReducer(state.routing, action) }
});
