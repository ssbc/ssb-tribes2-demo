const { createElement } = require("react");

function h(tag, props, children) {
  if (!children) {
    children = props;
    props = null;
  }
  return createElement(tag, props, children);
}

module.exports = { h };
