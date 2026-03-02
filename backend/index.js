// PART WHERE YOU DEFINED ALL THATS GOING TO BE NEEDED //
const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const bcrypt = require('bcrypt');

const app = express(); 
const PORT = 3000;

app.use(cors());
app.use(express.json());
const rateLimit = require('express-rate-limit');

// ← add this right after your app.use(express.json()) line!

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ← 15 minutes window!
    max: 10,                   // ← only 10 login attempts!
    message: {error: 'Too many login attempts, try later!'}
});

  // ← applies to ALL routes!


///// METHOD FOR ITEMS /////
app.post(`/items`,(req,res)=>{
  try{
    const {id,deskId,name,type,x,y,createdBy,creatorColor,parentId} = req.body;
    db.prepare(`
      INSERT INTO items
      (id,deskId,name,type,x,y,createdBy,creatorColor,parentId)
      VALUES
      (?,?,?,?,?,?,?,?,?)
      `).run(id,deskId,name,type,x,y,createdBy,creatorColor,parentId);
    const item = db.prepare(`
      SELECT * FROM items
      WHERE id = ?
      `).get(id);
    return res.json(item);
  }catch(error){
    res.status(500).json({log: `failed to create item`, error: error.message});
  }
})

app.delete('/items/:itemId',(req,res)=>{
  try{
    db.prepare(`
      DELETE FROM items WHERE id = ?
      `).run(req.params.itemId);
    res.json({log: `Item deleted`});
  }catch(error){
    res.status(500).json({log: `failed to delete item`, error: error.message});
  }
})

app.put('/items/:id',(req,res)=>{
  try{
    const {name,x,y,accessPassword,creatorColor,parentId} = req.body;
    db.prepare(`
      UPDATE items SET 
      name = ?,
      x = ?,
      y = ?,
      accessPassword = ?,
      creatorColor = ?,
      parentId = ?
      WHERE id = ?
      `).run(name,x,y,accessPassword,creatorColor,parentId,req.params.id);
    const updatedItem = db.prepare(`
      SELECT * FROM items
      WHERE id = ?
      `).get(req.params.id);
    return res.json(updatedItem);
  }catch(error){
    res.status(500).json({log: `failed to update item`, error: error.message});
  }
})

app.get(`/items/users/:userId`,(req,res)=>{
  try{
    const selectedItems = db.prepare(`  
      SELECT * FROM items
      WHERE createdBy = ?
      `).all(req.params.userId);
    return res.json(selectedItems);
  }catch(error){
    res.status(500).json({log: `failed to get items`, error: error.message});
  }
})

app.get(`/items/:id`,(req,res)=>{
  try{
    const itemSearched = db.prepare(`
      SELECT * FROM items
      WHERE id = ?
      `).get(req.params.id);
    return res.json(itemSearched);
  }catch(error){
    res.status(500).json({log: `failed to get item`, error: error.message});
  }
})

///////////// Part for users //////////////
app.put(`/name/userName/:id`,(req,res)=>{
  try{
    const {name,userName} = req.body;
    let allUserByIdNameUserName = db.prepare(`
      SELECT * FROM users
      WHERE id = ?
      OR name LIKE ?
      OR userName LIKE ?
      `).all(req.params.id,`%${name}%`,`%${userName}%`);
      // ↑ changed get to all! returns array not just one!
    return res.json(allUserByIdNameUserName);
  }catch(error){
    res.status(500).json({log: `failed to search users`, error: error.message});
  }
})

app.post(`/logging/:userName`, loginLimiter, async (req,res)=>{
  try{
    const {password} = req.body;
    const {userName} = req.params;
    let user = db.prepare(`
      SELECT * FROM users
      WHERE userName = ?
      `).get(userName);
    if(!user){
      return res.status(401).json({error: 'wrong username or password'});
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({error: 'wrong username or password'});
      // ↑ fixed! was returning empty response before!
    }
    delete user.password; // ← never send password back!
    return res.json(user);
  }catch(error){
    res.status(500).json({log: `failed to login`, error: error.message});
  }
})

app.post(`/users`, async (req,res)=>{
  try{
    const {name, userName, id, accountType, mail, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare(`
      INSERT INTO users
      (name, userName, id, accountType, mail, password)
      VALUES
      (?,?,?,?,?,?)
      `).run(name, userName, id, accountType, mail, hashedPassword);
    let newUser = db.prepare(`
      SELECT * FROM users
      WHERE id = ?
      `).get(id);
    delete newUser.password; // ← never send password back!
    return res.json(newUser);
  }catch(error){
    res.status(500).json({log: `failed to add user`, error: error.message});
  }
})

app.put(`/users/:id`, (req,res)=>{
  try{
    const {name, userName, accountType, mail, friendList, notif, userColor} = req.body;
    // ↑ password removed! never update password from here!
    db.prepare(`
      UPDATE users
      SET
      name = ?,
      userName = ?,
      accountType = ?,
      mail = ?,
      friendList = ?,
      notif = ?,
      userColor = ?
      WHERE id = ?
      `).run(name, userName, accountType, mail, friendList, notif, userColor, req.params.id);
      // ↑ password removed from SET!
    let updatedUser = db.prepare(`
      SELECT * FROM users
      WHERE id = ?
      `).get(req.params.id);
    delete updatedUser.password; // ← never send password back!
    return res.json(updatedUser);
  }catch(error){
    res.status(500).json({log: `failed to update user`, error: error.message});
  }
})

app.delete('/users/:userId',(req,res)=>{
  try{
    db.prepare(`
      DELETE FROM users
      WHERE id = ?
      `).run(req.params.userId);
    res.json({log: 'User deleted'});
  }catch(error){
    res.status(500).json({log: `failed to delete user`, error: error.message});
  }
})

app.get(`/users/search/:userName`,(req,res)=>{
  try{
    let userFound = db.prepare(`
      SELECT * FROM users
      WHERE userName = ?
      `).get(req.params.userName);
    if(userFound) delete userFound.password; // ← never send password back!
    return res.json(userFound);
  }catch(error){
    res.status(500).json({log: `failed to get user`, error: error.message});
  }
})

app.get('/users/:userId',(req,res)=>{
  try{
    let selectedUser = db.prepare(`
      SELECT * FROM users
      WHERE id = ?
      `).get(req.params.userId);
    if(selectedUser) delete selectedUser.password; // ← never send password back!
    return res.json(selectedUser);
  }catch(error){
    res.status(500).json({log: `failed to get user`, error: error.message});
  }
})

////////////// DESK SIDE ////////////

app.get(`/desks/user/:userId`,(req,res)=>{
  try{
    let arrayOfDesk = db.prepare(`
      SELECT * FROM desks
      WHERE ownerId = ?
      `).all(req.params.userId);
    return res.json(arrayOfDesk);
  }catch(error){
    res.status(500).json({log: `failed to get desks`, error: error.message});
  }
})

app.post(`/desks/deskAccess/`,(req,res)=>{
  try{
    const {id, name, ownerId, createdAt} = req.body; 
    let newDesk = db.prepare(`
      INSERT INTO desks
      (id, name, ownerId, createdAt)
      VALUES
      (?,?,?,?)
      `).run(id, name, ownerId, createdAt);
    db.prepare(`
      INSERT INTO deskAccess
      (deskId, userId, accessType)
      VALUES
      (?,?,'admin')
      `).run(id, ownerId);
    newDesk = db.prepare(`
      SELECT * FROM desks
      WHERE id = ?
      `).get(id);
    return res.json(newDesk);
  }catch(error){
    res.status(500).json({log: `failed to create desk`, error: error.message});
  }
})

app.put(`/desks/:deskId`,(req,res)=>{
  try{
    const {name, ownerId, urlLink, accessPassword, createdAt} = req.body;
    db.prepare(`
      UPDATE desks
      SET
      name = ?,
      ownerId = ?,
      urlLink = ?,
      accessPassword = ?,
      createdAt = ?
      WHERE id = ?
      `).run(name, ownerId, urlLink, accessPassword, createdAt, req.params.deskId);
    let updatedDesk = db.prepare(`
      SELECT * FROM desks
      WHERE id = ?
      `).get(req.params.deskId);
    return res.json(updatedDesk);
  }catch(error){
    res.status(500).json({log: `failed to update desk`, error: error.message});
  }
})

app.delete(`/desks/:deskId`,(req,res)=>{
  try{
    const selectedDesk = db.prepare(`
      SELECT * FROM deskAccess
      WHERE deskId = ?
      `).all(req.params.deskId);
    if(selectedDesk.length === 1){
      db.prepare(`DELETE FROM desks WHERE id = ?`).run(req.params.deskId);
      return res.json({log: 'deleted'});
    }
    res.json({log: 'This is a shared desk'});
  }catch(error){
    res.status(500).json({log: `failed to delete desk`, error: error.message});
  }
})

app.get(`/desks/:id`,(req,res)=>{
  try{
    let requiredDesk = db.prepare(`
      SELECT * FROM desks
      WHERE id = ?
      `).get(req.params.id);
    return res.json(requiredDesk);
  }catch(error){
    res.status(500).json({log: `failed to get desk`, error: error.message});
  }
})

////////////// ACCESS QUERIES SIDE ////////////////

app.get(`/deskAccess/items/:deskId`,(req,res)=>{
  try{
    let allItems = db.prepare(`
      SELECT * FROM items
      WHERE deskId = ?
      `).all(req.params.deskId);
    return res.json(allItems);
  }catch(error){
    res.status(500).json({log: `failed to get items`, error: error.message});
  }
})

app.post(`/deskAccess/accessType`,(req,res)=>{
  try{
    const {userId, deskId} = req.body;
    let access = db.prepare(`
      SELECT accessType FROM deskAccess
      WHERE userId = ? AND deskId = ?
      `).get(userId, deskId);
    return res.json(access);
  }catch(error){
    res.status(500).json({log: `failed to get access`, error: error.message});
  }
})

app.delete('/deskAccess/:deskId',(req,res)=>{
  try{
    const {userId} = req.body;
    db.prepare(`
      DELETE FROM deskAccess
      WHERE deskId = ? AND userId = ?
      `).run(req.params.deskId, userId);
    res.json({log: 'Desk access deleted'});
  }catch(error){
    res.status(500).json({log: `failed to delete desk access`, error: error.message});
  }
})


app.get(`/deskAccess/:deskId`,(req,res)=>{
  try{
    let allUserFromDesk = db.prepare(`
      SELECT * FROM deskAccess
      WHERE deskId = ?
      `).all(req.params.deskId);
    console.log(allUserFromDesk);
    return res.json(allUserFromDesk);
  }catch(error){
    res.status(500).json({log: `failed to get desk access`, error: error.message});
  }
})

app.post(`/deskAccess/:userId`,(req,res)=>{
  try{
    const {deskId} = req.body;
    db.prepare(`
      INSERT INTO deskAccess
      (userId, deskId, accessType)
      VALUES (?, ?, 'read')
      `).run(req.params.userId, deskId);
    res.json({log: 'user Added'});
  }catch(error){
    res.status(500).json({log: `failed to add user to desk`, error: error.message});
  }
})

app.put(`/deskAccess/accessType/:userId`,(req,res)=>{
  try{
    const {accessType, deskId} = req.body;
    db.prepare(`
      UPDATE deskAccess
      SET accessType = ?
      WHERE userId = ? AND deskId = ?
      `).run(accessType, req.params.userId, deskId);
    res.json({log: 'Modify done'});
  }catch(error){
    res.status(500).json({log: `failed to update access type`, error: error.message});
  }
})

app.get(`/deskAccess/user/:userId`,(req,res)=>{ // get all desk that user can access !
  try{
    let arrayOfDesk = db.prepare(`
      SELECT deskId FROM deskAccess
      WHERE userId = ?
      `).all(req.params.userId);
      console.log(arrayOfDesk);
      return res.json(arrayOfDesk);
  }catch(error){
    res.status(500).json({log: `failed to update access type`, error: error.message});
  }
})

app.put(`/deskAccess/accessType`,(req,res)=>{
  try{
    const {accessType,userId} = req.body;
    db.prepare(`
      UPDATE deskAccess SET
      accessType = ?
      WHERE userId = ?
      `).run(accessType,userId);
      console.log('permission changed')
  }catch(error){
    res.status(500).json({log: `failed to update access type`, error: error.message});
  }
})

//// PART THAT KEEPS THE SERVER ALIVE ////
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

process.once('SIGUSR2', () => {
  server.close(() => {
    db.close();
    process.kill(process.pid, 'SIGUSR2');
  });
});