import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'; 
import { makeServer } from "./server"
 
import { inspect } from "@xstate/inspect"; 
inspect({
  iframe: () => document.getElementById('xstate'),
  url: 'https://statecharts.io/inspect'
});


if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 
