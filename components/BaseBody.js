import React from 'react';
import { propTypes, t } from 'tcomb-react';

const BaseBody = React.createClass({

    displayName: 'BaseBody',

    propTypes: propTypes({
        children: t.ReactChildren
    }),

    render() {
        return (
            <div id="bundle">
                { this.props.children }
            </div>
        );
    }
});

export default BaseBody;
