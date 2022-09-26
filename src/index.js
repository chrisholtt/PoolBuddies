import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoralisProvider serverUrl="https://y9l2fgbjvmjy.usemoralis.com:2053/server" appId="CA5SoDzXMCXkfGJBX84CGrHERs2xZpBBDdhQsQR2">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoralisProvider>
);
