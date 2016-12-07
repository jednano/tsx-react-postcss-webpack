import * as React from 'react';

interface FooProps {
    bar: string;
}

export default class Foo extends React.Component<FooProps, {}> {

    static defaultProps: FooProps = {
        bar: 'BAR'
    };

    render() {
        const qux: string = 'QUX';
        return (
            <div>
                Foo Component: {this.props.bar} baz {qux}
            </div>
        );
    }
}
