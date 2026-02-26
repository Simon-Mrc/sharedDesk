const Database = require('better-sqlite3');
const db = new Database('./data/database.db'); 
db.pragma('foreign_keys = ON');

db.exec(`
      CREATE TABLE IF NOT EXISTS users(
      name              TEXT NOT NULL,
      userName          TEXT UNIQUE NOT NULL,
      id                TEXT PRIMARY KEY,
      accountType       TEXT CHECK(accountType IN ('admin','user')) DEFAULT 'user',
      mail              TEXT UNIQUE NOT NULL,
      password          TEXT NOT NULL,  
      friendList        TEXT DEFAULT '[]',  
      notif             TEXT DEFAULT '[]',
      userColor         TEXT DEFAULT '#FF5733'
  
    );
    CREATE TABLE IF NOT EXISTS desks(
      id                TEXT PRIMARY KEY,
      name              TEXT NOT NULL,
      ownerId           TEXT ,
      urlLink           TEXT,
      accessPassword    TEXT,
      createdAt         TEXT NOT NULL,
      FOREIGN KEY (ownerId) REFERENCES users(id)
      ON DELETE SET NULL
    )  ;  

    CREATE TABLE IF NOT EXISTS deskAccess(
    deskId              TEXT NOT NULL ,
    userId              TEXT  ,
    accessType          TEXT NOT NULL CHECK(accessType IN ('read','modify','admin')) , 
    PRIMARY KEY (deskId,userId),
    FOREIGN KEY (deskId) REFERENCES desks(id)
    ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS items(
    id                    TEXT PRIMARY KEY,
    deskId                TEXT NOT NULL,
    name                  TEXT NOT NULL,
    type                  TEXT NOT NULL CHECK(type IN ('file','folder')),
    x                     INTEGER ,
    y                     INTEGER,
    accessPassword        TEXT ,
    createdBy             TEXT ,
    parentId              TEXT,
    FOREIGN KEY (deskId) REFERENCES desks(id)
    ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES items(id)
    ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES users(id)
    ON DELETE SET NULL
    );
`);

