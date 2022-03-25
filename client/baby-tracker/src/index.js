import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <div id="app-container">
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
