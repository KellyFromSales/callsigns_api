"use strict"

const { Pact, Matchers } = require("@pact-foundation/pact")
const { getCallsigns, postCallsign } = require("../../../consumer/consumer")
const { eachLike, like } = Matchers


describe("Callsign Service", () =>{
    const GET_EXPECTED_BODY = {
      "Callsigns": 
          eachLike({
              "Callsign": like("M7RFT"),
              "Status": like("Allocated"),
              "Type": like("Call Sign - Amateur"),
              "Level": like("Foundation"),
              "QRZ": like("https://www.qrz.com/db/M7RFT")
          },{min:1})
        
      }
      
    afterEach(() => provider.verify())

    describe("GET Clients", () => {
        beforeEach(() => {
            const interaction = {
                state: "i have a list of callsigns",
                uponReceiving: "a request for all callsigns",
                withRequest: {
                    method: "GET",
                    path: "/callsigns",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_EXPECTED_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })
        test("returns correct body, header and statusCode", async() => {
            const response = await getCallsigns()
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            //expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.status).toEqual(200)
        })
    })

})