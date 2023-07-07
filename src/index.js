const { createElement: h, useState } = require("react");
const { whoami } = require("./ssb");
const NewConnection = require("./ui/NewConnection");
const CreateGroup = require("./ui/CreateGroup");
const ListGroups = require("./ui/ListGroups");

function App() {
  const [viewedGroup, setViewedGroup] = useState(null);

  console.log("viewedGroup:", viewedGroup);

  return h(
    "div",
    {},
    h("div", {}, "My ssb id: " + whoami()),
    h(NewConnection),
    h(CreateGroup),
    h(ListGroups, { setViewedGroup })
  );
}

module.exports = { App };
