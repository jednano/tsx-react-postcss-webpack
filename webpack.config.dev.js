var _ = require('lodash');
var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var productionConfig = require('./webpack.config');
var createPostcssProcessors = require('./styles/config/postcss-processors');

var babelConfig = require('./package').babel;
babelConfig.presets.push('react-hmre');
var babelLoader = 'babel?' + JSON.stringify(babelConfig);

module.exports = {
    devtool: 'source-map',

    // Entry points for static analyzer:
    entry: merge(
        {
            lib: [
                'webpack-hot-middleware/client'
            ]
        },
        productionConfig.entry
    ),

    output: {
        // Where to put build results when doing production builds:
        // (Server doesn't write to the disk, but this is required.)
        path: __dirname,

        // Filename to use in HTML
        filename: '[name].js',

        // Path to use in HTML
        publicPath: '/public/js/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')
    ],

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.ts', '.tsx', '.js', '.json', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: [babelLoader, 'ts']
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: babelLoader
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?name=[path][name].[ext]'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    postcss: function() {
        const sheetName = path.basename(this.resourcePath, '.css');
        return createPostcssProcessors.default.call(this, {
            env: 'development',
            stylesheetPath: 'styles/sheets',
            spritePath: 'public/images/sprites/sprite.png',
            groupBy: () => sheetName,
            hot: true
        });
    },

    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
    }
};

function merge(object, other) {
    return _.mergeWith(object, other, function(a, b) {
        if (_.isArray(a)) {
            return a.concat(b);
        }
    });
}
