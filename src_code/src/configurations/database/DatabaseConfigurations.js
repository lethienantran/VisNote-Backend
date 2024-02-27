/** Don't make or push any changes on this configuration file, especially when you're change developing environment */

/** Initialize Knex */
import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

let databaseName;

if (process.env.NODE_ENV === "test") {
  databaseName = process.env.DB_TEST_NAME;
} else if (process.env.NODE_ENV === "production") {
  databaseName = process.env.DB_PROD_NAME;
} else {
  databaseName = process.env.DB_DEV_NAME;
}

const config = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: databaseName,
  },
};

const db = knex(config);

/** Export db object that already config */
export default db;
