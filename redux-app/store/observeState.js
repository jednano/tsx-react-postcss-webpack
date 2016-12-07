export default function observeState(store, select, onChange) {
    let currentState = select(store.getState());

    function handleChange() {
        const nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    return store.subscribe(handleChange);
}
