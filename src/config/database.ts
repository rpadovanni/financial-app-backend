import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const DB_CONNECTION = {
    client: isProduction ? 'pg' : 'sqlite3',
    connection: isProduction ? process.env.DATABASE_URL : {
        filename: path.resolve(__dirname, 'financial-app-db.sqlite')
    }
};

export default DB_CONNECTION;