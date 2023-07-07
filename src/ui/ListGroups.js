const { useState, createElement: h, useEffect } = require("react");
const pull = require("pull-stream");
const { ssb } = require("../ssb");

function ListGroups({ setViewedGroup }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    let drain;
    pull(
      ssb.tribes2.list({ live: true }),
      (drain = pull.drain((group) => {
        const groupSet = new Set(groups);

        if (!groupSet.has(group.id)) {
          groupSet.add(group.id);

          setGroups([...groupSet]);
        }
      }))
    );

    return () => drain.abort();
  });

  return h(
    "div",
    { style: { margin: "1rem" } },
    h("div", {}, h("span", {}, "Groups I'm a member of:")),
    h(
      "ul",
      {},
      groups.map((groupId) =>
        h(
          "li",
          { key: groupId, style: { marginBottom: "0.5rem" } },
          h(
            "a",
            {
              onClick: () => setViewedGroup(groupId),
              style: {
                color: "-webkit-link",
                cursor: "pointer",
                textDecoration: "underline",
              },
            },
            groupId
          )
        )
      )
    )
  );
}

module.exports = ListGroups;
