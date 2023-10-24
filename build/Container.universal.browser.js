import {
Container,
__toESM,
require_client,
require_jsx_dev_runtime,
require_react
} from "chunk-3fef20b47e9ecf94.js";

// src/Container.universal.jsx
var import_react = __toESM(require_react(), 1);
var client = __toESM(require_client(), 1);

// src/Container.universal.js
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function ContainerApp({ aap }) {
  return jsx_dev_runtime.jsxDEV(Container, {
    aap
  }, undefined, false, undefined, this);
}

// src/Container.universal.jsx
var { hydrateRoot } = client.default;
var nodes = Array.from(document.querySelectorAll('*[data-harmen-component-id="11803388485616880108"]'));
nodes.map((x) => {
  const props = JSON.parse(x.dataset.harmenComponent);
  const newElement = import_react.default.createElement(ContainerApp, props);
  hydrateRoot(x, newElement);
});
