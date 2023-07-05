const { ipcRenderer, contextBridge } = require('electron')

// We request that the main process sends us a channel we can use to
// communicate with the backend
let port
ipcRenderer.send('request-channel')

ipcRenderer.once('provide-ssb-channel', (event) => {
  port = event.ports[0]
  // ... register a handler to receive results ...
  port.onmessage = (ev) => {
    console.log('received from window/ssb:', ev.data)

    if (_resolve) _resolve(ev.data)
  }

  let _resolve

  contextBridge.exposeInMainWorld('ssb', {
    whoami: async () => {
      if (_resolve) throw Error('already waiting for another method to complete')

      // JANK!
      // the MessageChannel thing only supports posting + receiving messages,
      // so we have to set up our own send + catch for methods
      //
      // NOTE this current solution is *blocking* (as there is no queue
      // would have to track a query-id or something for ideal solution
      // ...or just make a GRAPHQL API
      const promise = new Promise((resolve, reject) => {
        _resolve = resolve
      })

      port.postMessage({ method: 'whoami' })

      return promise
    }
  })
})
