import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgres://postgres:5432@localhost:5432/rrr",
    },
    verbose: true,
    strict: true
});
