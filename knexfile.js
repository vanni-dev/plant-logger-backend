import dotenv from 'dotenv';
dotenv.config();

const knexConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 1,
    max: 10,
  },
  migrations: {
    directory: './src/models/migrations',
  },
  seeds: {
    directory: './src/models/seeds',
  },
};

export default knexConfig;
