import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import errorHandlingMiddleware from '../server/error-handling-middleware';

export default function createExpressServer({
    isDevMiddlewaresEnabled,
    port,
    publicRoots,
    router
}) {
    const app = express();

    app.enable('trust proxy');
    app.disable('x-powered-by');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    if (isDevMiddlewaresEnabled) {
        require('./load-dev-middlewares').default.call(this, { app });
    }

    publicRoots.forEach(function(publicRoot) {
        app.use('/public', express.static(publicRoot));
    });

    app.use(router);

    app.use(errorHandlingMiddleware({
        logger: console
    }));

    const server = app.listen(port, () => {
        console.log('listening on port:', port);
    });

    return server.close;
}
