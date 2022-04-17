import { ComponentType } from "react";
import ReactDOMServer, { PipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { PageRoot } from "./app";

export namespace Renderer {

  // For rendering per request
  export async function renderToStream(path: string, Element: ComponentType): Promise<PipeableStream> {
    return new Promise((resolve) => {

      const stream = ReactDOMServer.renderToPipeableStream(
        (
          <PageRoot>
            <StaticRouter location={path}>
              <Element />
            </StaticRouter>
          </PageRoot>
        ), {
          onAllReady() {
            resolve(stream);
          },
        },
      );
    });
  }

  // For rendering statically
  export function renderStatic(path: string, Element: ComponentType) {
    return ReactDOMServer.renderToString(
      <StaticRouter location={path}>
        <Element />
      </StaticRouter>,
    );
  }
}
