import { lstat } from 'fs';
import { EOL } from 'os';
import { join } from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.dev';

export default function loadDevMiddlewares({ app }) {

    const compiler = webpack(config);
    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }),
        webpackHotMiddleware(compiler)
    );

    app.use(/^\/public\/css\/([\w-]+)\.css$/, (req, res) => {
        const sheet = join('styles', 'sheets', `${req.params[0]}.css`);
        lstat(sheet, (err, stats) => {
            if (!err && stats.isFile()) {
                res.status(200).type('css').end();
                return;
            }
            res.status(404).send([
                `Sheet not found: ${sheet}`,
                'Don\'t forget to import it at the very top of your page\'s browser-main file too!'
            ].join(EOL));
        });
    });
}
