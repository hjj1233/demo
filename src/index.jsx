import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less'
import {BrowserRouter} from 'react-router-dom'

import App from './App';

import localStore from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import {Provider} from 'react-redux'
import store from './redux/store';
const user= localStore.getUser()
memoryUtils.user=user



ReactDOM.render(
  
  <BrowserRouter>
  <Provider store={store} >
  <App />
  </Provider>
  </BrowserRouter>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

