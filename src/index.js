const { useState } = require("react");
const { h, p } = require("./util");

function App() {
  const [count, setCount] = useState(0);

  return h(
    "div",
    h("div", "Count: " + count),
    p("button", { onClick: () => setCount(count + 1) }, "Click me?")
  );
}

module.exports = { App };
