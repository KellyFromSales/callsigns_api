const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { timeout } = require("nodemon/lib/config")

const SERVER_URL = "http://uk-callsigns-api.herokuapp.com"
  
  describe("Callsign Service Verification", () => {
    it("validates the expectations of Callsign Service", () => {
      let opts = {
            provider: "Callsign Service",
            logLevel: "INFO",
            providerBaseUrl: SERVER_URL,
            pactUrls: ['http://localhost:8080/pacts/provider/CallsignService/consumer/Frontend/latest'],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: true,
            providerVersion: "1.0.0",
            timeout: 180000
          }
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    })
})