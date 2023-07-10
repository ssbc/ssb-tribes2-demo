const { createElement: h, useState, useEffect } = require("react");
const pull = require("pull-stream");
const { groupRecp } = require("ssb-tribes2/lib/operators");
const {
  where,
  and,
  isDecrypted,
  type,
  live: dbLive,
  toPullStream,
} = require("ssb-db2/operators");
const { ssb } = require("../ssb");

function GroupMessages({ groupId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let drain;
    pull(
      ssb.db.query(
        where(and(isDecrypted("box2"), type("post"), groupRecp(groupId))),
        dbLive({ old: true }),
        toPullStream()
      ),
      (drain = pull.drain((msg) => {
        if (!messages.find((message) => message.key === msg.key)) {
          setMessages([...messages, msg]);
        }
      }))
    );

    return () => drain.abort();
  });

  return h(
    "div",
    {},
    messages
      .toSorted((a, b) => b.value.timestamp - a.value.timestamp)
      .map((msg) => h("div", { key: msg.key }, msg?.value?.content?.text))
  );
}

module.exports = GroupMessages;
