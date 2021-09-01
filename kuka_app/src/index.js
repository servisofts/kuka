import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// window.onbeforeunload = function (evt) {
//   console.log(evt)
//   return "Your work will be lost.";
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

