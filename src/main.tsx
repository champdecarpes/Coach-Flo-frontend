import * as Sentry from '@sentry/browser';
import { createRoot } from 'react-dom/client';

import './css/style.css';
import App from './App';
import './i18n.js';

// import React from 'react';
import { BrowserRouter } from 'react-router-dom';

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
);
