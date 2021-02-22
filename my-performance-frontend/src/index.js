import React, { Component, useReducer } from 'react';
import { render } from "react-dom";
import { AppContainer } from 'react-hot-loader';
import 'antd/dist/antd.css';
import AppContext from './AppContext';
import './index.less';

try {
  render(<AppContainer>
    <AppContext />
  </AppContainer>,
    document.getElementById('root'));
} catch (err) {
  console.log(err)
}

