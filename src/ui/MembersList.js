const { useState, createElement: h, useEffect } = require("react");
const pull = require("pull-stream");
const { ssb } = require("../ssb");
const { isSameSet } = require("../util");

function MembersList({ groupId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let drain;
    pull(
      ssb.tribes2.listMembers(groupId, { live: true }),
      pull.map((members) => members.added),
      (drain = pull.drain((currentMembers) => {
        const oldMembersSet = new Set(members);
        const currentMembersSet = new Set(currentMembers);

        if (!isSameSet(oldMembersSet, currentMembersSet)) {
          setMembers(currentMembers);
        }
      }))
    );

    return () => drain.abort();
  });

  return h(
    "div",
    { style: { margin: "1rem" } },
    h("div", {}, h("span", {}, "Members of this group:")),
    h(
      "ul",
      {},
      members.map((member) =>
        h(
          "li",
          { key: member, style: { marginBottom: "0.5rem" } },
          h("a", {}, member)
        )
      )
    )
  );
}

module.exports = MembersList;
