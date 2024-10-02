import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.resolve('./sqlite.db'), {
  verbose: console.log, // Optional: For logging SQL queries
});

// Create the jobs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    salary INTEGER NOT NULL
  )
`);

export default db;