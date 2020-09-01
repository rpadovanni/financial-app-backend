import knex from 'knex';

// CONFIGS
import DB_CONNECTION from '../config/database';

const connection = knex({
    client: DB_CONNECTION.client,
    connection: DB_CONNECTION.connection,
    useNullAsDefault: true
});

export default connection;
