import ReactDOM from 'react-dom/client';
import App from './app';

const rootNode = document.getElementById("root")!;

ReactDOM.hydrateRoot(
    rootNode,
    <App />,
);
