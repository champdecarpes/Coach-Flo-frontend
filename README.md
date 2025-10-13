

### Frontend

- `react` for building interactive UIs
- `react-dom` for rendering the UI
- `react-router` for page navigation
- `vite` for bundling static assets
- Styling
  - `bootstrap` for providing responsive stylesheets
  - `react-bootstrap` for providing components built on top of Bootstrap CSS without using plugins
  - `tailwind` for utility-first CSS with predefined classes that speed up styling directly in markup
  - `styled-components` for writing scoped, dynamic CSS inside JavaScript/TypeScript components
- State management and backend integration
  - `axios` for performing asynchronous calls
  - `cookie` for easy integration with Django using the `csrftoken` cookie
  - `openapi-ts` for generating TypeScript client API code from the backend OpenAPI schema
  - `history` for providing browser history to Connected React Router
- Utilities
  - `lodash` for general utility functions
  - `classnames` for easy working with complex CSS class names on components
  - `react-refresh` for improving QoL while developing through automatic browser refreshing

### If you're not using Docker:

#### Setup and run the frontend app

- Open a new command line window and go to the project's directory
- `npm install`
- `npm run openapi-ts`
  - This is used to generate the TypeScript client API code from the backend OpenAPI schema
- `npm run dev`
  - This is used to serve the frontend assets to be consumed
    by [django-webpack-loader](https://github.com/django-webpack/django-webpack-loader) and not to run the React
    application as usual, so don't worry if you try to check what's running on port 3000 and see an error on your
    browser
- Open a browser and go to `http://localhost:8000` to see the project running
