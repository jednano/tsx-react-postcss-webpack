import {
    forEach,
    identity,
    isArray,
    isUndefined,
    map,
    merge,
    partial,
    reduce,
    set
} from 'lodash';

export default function loadConfiguration({ environment, overrides }) {
    const files = ['base', environment, `${environment}`];
    const configs = map(files, loadFile);
    const config = reduce(configs, merge);
    forEach(overrides, partial(override, config));
    return config;
}

function loadFile(file) {
    try {
        return require('./config.' + file);
    } catch(err) {
        return {};
    }
}

function override(config, spec, path) {
    spec = isArray(spec) ? spec : [spec];
    const value = spec[0];
    const parse = spec[1] || identity;
    if (!isUndefined(value)) {
        set(config, path, parse(value));
    }
}
