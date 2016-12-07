import { join } from 'path';

module.exports = {
    site: 'site',
    prefix: 'www',
    devConsole: {
        enabled: false,
        colorize: true
    },
    expressServer: {
        port: 8080
    },
    logging: {
        level: 'debug',
        json: false
    },
    statsd: {
        enabled: true,
        host: 'telegraf',
        port: 8125,
        debug: false
    },
    publicRoots: [
        join(__dirname, '..', 'public')
    ],
    devMiddlewares: {
        enabled: false
    }
};
