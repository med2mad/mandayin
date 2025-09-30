import { usersTable } from './db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
const db = drizzle("postgres://postgres:5432@localhost:5432/drizzlesvtestdb");

async function main() {

    // const user: typeof usersTable.$inferInsert = {
    //     name: 'John',
    //     age: 30,
    //     email: 'john@example.com',
    //     photo: 'SETO tumblr_inline_osu1qdxMjs1sku8xc_500.png'
    // };
    // await db.insert(usersTable).values(user);

    const users = await db.select().from(usersTable);
    console.log(users)

    // await db
    //     .update(usersTable)
    //     .set({
    //         age: 31,
    //     })
    //     .where(eq(usersTable.email, user.email));

    //   await db.delete(usersTable).where(eq(usersTable.email, user.email));
}

main();
