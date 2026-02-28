const Database = require('better-sqlite3');
const db = new Database('./backend/data/database.db'); 
db.pragma('foreign_keys = ON');

// db.exec(`
//   DROP TABLE IF EXISTS items;
//   DROP TABLE IF EXISTS deskAccess;
//   DROP TABLE IF EXISTS desks;
//   DROP TABLE IF EXISTS users
//   `);

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
    accessType          TEXT NOT NULL CHECK(accessType IN ('read','modify','admin')) DEFAULT 'read' , 
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
    creatorColor          TEXT,
    parentId              TEXT,
    FOREIGN KEY (deskId) REFERENCES desks(id)
    ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES items(id)
    ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES users(id)
    ON DELETE SET NULL
    );
`);
 ////////////////    TESTING PURPOSES  ///////////////////

 ////////////// Users Settings ///////////////
// db.prepare(`
//   INSERT INTO users
//   (name,userName,id,accountType,mail,password,friendList)
//   VALUES
//   (?,?,?,?,?,?,?)`
// ).run('user0','user0','user0','user','user0@mail','1',['bob']);

// db.prepare(`
//   INSERT INTO users
//   (name,userName,id,accountType,mail,password,friendList)
//   VALUES
//   (?,?,?,?,?,?,?)`
// ).run('bob','bob','bob','user','bob@mail','1',['user0']);

// db.prepare(`
//   INSERT INTO users
//   (name,userName,id,accountType,mail,password,friendList)
//   VALUES
//   (?,?,?,?,?,?,?)`
// ).run('simon','simon','simon','admin','simon@mail','1','[]');

// ////////////////// DESKS AND DESKACCESS SETTINGS ///////////////////

// db.prepare(`
//   INSERT INTO desks
//   (id,name,ownerId, createdAt)
//   VALUES
//   (?,?,?,?)`
// ).run('desk0','desk0','user0',Date.now().toString());

// db.prepare(`
//   INSERT INTO deskAccess
//   (deskId,userId,accessType)
//   VALUES
//   (?,?,?)`
// ).run('desk0','user0','admin');

// db.prepare(`
//   INSERT INTO desks
//   (id,name,ownerId,createdAt)
//   VALUES
//   (?,?,?,?)`
// ).run('deskSimon','deskSimon','simon',Date.now().toString());

// db.prepare(`
//   INSERT INTO deskAccess
//   (deskId,userId,accessType)
//   VALUES
//   (?,?,?)`
// ).run('deskSimon','simon','admin');

// db.prepare(`
//   INSERT INTO desks
//   (id,name,ownerId,createdAt)
//   VALUES
//   (?,?,?,?)`
// ).run('deskBob','deskBob','bob',Date.now().toString());
// db.prepare(`
//   INSERT INTO deskAccess
//   (deskId,userId,accessType)
//   VALUES
//   (?,?,?)`
// ).run('deskBob','bob','admin');

// db.prepare(`
//   INSERT INTO deskAccess
//   (deskId,userId,accessType)
//   VALUES
//   (?,?,?)`
// ).run('deskBob','simon','modify');

// db.prepare(`
//   INSERT INTO deskAccess
//   (deskId,userId,accessType)
//   VALUES
//   (?,?,?)`
// ).run('deskBob','user0','read');



////////// IN ORDER FOR FRONT TO BE ABLE TO COMMUNICATE ///////////////
module.exports = db; 

