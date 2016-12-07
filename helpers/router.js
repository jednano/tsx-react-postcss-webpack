import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { assign, merge, pick, isError, attempt } from 'lodash';

import { createPageManifestHandler } from '../helpers/page-manifest';
import configureStore from '../redux-app/store/configureStore';

import State from '../redux-app/store/State';
import initialState from '../redux-app/store/initialState';
import AppProvider from '../components/AppProvider';
import BasePage from '../components/BasePage';

export function responseCreatorPromise({
    config,
    pageDefinitionBase,
    promiseChain = creatorPromiseChain
} = {}) {
    const params = assign({}, config, {
        pageDefinitionBase,
        req: pickRequestProperties(config.req || {})
    });

    return(config.routes ? reactRouterPromiseChain : promiseChain)(params);
}

function pickRequestProperties(req) {
    return pick(req, ['device', 'headers', 'url']);
}

export function promiseAttempt(func) {
    const result = attempt(func, []);
    return isError(result)
        ? Promise.reject(result)
        : Promise.resolve(result);
}

export function creatorPromiseChain(params) {
    return setupInitialState(params)
        .then(setupStore)
        .then(getPageDefinition)
        .then(getPageElement)
        .then(getConfiguredBaseComponent);
}

export function reactRouterPromiseChain(params) {
    return setupInitialState(params)
        .then(setupHistoryStore)
        .then(getPageDefinition)
        .then(matchRoutes)
        .then(getRouterPageElement)
        .then(getConfiguredBaseComponent);
}

function setupInitialState(params) {
    return promiseAttempt(
        function initialStateClosure() {
            const {
                stateSpec,
                pathName,
                prefix,
                referrer
            } = params;
            params.state = State.update(initialState, merge({}, {
                global: {
                    pathName: { $set: pathName },
                    hostPrefix: { $set: prefix },
                    referrer: { $set: referrer }
                }
            }, stateSpec));
            return params;
        }
    )
}

function setupStore(params) {
    const { state } = params;
    return promiseAttempt(
        function setupStoreClosure() {
            params.store = configureStore({
                initialState: state
            });
            return params;
        }
    )
}

function setupHistoryStore(params) {
    return promiseAttempt(
        function setupHistoryClosure() {
            const { req, state } = params;
            const memoryHistory = createMemoryHistory(req.url);
            params.store = configureStore({
                initialState: state,
                history: memoryHistory
            });

            params.history = syncHistoryWithStore(
                memoryHistory,
                params.store
            );

            return params;
        }
    )
}

function matchRoutes(params) {
    const { history, routes, req } = params;
    return new Promise(
        function matchRoutesPromiseResolver(resolve, reject) {
            match(
                { history, routes, location: req.url },
                function matchCallback(err, redirectLocation, renderProps) {
                    if(err) {
                        return reject(err);
                    }
                    if(redirectLocation) {
                        return reject(new Error('Redirect'));
                    }

                    params.renderProps = renderProps;
                    resolve(params);
                }
            );
        }
    );
}

function getPageDefinition(params) {
    return promiseAttempt(
        function getPageDefinitionClosure() {
            const {
                pageDefinitionBase,
                pageDefinition,
                state
            } = params;

            params.pageManifest = createPageManifestHandler(
                pageDefinitionBase,
                ...[
                    pageDefinition,
                    {
                        initialState: state
                    }
                ]
            )();
            return params;
        }
    );
}

function getPageElement(params) {
    return promiseAttempt(
        function getPageElementClosure() {
            const {
                store,
                component: Component,
            } = params;
            params.element = renderToString(
                <AppProvider store={ store }>
                    <Component />
                </AppProvider>
            );
            return params;
        }
    );
}

function getRouterPageElement(params) {
    return promiseAttempt(
        function getRouterPageElementClosure() {
            const { store, renderProps } = params;
            params.element = renderToString(
                <AppProvider store={ store }>
                    <RouterContext {...renderProps} />
                </AppProvider>
            );
            return params;
        }
    );
}

function getConfiguredBaseComponent(params) {
    const {
        pageManifest,
        element
    } = params;

    return promiseAttempt(
        function getConfiguredBaseComponentClosure() {
            params.htmlBody = renderToStaticMarkup(
                <BasePage {...pageManifest}>
                    <div
                        id="root"
                        className="root-node"
                        dangerouslySetInnerHTML={{__html: element }}
                    />
                </BasePage>
            );
            return params;
        }
    );
}
