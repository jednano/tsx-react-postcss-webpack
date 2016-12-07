import {
    isFunction,
    merge
} from 'lodash';

import pageDefinitionBase from './page-definition-base.json';

import { responseCreatorPromise, promiseAttempt } from '../helpers/router';

export function responseCreator(
    config
) {
    return responseCreatorPromise({
        config,
        pageDefinitionBase,
        getPromises,
        getStateFromPromise
    });
}

function getPromises(params) {
    const { promises } = params;
    const sitePromises = [];

    return Promise.all([
        Promise.all(sitePromises),
        Promise.all(promises)
    ]).then(function getPromisesOnSuccess(results) {
        params.results = results;
        return params;
    });
}

function getStateFromPromise(params) {
    return promiseAttempt(function getStateFromPromiseCallback() {
        const {
            results,
            getAdditionalStateFromPromise,
        } = params;
        const [
            sitePromiseResults,
            pagePromiseResults
        ] = results;

        params.sitePromiseResults = sitePromiseResults;
        params.pagePromiseResults = pagePromiseResults;
        params.stateSpec = merge(
            {},
            isFunction(getAdditionalStateFromPromise) && getAdditionalStateFromPromise(pagePromiseResults, params)
        );

        return params;
    });
}
