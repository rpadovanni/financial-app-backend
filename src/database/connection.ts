import knex from 'knex';
import path from 'path';

const connection = knex({
    client: process.env.BUILD_ENV ? 'pg' : 'sqlite3',
    connection: process.env.BUILD_ENV ? process.env.DATABASE_URL : {
        filename: path.resolve(__dirname, 'financial-app-db.sqlite')
    },
    useNullAsDefault: true
});

export default connection;
