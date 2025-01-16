import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './reduxtoolbox/stores/reduxStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css'
import './assets/common.css'
import './assets/Images/logos/favicon-16x16.png'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
    <App />
  </Provider>,
);


