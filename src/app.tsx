import React from "react";

import { FCWithChildren } from "./types";

export const PageRoot: FCWithChildren = ({ children }) => (
  <html>
    <head>
    </head>
    <body>
      <div id="root">
        { children }
      </div>
    </body>
    <script src="/bundle.js" />
  </html>
);

// export function createRootComponent(pages: PageData[]): FC {
//   return () => (
//     <Routes>
//       { pages.map(({ route, component: Component }) => (
//         <Route key={route} path={route} element={(
//           <PageRoot>
//             <Component />
//           </PageRoot>
//         )}/>
//       ))}
//     </Routes>
//   );
// }
