/* eslint-disable brace-style */
const { ipcRenderer } = require('electron')
const SSB = require('./ssb')

const ssb = SSB() // eslint-disable-line

// wait for channel set up by UI window
ipcRenderer.on('provide-ui-channel', (event) => {
  const [port] = event.ports

  // listen for messages from the UI
  port.onmessage = (ev) => {
    console.log('received from window/ui', ev.data)

    if (ev.data.method === 'whoami') {
      port.postMessage(ssb.whoami())
    }
  }
})
