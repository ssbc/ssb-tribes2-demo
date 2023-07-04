const { createElement } = require("react");

// to not have to put null for props everywhere
function h(tag, ...children) {
  return createElement(tag, null, ...children);
}

module.exports = { h, p: createElement };
