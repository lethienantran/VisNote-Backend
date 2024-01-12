/** Don't make or push any changes on this configuration file, especially when you're change developing environment */

/** Initialize Knex */
const knex = require("knex");
require("dotenv").config();

const config = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
  },
};

const db = knex(config);

/** Export db object that already config */
module.exports = db;
