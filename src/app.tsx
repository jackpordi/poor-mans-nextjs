import { FCWithChildren } from "./types";

const RootApp: FCWithChildren = ({ children }) => (
  <html>
    <head>
    </head>
    <body>
      { children }
    </body>
  </html>
);

export default RootApp;
