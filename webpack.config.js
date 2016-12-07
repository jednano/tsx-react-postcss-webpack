// Webpack configuration to use with the build task.

var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var createPostcssProcessors = require('./styles/config/postcss-processors');
var babelConfig = require('./package').babel;

module.exports = {
    devtool: 'source-map',

    // Create also a 'lib' chunk with common libraries, e.g. react.
    entry: _.assign(discoverBrowserMains(), {
        lib: ['babel-polyfill', 'react']
    }),

    output: {
        path: './build/public/js',
        publicPath: '/public/js/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production') // This has effect on the react lib size
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.json', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['babel', 'ts']
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(js|jsx|es)$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'empty'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?name=[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
    }
};

function discoverBrowserMains() {
    const browserMains = {};
    ['.js', '.ts'].forEach(ext => {
        glob.sync('./browser-mains/*' + ext).forEach(filepath => {
            browserMains[path.basename(filepath, ext)] = filepath;
        });
    });
    return browserMains;
}
