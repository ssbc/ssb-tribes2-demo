const { createElement: h } = require("react");
const MembersList = require("./MembersList");
const AddMember = require("./AddMember");
const PostMessage = require("./PostMessage");
const GroupMessages = require("./GroupMessages");

function ViewGroup({ groupId }) {
  return h(
    "div",
    { style: { margin: "1rem", padding: "1rem", border: "2px black solid" } },
    h("div", {}, h("span", {}, "Currently viewed group: " + groupId)),
    h(AddMember, { groupId }),
    h(MembersList, { groupId }),
    h(PostMessage, { groupId }),
    h(GroupMessages, { groupId })
  );
}

module.exports = ViewGroup;
