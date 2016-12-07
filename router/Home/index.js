import { responseCreator } from '../pageHelpers';
import pageDefinition from './page-definition.json';

import HomeBundle from '../../components/Home';

export default function createHomePageHandler({ request, clientConfig }) {
    return (req, res, next) => {
        responseCreator({
            req,
            request,
            pageDefinition,
            clientConfig,
            pathName: '/',
            component: HomeBundle
        }).then(({
            htmlBody
        }) => {
            res.send(htmlBody);
        }, next);
    };
}
