// SPDX-FileCopyrightText: 2022 Mix Irving
//
// SPDX-License-Identifier: Unlicense

const SecretStack = require("secret-stack");
const ssbKeys = require("ssb-keys");
const bendyButtFormat = require("ssb-ebt/formats/bendy-butt");
const path = require("path");
const rimraf = require("rimraf");

// crypto.randomBytes(32).toString("base64")
const shs = Buffer.from(
  "EbTjzcEGQUD/DQdawWyx3r5p6EmizxLG5wuwHqZdXvU=",
  "base64"
);
// this is not
// the same as the main-net ssb-caps (so this doesn't try gossiping with e.g.
// manyverse instances)

const randomId = Math.floor(Math.random() * 1000);

const dir = `/tmp/ssb-tribes2-demo-${randomId}`;
rimraf.sync(dir);

const keys = ssbKeys.loadOrCreateSync(path.join(dir, "secret"));

module.exports = function startSbot() {
  const stack = SecretStack({ caps: { shs } })
    .use(require("ssb-db2/core"))
    .use(require("ssb-classic"))
    .use(require("ssb-bendy-butt"))
    .use(require("ssb-meta-feeds"))
    .use(require("ssb-box2"))
    .use(require("ssb-db2/compat/feedstate"))
    .use(require("ssb-db2/compat/ebt"))
    .use(require("ssb-db2/compat/db")) // for legacy replicate
    .use(require("ssb-db2/compat/history-stream")) // for legacy replicate
    .use(require("ssb-friends"))
    .use(require("ssb-ebt"))
    .use(require("ssb-tribes2"))
    .use(require("ssb-subset-rpc"))
    .use(require("ssb-replication-scheduler"));

  const sbot = stack({
    path: dir,
    keys,
    ebt: {
      // logging: true,
    },
    db2: {
      flushDebounce: 10,
      writeTimeout: 10,
    },
    tribes2: {
      // timeoutLow: opts.timeoutLow,
      // timeoutHigh: opts.timeoutHigh,
    },
    friends: {
      hops: 1,
    },
    replicationScheduler: {
      //debouncePeriod: 1,
      partialReplication: {
        0: [{}],
        1: [{ purpose: "main" }, { purpose: "group/additions" }],
        group: [{ purpose: "$groupSecret" }],
      },
    },
  });

  sbot.name = "demo";
  sbot.ebt.registerFormat(bendyButtFormat);

  return sbot;
};
