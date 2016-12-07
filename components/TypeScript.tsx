import * as React from 'react';

import BaseBody from './BaseBody';

import Foo from './Foo';

export default class Ts extends React.Component<{}, {}> {

    static displayName = 'TsBundle';

    render() {
        return (
            <BaseBody>
                <h1>TypeScript/React/Webpack Starter</h1>
                <ul>
                    <li>
                        <a href="/">Click for JavaScript Route</a>
                    </li>
                </ul>
                <Foo bar="thud" />
            </BaseBody>
        );
    }
}
