import * as t from 'tcomb';

export const Global = t.struct({
    foo: t.String
}, 'Global');

export default t.struct({
    global: Global,
    routing: t.maybe(t.Object)
}, 'State');
