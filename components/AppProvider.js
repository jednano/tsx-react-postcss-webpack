import * as React from 'react';
import { Provider } from 'react-redux';
import { propTypes, t } from 'tcomb-react';

export default React.createClass({

    displayName: 'AppProvider',

    propTypes: propTypes({
        children: t.ReactChildren,
        store: t.struct({
            getState: t.Function
        }, 'ReduxStore')
    }),

    render () {
        const  {
            children,
            store
        } = this.props;

        return (
            <Provider store={ store }>
                { React.Children.only(children) }
            </Provider>
        );
    }

});
