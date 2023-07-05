const startSbot = require("./bot");

const ssb = startSbot();
console.log(ssb)
// TODO await
//ssb.tribes2.start();

function whoami() {
  return ssb.id;
}

module.exports = {
  whoami,
};
