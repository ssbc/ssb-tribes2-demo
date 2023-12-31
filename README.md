# ssb-tribes2-demo

A simple electron app that shows off the features of `ssb-tribes2`.

## Security considerations

While we have tried our best to create a secure end-to-end encrypted communication protocol, this app nor derivations off of it are not fit for use in safety critical situations. Neither the code nor the specification has been vetted by an independent party. Even assuming a solid implementation, and a bug-free spec, we have intentionally left out several security features that are considered state of the art in other apps such as Signal, such as "forward secrecy".

Because of this, we advise that anyone that uses `ssb-tribes2` or something based on the private group spec in an app, includes prominent UI that warns the user about possible risks.

## Links

- [ssb-tribes2](https://github.com/ssbc/ssb-tribes2) - The module that this demo uses for encryption
- [private-group-spec](https://github.com/ssbc/private-group-spec) - The spec that `ssb-tribes2` is based on
- [ssb-group-exclusion-spec](https://github.com/ssbc/ssb-group-exclusion-spec) - The spec that defines exclusion from a private group
