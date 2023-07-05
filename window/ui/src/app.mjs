import { createElement as h, useState } from "../../../node_modules/react";

export default function App () {
  const [count, setCount] = useState(0);
  const [id, setId] = useState('...')

  // Using the API provided by preload
  window.ssb.whoami()
    .then(feedId => setId(feedId))
    .catch(console.error)

  return h(
    "div",
    {},
    h("div", {}, "Count: " + count),
    h("button", { onClick: () => setCount(count + 1) }, "Click me?"),
    h("div", {}, "My ssb id: " + id)
  );
}
