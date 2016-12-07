import React from 'react';
import { propTypes, t } from 'tcomb-react';

export default React.createClass({

    displayName: 'BasePage',

    propTypes: propTypes({
        title: t.String,
        scripts: t.Array,
        styles: t.Array,
        children: t.ReactChildren,
        initialState: t.Object
    }),

    getDefaultProps: () => {
        return {
            scripts: [],
            styles: []
        };
    },

    render() {

        const {
            styles,
            scripts,
            title,
            children,
            initialState
        } = this.props;

        return (
            <html>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{ title }</title>
                {
                    styles
                        .map(href => ({ rel: 'stylesheet', href }))
                        .map((props, i) => (
                            <link {...props} key={i} />
                        ))
                }
            </head>
            <body>
                { children }
                <script dangerouslySetInnerHTML={{ __html: 'window.__INITIAL_STATE__ =' + JSON.stringify(initialState) }} />
                {
                    scripts.map((fileName, i) => {
                        return (<script src={fileName} key={i} />);
                    })
                }
            </body>
            </html>
        );
    }

});
