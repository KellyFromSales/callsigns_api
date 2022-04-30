const knex = require("knex");
require("dotenv").config();

const parse = require("pg-connection-string").parse;

const pgconfig = parse(process.env.DATABASE_URL);

if (pgconfig.host != "localhost") {
  pgconfig.ssl = { rejectUnauthorized: false };
}

const connectedKnex = knex({
  client: "pg",
  connection: pgconfig,
});

module.exports = connectedKnex;
