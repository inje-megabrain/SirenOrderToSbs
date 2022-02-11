import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import axios from "axios";

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
          <App />
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();