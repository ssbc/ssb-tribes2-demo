const { useState, createElement: h } = require("react");

function App() {
  const [count, setCount] = useState(0);

  return h(
    "div",
    {},
    h("div", {}, "Count: " + count),
    h("button", { onClick: () => setCount(count + 1) }, "Click me?")
  );
}

module.exports = { App };
