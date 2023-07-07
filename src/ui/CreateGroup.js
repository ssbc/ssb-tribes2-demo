const { createElement: h } = require("react");
const { ssb } = require("../ssb");

const createGroup = () => {
  ssb.tribes2
    .create()
    .then(() => {
      console.log("new group created");
    })
    .catch((err) => console.error("group creation failed:", err));
};

function CreateGroup() {
  return h(
    "div",
    { style: { margin: "1rem" } },
    h(
      "div",
      {},
      h("button", { onClick: createGroup }, "Create new Private group")
    )
  );
}

module.exports = CreateGroup;
