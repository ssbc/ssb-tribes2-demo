const { createElement: h } = require("react");
const { whoami } = require("./ssb");
const NewConnection = require("./ui/NewConnection");
const CreateGroup = require("./ui/CreateGroup");

function App() {
  return h(
    "div",
    {},
    h("div", {}, "My ssb id: " + whoami()),
    h(NewConnection),
    h(CreateGroup)
    //h(ListGroups)
  );
}

module.exports = { App };
