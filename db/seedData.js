import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DB_STRING,
});

const seedData = async () => {
  console.log("Seeding...");

  await client.connect();

  const queryString = `
    DROP TABLE IF EXISTS "UserSession";
    DROP TABLE IF EXISTS Users;

    CREATE TABLE "UserSession" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

    ALTER TABLE "UserSession" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "UserSession" ("expire");

    CREATE TABLE Users (
        username VARCHAR(25) PRIMARY KEY,
        password VARCHAR NOT NULL
    );
    `;

  await client.query(queryString);
  await client.end();

  console.log("Done!");
};

seedData();
