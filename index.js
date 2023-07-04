const { createElement: h } = require("react");
const { createRoot } = require("react-dom/client");
const { App } = require("./src/");

const root = createRoot(document.getElementById("app"));
root.render(h(App));
