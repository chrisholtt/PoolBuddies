import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoralisProvider serverUrl="https://cesmllkz65ob.usemoralis.com:2053/server" appId="qFAdQLL83vibWnRAKSJ1I6FfAEOMMp82dZP5muXm">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoralisProvider>
);
