const path = require("path")
const { Verifier } = require("@pact-foundation/pact")

const SERVER_URL = "http://uk-callsigns-api.herokuapp.com"
  
  describe("Callsign Service Verification", () => {
    it("validates the expectations of Callsign Service", () => {
      let opts = {
            provider: "Callsign Service",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            pactUrls: [path.resolve(process.cwd(), "./__tests__/contract/pacts/frontend-callsignservice.json")],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: false,
            providerVersion: "1.0.0"
          }
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    })
})