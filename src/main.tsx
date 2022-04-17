import fs from "fs/promises";

import express, { Application, Request, Response } from "express";
import compression from "compression";

import { Renderer } from "./server-render";
import { PageData } from "./types";
import { AppRoutes } from "./routes";
import { bundleWithESBuild } from "./transform";

async function loadPages(): Promise<PageData[]> {
  const dir = await fs.readdir("./src/pages");

  // Only use files that are .jsx or .tsx
  const validFiles = dir.filter((fileName) => {
    const split = fileName.split(".");
    const fileExtension = split[split.length - 1];

    return [ "jsx", "tsx" ].includes(fileExtension);
  });

  const pages = await Promise.all(validFiles.map(async (fileName) => {

    const fileNameWithoutExtension = fileName.split(".")[0];
    const route = fileNameWithoutExtension === "index" ? "/" : `/${fileNameWithoutExtension}`;
    const component = (await import(`./pages/${fileName}`)).default;

    return {
      route,
      component,
    };
  }));

  return pages;
}



const app: Application = express();
const port = 3000;

async function main() {

  app.use(compression());

  app.get("/bundle.js", async (_req: Request, res: Response) => {
    const bundle = await bundleWithESBuild();
    res.type(".js");
    res.setHeader("Content-Type", "application/javascript");
    res.send(bundle);
  });

  app.get("*", async (req: Request, res: Response) => {
    const stream = await Renderer.renderToStream(req.url, AppRoutes);
    res.setHeader("Content-Type", "text/html");
    stream.pipe(res);
  });

  app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
  });

}
void main();
