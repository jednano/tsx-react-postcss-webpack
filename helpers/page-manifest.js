import {
    assignWith,
    compact,
    concat,
    flowRight,
    intersection,
    isArray,
    isNil,
    isPlainObject
} from 'lodash';
import * as t from 'tcomb';

const StringList = t.list(t.String);

export const PageDefinition = t.struct({
    title: t.maybe(t.String),
    initialState: t.maybe(t.Object),
    styles: t.maybe(StringList),
    scripts: t.maybe(StringList)
}, 'PageDefinition');

export const PageManifest = t.struct({
    title: t.String,
    styles: StringList,
    scripts: StringList,
    initialState: t.maybe(t.Object)
});

const mergeArrays = flowRight(compact, (arr, ...arrs) => {
    const duplicates = intersection(arr, ...arrs);

    if(duplicates.length > 0) {
        throw new Error('Duplicates found in array');
    }

    return concat(arr, ...arrs);
});

function mergeProperties(objValue, srcValue) {
    if (isArray(objValue)) {
        return mergeArrays(objValue, srcValue);
    }

    if (isPlainObject(objValue)) {
        return mergeDefinitionObject(objValue, srcValue);
    }

    if (isNil(srcValue)) {
        return objValue
    }

    return srcValue;
}

export function mergeDefinitionObject(base, ...definitions) {
    return assignWith({}, ...concat(base, definitions), mergeProperties);
}

export function createPageManifestHandler(base, ...definitions) {
    return () => new PageManifest(
        mergeDefinitionObject(base, ...definitions)
    );
}
