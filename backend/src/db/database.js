const sqlite3 =
require("sqlite3").verbose();

const path =
require("path");

/* DATABASE PATH */

const dbPath =
path.resolve(
  process.cwd(),
  "taskmanager.db"
);

/* DATABASE CONNECTION */

const db =
new sqlite3.Database(

  dbPath,

  (err)=>{

    if(err){

      console.log(
        "Database Connection Error:",
        err
      );

    }else{

      console.log(
        "SQLite Database Connected"
      );

    }

  }

);

/* =========================
   USERS TABLE
========================= */

db.run(`
  CREATE TABLE IF NOT EXISTS users(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT,

    email TEXT UNIQUE,

    password TEXT,

    role TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  )
`);

/* =========================
   PROJECTS TABLE
========================= */

db.run(`
  CREATE TABLE IF NOT EXISTS projects(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    title TEXT,

    description TEXT,

    deadline TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  )
`);

/* =========================
   TEAMS TABLE
========================= */

db.run(`
  CREATE TABLE IF NOT EXISTS teams(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    name TEXT,

    description TEXT,

    project_id INTEGER,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  )
`);

/* =========================
   TASKS TABLE
========================= */

db.run(`
  CREATE TABLE IF NOT EXISTS tasks(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    title TEXT,

    description TEXT,

    priority TEXT,

    status TEXT,

    deadline TEXT,

    project_id INTEGER,

    team_id INTEGER,

    assigned_to TEXT,

    comments TEXT DEFAULT '[]',

    attachments TEXT DEFAULT '[]',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  )
`);

/* =========================
   NOTIFICATIONS TABLE
========================= */

db.run(`
  CREATE TABLE IF NOT EXISTS notifications(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    message TEXT,

    is_read INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  )
`);

/* =========================
   ACTIVITIES TABLE
========================= */

db.run(`
  CREATE TABLE IF NOT EXISTS activities(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    message TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

  )
`);

module.exports = db;