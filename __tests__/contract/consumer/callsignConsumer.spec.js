"use strict"

const { Pact, Matchers } = require("@pact-foundation/pact")
const { getCallsigns, postCallsign, getCallsign } = require("../../../consumer/consumer")
const { eachLike, like } = Matchers


describe("Callsign Service", () =>{
    const GET_CALLSIGN_BODY = {
      "Callsign": 
          eachLike({
              Callsign: like("M7RFT"),
              Status: like("Allocated"),
              Type: like("Call Sign - Amateur"),
              Level: like("Foundation"),
              QRZ: like("https://www.qrz.com/db/M7RFT")
          },{min:1})
      }
      
    afterEach(() => provider.verify())

    describe("GET Callsign", () => {
        beforeEach(() => {
            const interaction = {
                state: "i have a list of callsigns",
                uponReceiving: "a request for a callsign",
                withRequest: {
                    method: "GET",
                    path: "/callsigns/M7RFT",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_CALLSIGN_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })
        test("returns correct body, header and statusCode", async() => {
            const expected = /[G]\d|[M][015]|21|20|[M][367]/;
            const response = await getCallsign("M7RFT")
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            expect(response.data.Callsign[0].Callsign).toEqual(expect.stringMatching(expected));
            expect(response.status).toEqual(200)
        })
    })

    const GET_CALLSIGNS_BODY = {
        "Callsigns": 
            eachLike({
                Callsign: "M7RFT"
            },{min:1})
        }

    describe("GET Callsigns", () => {
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
                    body: GET_CALLSIGNS_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })
        test("returns correct header and statusCode", async() => {
            const response = await getCallsigns()
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            expect(response.status).toEqual(200)
        })
    })

})