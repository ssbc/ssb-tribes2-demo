const { promisify: p } = require("util");
const { useState, createElement: h, useEffect } = require("react");
const pull = require("pull-stream");
const { ssb } = require("../ssb");
const { isSameSet } = require("../util");

function Connections() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    let drain;
    pull(
      ssb.conn.peers(),
      (drain = pull.drain((peers) => {
        const addrs = peers.map((peer) => peer[0]);
        const emittedAddrSet = new Set(addrs);
        const savedAddrSet = new Set(connections);

        if (!isSameSet(emittedAddrSet, savedAddrSet)) {
          setConnections(addrs);
        }
      }))
    );

    return () => drain.abort();
  });

  return h(
    "div",
    { style: { margin: "1rem" } },
    h("div", {}, h("span", {}, "Current connections:")),
    h(
      "ul",
      { style: { height: "75px", overflowY: "scroll" } },
      connections.map((conn) =>
        h(
          "li",
          { key: conn, style: { marginBottom: "0.5rem" } },
          h("span", {}, conn),
          h(
            "button",
            {
              onClick: () =>
                p(ssb.conn.disconnect)(conn).catch((err) =>
                  console.error("Didn't manage to disconnect from", conn, err)
                ),
            },
            "Disconnect"
          )
        )
      )
    )
  );
}

module.exports = Connections;
