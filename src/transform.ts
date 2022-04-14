import * as swc from "@swc/core";

async function main() {
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

main();
