const { useState, createElement: h, useEffect } = require("react");
const pull = require("pull-stream");
const { ssb } = require("../ssb");
const { isSameSet } = require("../util");

function GroupInvites() {
  const [invites, setInvites] = useState([]);

  const acceptInvite = (groupId) => {
    ssb.tribes2.acceptInvite(groupId).then(() => updateInvites());
  };

  const updateInvites = () => {
    pull(ssb.tribes2.listInvites(), pull.collectAsPromise()).then(
      (currentInvites) => {
        if (!isSameSet(new Set(invites), new Set(currentInvites))) {
          setInvites(currentInvites);
        }
      }
    );
  };

  useEffect(() => {
    updateInvites();

    const intervalId = setInterval(() => {
      updateInvites();
    }, 500);

    return () => clearInterval(intervalId);
  });

  if (invites.length === 0) return;

  return h(
    "div",
    { style: { margin: "1rem" } },
    h("div", {}, h("span", {}, "Groups I'm invited to:")),
    h(
      "ul",
      {},
      invites.map((invite) =>
        h(
          "li",
          { key: invite.id, style: { marginBottom: "0.5rem" } },
          h(
            "div",
            {},
            h("span", {}, invite.id),
            h(
              "button",
              {
                onClick: () => acceptInvite(invite.id),
              },
              "Accept invite"
            )
          )
        )
      )
    )
  );
}

module.exports = GroupInvites;
