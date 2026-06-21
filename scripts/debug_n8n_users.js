const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const os = require('os');

const dbPath = path.join(os.homedir(), '.n8n', 'database.sqlite');
console.log('Opening database:', dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error('Error opening DB:', err.message);
  }
});

db.serialize(() => {
  db.all("SELECT id, email, firstName, lastName FROM user;", (err, rows) => {
    if (err) {
      console.error('Query error:', err.message);
      db.close();
      return;
    }
    console.log('--- N8N Users ---');
    console.log(rows);
    db.close();
  });
});
