import { noop } from 'lodash';
import { join } from 'path';
// import * as postcssNested from 'postcss-nested';
// import * as postcssNestedProps from 'postcss-nested-props';
// import * as postcssPropertyLookup from 'postcss-property-lookup';

// import * as _postcssNestedVars from 'postcss-nested-vars';
// import * as _postcssMixins from 'postcss-mixins';
import * as _postcssImport from 'postcss-import';
// import * as _postcssBemLinter from 'postcss-bem-linter';
// import * as _postcssUrl from 'postcss-url';
// import * as _postcssSprites from 'postcss-sprites';
// import * as _postcssFontPack from 'postcss-font-pack';
// import * as _postcssAllLinkColors from 'postcss-all-link-colors';
// import * as _postcssCenter from 'postcss-center';
// import * as _postcssCircle from 'postcss-circle';
// import * as _postcssTriangle from 'postcss-triangle';
// import * as _postcssClearfix from 'postcss-clearfix';
// import * as _postcssCssNext from 'postcss-cssnext';
// import * as _postcssBrowserReporter from 'postcss-browser-reporter';
// import * as _cssWring from 'csswring';
// import * as _postcssCopy from 'postcss-copy';

// import * as variables from './vars.json';
// import * as fonts from './fonts.json';

// const browsers = [
//     'last 2 versions',
//     'ie >= 9',
//     '> 1% in US'
// ];

// const postcssNestedVars = _postcssNestedVars({
//     globals: variables
// });

export default function createPostcssProcessors(options) {
    options = options || {};
    // const env = options.env || 'production';
    // const { stylesheetPath, spritePath, groupBy } = options;
    // const mixins = _postcssMixins({
    //     mixinsFiles: join(__dirname, '..', 'mixins', '!(*.spec.js)')
    // });
    // const WORD = '[a-z0-9]+(-[a-z0-9]+)*';
    const processors = [
        // mixins,
        // postcssPropertyLookup,
        // postcssNestedProps,
        // postcssNestedVars,
        // postcssNested,
        _postcssImport({
            path: [
                'styles',
                'styles/blocks'
            ],
            async: true,
            plugins: [
                // mixins,
                // postcssPropertyLookup,
                // postcssNestedProps,
                // postcssNestedVars,
                // postcssNested,
                // _postcssBemLinter({
                //     componentName: new RegExp(`^${WORD}$`),
                //     componentSelectors(block) {
                //         const element = `(?:__${WORD})?`;
                //         const modifier = `(?:--${WORD})?`;
                //         const attributes = '(?:\\[[^\\]]*\\])*';
                //         return new RegExp(`^(?:\\.${block}${element}${modifier}${attributes})+$`);
                //     }
                // })
            ],
            onImport: options.hot
                ? files => files.forEach(this.addDependency)
                : noop
        }),
        // _postcssUrl,
        // _postcssSprites({
        //     stylesheetPath,
        //     spritePath,
        //     groupBy,
        //     skipPrefix: true,
        //     outputDimensions: true,
        //     padding: 10,
        //     verbose: true,
        //     retina: true
        // }),
        // _postcssFontPack({
        //     requireSize: true,
        //     packs: fonts
        // }),
        // _postcssAllLinkColors,
        // _postcssCenter,
        // _postcssCircle,
        // _postcssTriangle,
        // _postcssClearfix,
        // _postcssCssNext({
        //     browsers,
        //     features: {
        //         customProperties: {
        //             variables
        //         },
        //         rem: false
        //     }
        // })
    ];

    // if (env === 'development') {
    //     processors.push(_postcssBrowserReporter);
    // }

    // if (env === 'production') {
    //     processors.push(_cssWring);
    //     processors.push(_postcssCopy({
    //         src: 'build/public/',
    //         dest: 'build/public/',
    //         inputPath() {
    //             return 'build/public/css';
    //         },
    //         relativePath(dirname, fileMeta, result, opts) {
    //             return join(opts.dest, 'css');
    //         },
    //         template(fileMeta) {
    //             return join(fileMeta.path, `${fileMeta.name}-${fileMeta.hash}.${fileMeta.ext}`);
    //         }
    //     }));
    // }

    return processors;
}
