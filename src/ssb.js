const { promisify: p } = require("util");
const pull = require("pull-stream");
const {
  where,
  type,
  live: dbLive,
  toPullStream,
} = require("ssb-db2/operators");
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

p(ssb.db.create)({
  content: {
    type: "test",
    text: "post",
  },
}).then(() => {
  console.log("posted test");

  pull(
    ssb.db.query(where(type("test")), dbLive({ old: true }), toPullStream()),
    pull.drain((msg) => {
      console.log("found msg", msg);
    })
  );
});

function whoami() {
  return ssb.id;
}

module.exports = {
  whoami,
  ssb,
};
