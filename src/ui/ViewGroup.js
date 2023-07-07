const { createElement: h } = require("react");
const MembersList = require("./MembersList");

function ViewGroup({ groupId }) {
  return h(
    "div",
    { style: { margin: "1rem", padding: "1rem", border: "2px black solid" } },
    h("div", {}, h("span", {}, "Currently viewed group: " + groupId)),
    h(MembersList, { groupId })
  );
}

module.exports = ViewGroup;
