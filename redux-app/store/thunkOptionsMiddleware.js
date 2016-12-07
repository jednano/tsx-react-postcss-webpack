export default options => ({ dispatch, getState }) => {
    return next => action =>
        typeof action === 'function' ?
            action({ dispatch, getState, options }) :
            next(action);
}
