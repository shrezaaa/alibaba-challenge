import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const app = express();
async function startServer() {
  let vite;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist/client'));
  }
  
  // SSR Middleware
  app.get('*', async (req, res) => {
    let template, render;
    if (!isProd) {
      template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(req.url, template);
      render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render;
    } else {
      template = fs.readFileSync(path.resolve('dist/client/index.html'), 'utf-8');
      render = (await import("./dist/server/entry-server.js")).render;
    }
    const appHtml = render(req.url);
    const html = template.replace(`<!--ssr-outlet-->`, appHtml);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });
  app.listen(3000, () => {
    console.log(':rocket: Server running at http://localhost:3000');
  });
}
startServer();
