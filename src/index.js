import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GetBook from './book';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
const root = ReactDOM.createRoot(document.getElementById('root'));
  
const client = new ApolloClient({
  uri: 'https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql',
  cache: new InMemoryCache()
});
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GetBook itemsPerPage={2}/>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();