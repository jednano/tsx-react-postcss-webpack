import slashes from 'connect-slashes';
import Router from 'express';

import createHomePageHandler from './Home';
// import createTsPageHandler from './Ts';

export default function createRouter(params) {
    const router = new Router();

    router.use(slashes(false));

    router.get('/', createHomePageHandler(params));
    // router.get('/ts', createTsPageHandler(params));

    return router;
}
