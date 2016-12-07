var babelConfig = require('./package').babel;

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.json']
    },

    node: {
        fs: 'empty'
    },

    babel: babelConfig,

    isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: babelConfig
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: babelConfig
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|\.spec\.|karma\-loader)/,
                loader: 'isparta'
            }
        ],
        loaders: [
            { test: /\.json$/, loaders: ['json'] }
        ]
    }
};
