const knex = require("./knex");

function addCallsign(cs) {
  return knex("callsigns").insert(cs).onConflict("Callsign").ignore();
}

function getAllCallsigns() {
  return knex("callsigns").select("*");
}

function getCallsign(id) {
  return knex("callsigns").where("Callsign", id);
}

function getCallsignByLevel(level) {
  return knex("callsigns").where("Level", level);
}

function deleteCallsign(id) {
  return knex("callsigns").where("Callsign", id).del();
}

function updateCallsign(id, cs) {
  return knex("callsigns").where("Callsign", id).update(cs);
}

module.exports = {
  addCallsign,
  getAllCallsigns,
  deleteCallsign,
  updateCallsign,
  getCallsign,
  getCallsignByLevel,
};
