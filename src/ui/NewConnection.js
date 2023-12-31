const { promisify: p } = require("util");
const { useState, createElement: h } = require("react");
const { ssb } = require("../ssb");

function NewConnection() {
  const [address, setAddress] = useState("");
  const myAddress = ssb.getAddress();

  return h(
    "div",
    { style: { margin: "1rem" } },
    h(
      "div",
      {},
      h("span", {}, "My address: " + myAddress),
      h(
        "button",
        { onClick: () => navigator.clipboard.writeText(myAddress) },
        "Copy"
      )
    ),
    h(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          p(ssb.conn.connect)(address)
            .then(() => {
              //setAddress("");
            })
            .catch((err) =>
              console.error("Didn't manage to connect to", address, err)
            );
        },
      },
      h("input", {
        value: address,
        placeholder: "Address to connect to",
        onChange: (e) => setAddress(e.target.value),
      }),
      h("button", {}, "Connect and follow")
    )
  );
}

module.exports = NewConnection;
