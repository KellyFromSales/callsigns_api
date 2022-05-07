const path = require("path")
const Pact = require("@pact-foundation/pact").Pact

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}

global.provider = new Pact({
  port: port,
  log: path.resolve(process.cwd(), "__tests__/contract/logs", "mockserver-integration.log"),
  dir: path.resolve(process.cwd(), "__tests__/contract/pacts"),
  spec: 2,
  logLevel: 'debug',
  pactfileWriteMode: "overwrite",
  consumer: "Frontend",
  provider: "CallsignService",
})