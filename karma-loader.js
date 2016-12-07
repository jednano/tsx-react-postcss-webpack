require('babel-polyfill');

const testContext = require.context('./test', true, /\.js$/);
testContext.keys().forEach(testContext);

// TODO: Load TypeScript test files?
