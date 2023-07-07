const { createElement: h, useState } = require("react");
const MyRootId = require("./ui/MyRootId");
const NewConnection = require("./ui/NewConnection");
const CreateGroup = require("./ui/CreateGroup");
const ListGroups = require("./ui/ListGroups");
const ViewGroup = require("./ui/ViewGroup");

function App() {
  const [viewedGroup, setViewedGroup] = useState(null);

  return h(
    "div",
    {},
    h(MyRootId),
    h(NewConnection),
    h(CreateGroup),
    h(ListGroups, { setViewedGroup }),
    viewedGroup && h(ViewGroup, { groupId: viewedGroup })
  );
}

module.exports = { App };
