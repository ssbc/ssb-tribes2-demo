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
ssb.lan.start();
console.log("lan started");
// TODO await
//ssb.tribes2.start();
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

console.log("about to pull discovered peers in ssb file");
// TODO: remove. doesn't seem to work, at least on same computer
pull(
  ssb.lan.discoveredPeers(),
  pull.drain((peer) => {
    console.log("found peer in ssb file:", peer);
  })
);

function whoami() {
  return ssb.id;
}

module.exports = {
  whoami,
  ssb,
};
