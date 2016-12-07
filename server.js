// configuration
import loadConfiguration from './config/load-configuration';
const ENV = process.env;
const environment = ENV.NODE_ENV || 'production';
const config = loadConfiguration({
    environment,
    overrides: {
        environment,
        'expressServer.port': [ENV.PORT, (val) => +val]
    }
});

// router
import createRouter from './router';
const router = createRouter({
    prefix: config.prefix,
    port: config.expressServer.port
});

// express server
import createExpressServer from './server/create-express-server';
const stopExpressServer = createExpressServer({
    environment: config.environment,
    port: config.expressServer.port,
    isDevMiddlewaresEnabled: config.devMiddlewares.enabled,
    publicRoots: config.publicRoots,
    router
});

process.on('SIGTERM', () => {
    stopExpressServer('SIGTERM', () => {
        /*eslint-disable no-process-exit*/
        process.exit(0);
        /*eslint-enable no-process-exit*/
    });
});
