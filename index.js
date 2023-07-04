const { createRoot } = require("react-dom/client");
const { h } = require("./src/util");
const { App } = require("./src/");

console.log("hello world");

const root = createRoot(document.getElementById("app"));
root.render(h(App));
