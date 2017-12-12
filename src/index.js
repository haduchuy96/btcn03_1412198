import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './game';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
const store = createStore(reducer, compose(
    window.devToolsExtension?window.devToolsExtension(): f => f
));


ReactDOM.render(
        <Provider store={store}>
             <Game />
        </Provider>,
    document.getElementById('root')
);