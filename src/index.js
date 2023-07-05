const { useState, createElement: h, useEffect } = require("react");
const pull = require("pull-stream");
const { whoami, ssb } = require("./ssb");

function App() {
  const [count, setCount] = useState(0);
  //useEffect(() => {
  //  let drain;
  //  console.log("about to pull discovered peers");
  //  pull(
  //    ssb.lan.discoveredPeers(),
  //    (drain = pull.drain((peer) => {
  //      console.log("found peer:", peer);
  //    }))
  //  );

  //  return () => drain.abort();
  //});

  return h(
    "div",
    {},
    h("div", {}, "Count: " + count),
    h("button", { onClick: () => setCount(count + 1) }, "Click me?"),
    h("div", {}, "My ssb id: " + whoami())
  );
}

module.exports = { App };
