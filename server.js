import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
const isProd = process.env.NODE_ENV === "production";
const port = 5173;
async function startServer() {
  const app = express();
  let vite;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template;
      if (!isProd) {
        template = fs.readFileSync(path.resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve("dist/index.html"), "utf-8");
      }
      const { render } = isProd
        ? require("./dist/server/entry-server.js")
        : await vite.ssrLoadModule("/src/entry-server.tsx");
      const appHtml = render(url);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      if (!isProd) vite.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).end("Internal Server Error");
    }
  });
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
startServer();
