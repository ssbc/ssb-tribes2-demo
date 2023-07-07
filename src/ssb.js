const { promisify: p } = require("util");
const startSbot = require("./bot");

const ssb = startSbot();

ssb.tribes2.start();

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
