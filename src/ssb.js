const pull = require("pull-stream");
const startSbot = require("./bot");

const ssb = startSbot();
ssb.lan.start();
console.log("lan started");
// TODO await
//ssb.tribes2.start();

console.log("about to pull discovered peers in ssb file");
pull(
  ssb.lan.discoveredPeers(),
  pull.drain((peer) => {
    console.log("found peer in ssb file:", peer);
  })
);

//const conn = await p(person1.connect)(person2.getAddress())

function whoami() {
  return ssb.id;
}

module.exports = {
  whoami,
  ssb,
};
