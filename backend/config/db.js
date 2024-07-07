import mariadb from 'mariadb';

const mariadbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
};

const pool = mariadb.createPool(mariadbConfig);

export default pool;
