import { sql } from "../lib/data";

async function listUsers() {
  const data = await sql`
    SELECT *
    FROM users
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listUsers());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
