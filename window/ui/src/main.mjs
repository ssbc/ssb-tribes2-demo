// import { createRoot } from "../../../node_modules/react-dom/client";
// import { createElement as h } from "../../../node_modules/react";

// import App from './app.mjs';

// const root = createRoot(document.getElementById("app"));
// root.render(h(App));

// NOTE - frontend setup sucks, I dropped it because setting up build is outside of scope

const appRoot = document.getElementById("app")

// Using the API provided by preload
window.ssb.whoami()
  .then(data => {
    const div = document.createElement('code')
    div.innerHTML = JSON.stringify(data, null, 2)

    appRoot.appendChild(div)
  })
  .catch(console.error)
