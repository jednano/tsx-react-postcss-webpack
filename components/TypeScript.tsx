import * as React from 'react';
import classnames from 'classnames';

import BaseBody from './BaseBody';

import Foo from './Foo';

export default class Ts extends React.Component<{}, {}> {

    static displayName = 'TsBundle';

    render() {
        return (
            <BaseBody>
                <div className={classnames('ts')}>
                    <h1>
                        TypeScript/React/Webpack Starter
                    </h1>
                    <ul>
                        <li>
                            <a href="/">Click for JavaScript Route</a>
                        </li>
                    </ul>
                    <Foo bar="thud" />
                </div>
            </BaseBody>
        );
    }
}
