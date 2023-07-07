const { useState, createElement: h } = require("react");
const { ssb } = require("../ssb");

function AddMember({ groupId }) {
  const [member, setMember] = useState("");

  return h(
    "div",
    { style: { margin: "1rem" } },
    h(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();

          ssb.tribes2
            .addMembers(groupId, [member])
            .then(() => setMember(""))
            .catch((err) =>
              console.error("Didn't manage to add member", member, err)
            );
        },
      },
      h("input", {
        value: member,
        placeholder: "Root id of member to invite to the group",
        onChange: (e) => setMember(e.target.value),
      }),
      h("button", {}, "Invite to group")
    )
  );
}

module.exports = AddMember;
