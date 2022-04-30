const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "callsigns.db"
    },
    useNullAsDefault: true
});

module.exports = connectedKnex;