const axios = require('axios')
const express = require("express")
const server = express()
const getApiEndpoint = "http://localhost:5001"

const getCallsigns = async () => {
  const res = await axios
    .get(`${getApiEndpoint}/callsigns`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.res
    })
  return res
}

const getCallsign = async (id) => {
      const res = await axios
        .get(`${getApiEndpoint}/callsigns/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.res
        })
    return res
}

const postCallsign = async (body) => {
      const res = await axios
      .post(`${getApiEndpoint}/callsigns`, body, {'Content-Type': 'application/json;charset=utf-8'})
      .then((res) => {
          return res
        })
        .catch((err) => {
          return err.res
        })
    return res
}

const deleteCallsign = async (id) => {
    const res = await axios
        .delete(`${getApiEndpoint}/callsigns/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.res
        })
    return res
}


module.exports = {
  server,
  getCallsigns,
  postCallsign,
  getCallsign,
  deleteCallsign,
};