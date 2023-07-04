const { createRoot } = require("react-dom/client");
const { h } = require("./util");

console.log("hello world");

const root = createRoot(document.getElementById("app"));
root.render(h("h1", "Hello, world"));
