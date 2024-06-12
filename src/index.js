import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `JWT ${localStorage.getItem('token')}`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
);


