import * as React from 'react';

import BaseBody from './BaseBody';

import Foo from './Foo';

export default React.createClass({
    displayName: 'HomeBundle',

    render() {
        return (
            <BaseBody>
                <div className="home">
                    <h1>TypeScript/React/Webpack Starter</h1>
                    <ul>
                        <li>
                            <a href="/ts">Click for TypeScript Route</a>
                        </li>
                    </ul>
                    <Foo bar="thud" />
                </div>
            </BaseBody>
        );
    }
});
