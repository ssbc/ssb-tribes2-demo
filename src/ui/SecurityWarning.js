const { createElement: h } = require("react");

function SecurityWarning() {
  return h(
    "div",
    {},
    "WARNING: This app has not been designed for, or vetted for, safety sensitive usecases."
  );
}

module.exports = SecurityWarning;
