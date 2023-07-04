const startSbot = require("./bot");

const ssb = startSbot();
// TODO await
//ssb.tribes2.start();

function whoami() {
  return ssb.id;
}

module.exports = {
  whoami,
};
