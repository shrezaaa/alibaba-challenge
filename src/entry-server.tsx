import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(url: any) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}