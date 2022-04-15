import fs from "fs/promises";

import express, { Application, Request, Response } from "express";

import { Renderer } from "./server-render";

async function loadPages() {
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
  const pages = await loadPages();

  for (const page of pages) {
    app.get(page.route, async (_: Request, res: Response) => {
      const stream = await Renderer.renderToStream(page.component);
      res.setHeader("Content-Type", "text/html");
      stream.pipe(res);
    });
  }

  app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
  });

}
void main();
