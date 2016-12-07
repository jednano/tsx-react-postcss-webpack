import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../../redux-app/store/configureStore';
import State from '../../redux-app/store/State';
import AppProvider from '../../components/AppProvider';

export default function(Component, callback) {
    const app = {};

    const initialState = State(window.__INITIAL_STATE__);
    const store = configureStore({
        initialState,
        options: app,
        history: browserHistory
    });
    const history = syncHistoryWithStore(browserHistory, store);

    document.addEventListener('DOMContentLoaded', () => {

        const node = document.getElementById('root');

        render(
            <AppProvider store={ store }>
                { Component ? (<Component />) : callback({history, store}) }
            </AppProvider>,
            node
        );
    });

    return { app, store };
}
