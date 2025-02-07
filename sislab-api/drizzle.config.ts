// This file is used to configure Drizzle Kit
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const DB_HOST = encodeURIComponent(process.env.DB_HOST);
const DB_USER = encodeURIComponent(process.env.DB_USER);
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_NAME = encodeURIComponent(process.env.DB_NAME);
const DB_PORT = encodeURIComponent(process.env.DB_PORT);

export default defineConfig({
  schema: "./db/schema/*",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
  strict: true,
  verbose: true,
});
