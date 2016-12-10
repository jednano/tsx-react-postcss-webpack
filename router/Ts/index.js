import { responseCreator } from '../pageHelpers';
import * as pageDefinition from './page-definition.json';

import TsBundle from '../../components/TypeScript';

export default function createTsPageHandler({ request, clientConfig }) {
    return (req, res, next) => {
        responseCreator({
            req,
            request,
            pageDefinition,
            clientConfig,
            pathName: '/',
            component: TsBundle
        }).then(({
            htmlBody
        }) => {
            res.send(htmlBody);
        }, next);
    };
}
