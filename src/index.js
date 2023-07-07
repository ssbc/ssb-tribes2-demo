const { useState, createElement: h } = require("react");
const { whoami } = require("./ssb");
const NewConnection = require("./ui/NewConnection");

function App() {
  const [count, setCount] = useState(0);

  return h(
    "div",
    {},
    h("div", {}, "Count: " + count),
    h("button", { onClick: () => setCount(count + 1) }, "Click me?"),
    h("div", {}, "My ssb id: " + whoami()),
    h(NewConnection)
  );
}

module.exports = { App };
