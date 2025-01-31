import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DB_STRING,
});

export default db;
