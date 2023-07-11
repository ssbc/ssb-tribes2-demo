const { createElement: h, useState } = require("react");
const MyRootId = require("./ui/MyRootId");
const NewConnection = require("./ui/NewConnection");
const Connections = require("./ui/Connections");
const CreateGroup = require("./ui/CreateGroup");
const GroupInvites = require("./ui/GroupInvites");
const ListGroups = require("./ui/ListGroups");
const ViewGroup = require("./ui/ViewGroup");

function App() {
  const [viewedGroup, setViewedGroup] = useState(null);

  return h(
    "div",
    {},
    h(NewConnection),
    h(Connections),
    h(MyRootId),
    h(CreateGroup),
    h(GroupInvites),
    h(ListGroups, { viewedGroup, setViewedGroup }),
    viewedGroup && h(ViewGroup, { groupId: viewedGroup, key: viewedGroup })
  );
}

module.exports = { App };
