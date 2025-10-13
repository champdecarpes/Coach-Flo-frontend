import * as Sentry from '@sentry/browser';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';


import 'css/style.css';
import App from './App';
import './i18n.js';
import 'ldrs/react/Ring.css';


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // adjust for production
  cache: new InMemoryCache(),
  credentials: 'include', // include cookies for authentication
});


Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ApolloProvider>,
);
