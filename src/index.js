import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
    <MuiThemeProvider>
    <Provider store={store}>
    <HashRouter>
        <App />
    </HashRouter>
    </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
