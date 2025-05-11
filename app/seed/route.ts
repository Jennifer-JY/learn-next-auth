import bcrypt from "bcryptjs";
import { sql } from "../lib/data";

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

      await sql`DROP TABLE IF EXISTS users;`;

      await sql`
        CREATE TABLE users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          password TEXT NOT NULL
        );
      `;

      const hashedPassword = await bcrypt.hash("123456", 10);

      await sql`
        INSERT INTO users (name, password)
        VALUES ('User', ${hashedPassword})
      `;
    });

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
