import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// window.onbeforeunload = function (evt) {
//   console.log(evt)
//   return "Your work will be lost.";
// };
window.onpopstate = function (e) { window.history.forward(1); }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

