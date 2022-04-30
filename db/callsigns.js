const knex = require("./knex");

function addCallsign(cs) {
  return knex("callsigns").insert(cs).onConflict("Value").ignore();
}

function getAllCallsigns() {
  return knex("callsigns").select("*");
}

function getCallsign(id) {
  return knex("callsigns").where("Value", id);
}

function getCallsignByLevel(level) {
  return knex("callsigns").where("Level", level);
}

function deleteCallsign(id) {
  return knex("callsigns").where("Value", id).del();
}

function updateCallsign(id, cs) {
  return knex("callsigns").where("Value", id).update(cs);
}

module.exports = {
  addCallsign,
  getAllCallsigns,
  deleteCallsign,
  updateCallsign,
  getCallsign,
  getCallsignByLevel,
};
