import 'dotenv/config';
import { usersTable } from '../../db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { like } from 'drizzle-orm';
const db = drizzle("postgres://postgres:5432@localhost:5432/drizzlesvtestdb");

export async function load({ url }) {

    const searchQuery = url.searchParams.get('search') || '';

    let users = await db.select().from(usersTable).where(like(usersTable.nameEN, `%${searchQuery}%`));

    return {
        users: users,
        searchQuery: searchQuery
    };
}