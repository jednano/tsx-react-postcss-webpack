import { noop } from 'lodash';
import { join } from 'path';
import postcssNested from 'postcss-nested';
import postcssNestedProps from 'postcss-nested-props';
import postcssPropertyLookup from 'postcss-property-lookup';

import variables from './vars.json';
import fonts from './fonts.json';

const browsers = [
    'last 2 versions',
    'ie >= 9',
    '> 1% in US'
];

const postcssNestedVars = require('postcss-nested-vars')({
    globals: variables
});

export default function createPostcssProcessors(options) {
    options = options || {};
    const env = options.env || 'production';
    const { stylesheetPath, spritePath, groupBy } = options;
    const mixins = require('postcss-mixins')({
        mixinsFiles: join(__dirname, '..', 'mixins', '!(*.spec.js)')
    });
    const WORD = '[a-z0-9]+(-[a-z0-9]+)*';
    const processors = [
        mixins,
        postcssPropertyLookup,
        postcssNestedProps,
        postcssNestedVars,
        postcssNested,
        require('postcss-import')({
            path: [
                'styles',
                'styles/blocks'
            ],
            async: true,
            plugins: [
                mixins,
                postcssPropertyLookup,
                postcssNestedProps,
                postcssNestedVars,
                postcssNested,
                require('postcss-bem-linter')({
                    componentName: new RegExp(`^${WORD}$`),
                    componentSelectors(block) {
                        const element = `(?:__${WORD})?`;
                        const modifier = `(?:--${WORD})?`;
                        const attributes = '(?:\\[[^\\]]*\\])*';
                        return new RegExp(`^(?:\\.${block}${element}${modifier}${attributes})+$`);
                    }
                })
            ],
            onImport: options.hot ? files => files.forEach(this.addDependency) : noop
        }),
        require('postcss-url'),
        require('postcss-sprites')({
            stylesheetPath,
            spritePath,
            groupBy,
            skipPrefix: true,
            outputDimensions: true,
            padding: 10,
            verbose: true,
            retina: true
        }),
        require('postcss-font-pack')({
            requireSize: true,
            packs: fonts
        }),
        require('postcss-all-link-colors'),
        require('postcss-center'),
        require('postcss-circle'),
        require('postcss-triangle'),
        require('postcss-clearfix'),
        require('postcss-cssnext')({
            browsers,
            features: {
                customProperties: {
                    variables
                },
                rem: false
            }
        })
    ];

    if (env === 'development') {
        processors.push(require('postcss-browser-reporter'));
    }

    if (env === 'production') {
        processors.push(require('csswring'));
        processors.push(require('postcss-copy')({
            src: 'build/public/',
            dest: 'build/public/',
            inputPath() {
                return 'build/public/css';
            },
            relativePath(dirname, fileMeta, result, opts) {
                return join(opts.dest, 'css');
            },
            template(fileMeta) {
                return join(fileMeta.path, `${fileMeta.name}-${fileMeta.hash}.${fileMeta.ext}`);
            }
        }));
    }

    return processors;
}
