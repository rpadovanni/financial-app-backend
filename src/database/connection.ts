import knex from 'knex';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const connection = knex({
    client: isProduction ? 'pg' : 'sqlite3',
    connection: isProduction ? process.env.DATABASE_URL : {
        filename: path.resolve(__dirname, 'financial-app-db.sqlite'),
    },
    useNullAsDefault: true
});

export default connection;
