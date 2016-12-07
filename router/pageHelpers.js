import * as pageDefinitionBase from './page-definition-base';

import { responseCreatorPromise } from '../helpers/router';

export function responseCreator(config) {
    return responseCreatorPromise({
        config,
        pageDefinitionBase
    });
}
