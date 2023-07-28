const { promisify: p } = require("util");
const pull = require("pull-stream");
const startSbot = require("./bot");

const ssb = startSbot();

ssb.tribes2.start();

ssb.lan.start();

pull(
  ssb.lan.discoveredPeers(),
  pull.unique("address"),
  pull.drain(
    (peer) => {
      // just logging for now, since i can't get it to work between two instances on my computer. i'll have to test with someone else on the same wifi
      // TODO: if this works, put it in the UI
      console.log("Discovered peer:", peer);
    },
    (err) => {
      if (err) console.error("Error in lan discovery:", err);
    }
  )
);

ssb.on("rpc:connect", (peer) => {
  // follow anyone we connect to
  return p(ssb.db.create)({
    content: {
      type: "contact",
      contact: peer.id,
      following: true,
    },
  });
});

module.exports = {
  ssb,
};
