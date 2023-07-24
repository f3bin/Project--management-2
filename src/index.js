import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import '@fortawesome/fontawesome-free/css/all.css';
import { Provider } from 'react-redux';
import store from './Store/store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);


