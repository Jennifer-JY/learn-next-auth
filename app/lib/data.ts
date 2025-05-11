import postgres from "postgres";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" }); // will use psql environment variables
