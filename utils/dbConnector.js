const knex = require('knex');

const knexConnector = knex({
    client: 'sqlite3',
    connection: {
        filename: "../users.sqlite"
    }
});

module.exports = knexConnector;