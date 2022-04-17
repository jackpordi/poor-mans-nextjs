import fs from "fs/promises";

import * as swc from "@swc/core";
import * as ESBuild from "esbuild";

export async function buildWithSWC() {
  const output = await swc
    .transformFile("./client.tsx", {
    // Some options cannot be specified in .swcrc
      sourceMaps: true,
      isModule: true,

      // All options below can be configured via .swcrc
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: false,
        },
        transform: {},
      },
    });

  console.log(output.code);
}

export async function bundleWithESBuild() {

  await ESBuild.build({
    entryPoints: [ "src/client.tsx" ],
    bundle: true,
    treeShaking: true,
    platform: "browser",
    outfile: "./bundle.js",
    // jsxFactory: "createElement",
    loader: {
      ".tsx": "tsx",
      ".ts": "tsx",
      ".jsx": "jsx",
      ".js": "jsx",
    },
  });

  const bundle = await fs.readFile("./bundle.js");

  return bundle.toString();
}
