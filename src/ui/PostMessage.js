const { createElement: h, useState } = require("react");
const { ssb } = require("../ssb");

function PostMessage({ groupId }) {
  const [message, setMessage] = useState("");

  return h(
    "div",
    {},
    h(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();

          ssb.tribes2
            .publish({
              type: "post",
              text: message,
              recps: [groupId],
            })
            .then(() => setMessage(""))
            .catch((err) =>
              console.error("Didn't manage to post message", message, err)
            );
        },
      },
      h("input", {
        value: message,
        placeholder: "Write a message",
        onChange: (e) => setMessage(e.target.value),
      }),
      h("button", {}, "Send message to group")
    )
  );
}

module.exports = PostMessage;
