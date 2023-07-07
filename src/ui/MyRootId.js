const { promisify: p } = require("util");
const { createElement: h, useState, useEffect } = require("react");
const { ssb } = require("../ssb");

function MyRootId() {
  const [myRootId, setMyRootId] = useState("");

  useEffect(() => {
    if (!myRootId) {
      p(ssb.metafeeds.findOrCreate)().then((myRoot) => {
        setMyRootId(myRoot.id);
      });
    }
  });

  return h(
    "div",
    { style: { margin: "1rem" } },
    h(
      "div",
      {},
      h("span", {}, "My root id: " + myRootId),
      h(
        "button",
        { onClick: () => navigator.clipboard.writeText(myRootId) },
        "Copy"
      )
    )
  );
}

module.exports = MyRootId;
