import React from 'react';
import ReactDOM from 'react-dom';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';

import App from './components/App';

/* Contracts will be added in '<App />' because Drizzle doesn't handle wrong network 🤔 */
const options = { 
    contracts: []
};
const drizzle = new Drizzle(options, generateStore(options));

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <App />
    </DrizzleContext.Provider>,
    document.getElementById('root')
);