import { ComponentType } from "react";
import ReactDOMServer, { PipeableStream } from "react-dom/server";

import RootApp from "./app";

export namespace Renderer {

  // For rendering per request
  export async function renderToStream(Element: ComponentType): Promise<PipeableStream> {
    return new Promise((resolve) => {

      const stream = ReactDOMServer.renderToPipeableStream(
        (
          <RootApp>
            <Element />
          </RootApp>
        ), {
          onAllReady() {
            resolve(stream);
          },
        },
      );
    });
  }

  // For rendering statically
  export function renderStatic(Element: ComponentType) {
    return ReactDOMServer.renderToString(
      <RootApp>
        <Element />
      </RootApp>,
    );
  }
}
