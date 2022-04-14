import express, { Application, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";

import { HomePage } from "./pages";

const app: Application = express();

const port = 3000;

app.get("/", (_: Request, res: Response) => {
  // @ts-ignore
  const stream = ReactDOMServer.renderToPipeableStream(<HomePage />, {
    onAllReady() {
      res.setHeader("Content-Type", "text/html");
      res.end();
    },
  });
  stream.pipe(res, { end: false });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
