import * as Sentry from '@sentry/browser';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

import 'css/style.css';
import App from '@/App';
import './i18n.js';
import 'ldrs/react/Ring.css';


import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://flyby-router-demo.herokuapp.com/' }),
  cache: new InMemoryCache(),
});


// import React from 'react';
import { BrowserRouter } from 'react-router-dom';

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
);
