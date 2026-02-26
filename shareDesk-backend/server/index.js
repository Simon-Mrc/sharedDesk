// PART WHERE YOU DEFINED ALL THATS GOING TO BE NEEDED //
const express = require('express');
const cors = require('cors');
const db = require('./database.js'); // File that create the database

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


///// METHOD FOR ITEMS /////
app.post(`/items`,(req,res)=>{ /// Add a new item very not specific, need to be put last
  try{                // take all item object as an argument
    const {id,deskId,name,type,x,y,createdBy,parentId }=req.body
  const result = db.prepare(`
    INSERT INTO items
    (id,deskId,name,type,x,y,createdBy,parentId)
    VALUES
    (?,?,?,?,?,?,?,?)
    `).run(id,deskId,name,type,x,y,createdBy,parentId)
    res.json({log : `Item created`})
  }catch(error){
    res.status(500).json({log: `failed to create item`, error: error.message})
  }

})

app.delete('/items/:itemId',(req,res)=>{ // This one delete an item // Children got deleted too
  try{            // only take item.id as a parameter
    db.prepare(`
      DELETE FROM items WHERE id = ?
      `).run(req.params.itemId);
      res.json({log: `Item deleted`})
    }catch(error){
      res.status(500).json({log: `failed to delete item`, error: error.message})
  }
})



app.put('/items/:id',(req,res)=>{ // update selected item // Use item object as a parameter
  try{
    const{name,x,y,accessPassword,parentId} = req.body
    db.prepare(`
      UPDATE items SET 
      name = ?,
      x = ? ,
      y = ? ,
      accessPassword = ?,
      parentId = ?
      WHERE id = ?
      `).run(name,x,y,accessPassword,parentId,req.params.id);
      res.json({log : 'item update complete'})
  }catch(error){
    res.status(500).json({log: `failed to update item`, error: error.message})
  }
})

app.get(`/items/users/:userId`,(req,res)=>{ //// This one gets you all the items created by user 
  try{                  /// All user object as a parameter. Overkill let's change that // If i m correct it now only needs user.id as a parameter from itemQueries.js
    const selectedItems = db.prepare(`  
      SELECT * FROM items
      WHERE createdBy = ?
      `).all(req.params.userId);
      res.json(selectedItems)
  }catch(error){
    res.status(500).json({log: `failed to get items`, error: error.message})
  }
})

app.get(`/items/:id`,(req,res)=>{ //// Return an item with a given id
  try{                /// Very non specific route probably needs to be put last
    const itemSearched = db.prepare(`
    SELECT * 
    FROM items
    WHERE id = ?
    `).get(req.params.id);
    res.json(itemSearched)
  }catch(error){
    res.status(500).json({log: `failed to get item`, error: error.message})
  }
})

///////////// Part for users //////////////

app.post(`/users`,(req,res)=>{    /// This one creates a new user
  try{          // Very non specific. should probably put it last 
    const {name , userName, id , accountType, mail , password} = req.body;
    db.prepare(`
      INSERT INTO users
      (name , userName, id , accountType, mail , password)
      VALUES
      (?,?,?,?,?,?)
      `).run(name , userName, id , accountType, mail , password);
      res.json({log : 'user created'})
  }catch(error){
    res.status(500).json({log: `failed to add user`, error: error.message})
  }
})

app.put(`/users/:id`,(req,res)=>{   // this one update any change in user parameters 
      try{                      // Likely need to be put last because very non specific route
        const {name , userName,  accountType, mail , password, friendList, notif, userColor} = req.body;
        db.prepare(`
        UPDATE users
        SET
        name = ?,
        userName = ?,
        accountType = ?,
        mail = ?,
        password = ?,
        friendList = ?,
        notif = ?,
        userColor = ?
        WHERE id = ?
        `).run(name , userName,  accountType, mail , password, friendList, notif, userColor, req.params.id);
        res.json({log : 'user Update Done'})
    }catch(error){
      res.status(500).json({log: `failed to get item`, error: error.message})
    }
  })

app.delete('/users/:userId',(req,res)=>{ /// This one delete a user. Only user.id as a parameter
  try{        // Non specific route // foreign key with desks and items 
    db.prepare(`
      DELETE FROM
      users
      WHERE
      id = ?
      `).run(req.params.userId);
      res.json({log : 'User deleted'})
  }catch(error){
    res.status(500).json({log: `failed to get item`, error: error.message});
  }
})

app.get('/users/:userId',(req,res)=>{ // This one return the all user object using only it s id as a parameter .
  try{    // not very specific route
    let selectedUser = db.prepare(`
      SELECT * FROM
      users
      WHERE
      id = ?
      `).get(req.params.userId);
      res.json(selectedUser);
      console.log('user successfully targeted')
  }catch(error){
    res.status(500).json({log: `failed to get item`, error: error.message});
  }
  }
);

////////////// DESK SIDE ////////////

app.post(`/desks/`,(req,res)=>{ // Not so specific route // will decide later where it needs to be put.
  try{ //Create a desk with , // Parameters : name, ownerId , id
    const {id, name,ownerId,createdAt} = req.body;
    let newDesk = db.prepare(`
      INSERT INTO desks
      (id, name,ownerId,createdAt)
      VALUES
      (?,?,?,?)
      `).run(id,name,ownerId,createdAt);
      res.json(newDesk);
  }catch(error){
    res.status(500).json({log: `failed to create desk`, error: error.message});
  }
})

app.put(`/desks/:deskId`,(req,res)=>{
  try{
    const {name,ownedId,urlLink,accessPassword,createdAt} = req.body;
    let updatedDate = db.prepare(`
    UPDATE desks
    SET
    name = ? ,
    ownerId = ?,
    urlLink = ?,
    accessPassword = ?,
    createdAt = ?
    WHERE id = ?
    `).run(name,ownedId,urlLink,accessPassword,createdAt,req.params.deskId);
    res.json({log : 'Desk successfully updated'});
  }catch(error){
    res.status(500).json({log: `failed to create desk`, error: error.message});
  }
})

app.delete(`/desks/:deskId`,(req,res)=>{
  try{
    const selectedDesk = db.prepare(`SELECT * 
    FROM deskAccess WHERE deskId = ?`).all(req.params.deskId);
    if(selectedDesk.length === 1 ){
      db.prepare(`DELETE FROM desks WHERE id = ?`).run(req.params.deskId);
      return res.json({log : 'deleted'})
    }
    res.json({log : 'This is a shared desk'})
  }catch(error){
    res.status(500).json({log: `failed to delete desk`, error: error.message});
  }
})

app.get(`/desks/:id`,(req,res)=>{ // this one return the selected desk
  try{ // No foreign implication // not specific route
    let requiredDesk = db.prepare(`
      SELECT * 
      FROM
      desks
      WHERE
      id = ?
      `).get(req.params.id);
      return res.json(requiredDesk);
  }catch{
    res.status(500).json({log: `failed to delete desk`, error: error.message});
  }
})

app.get(`/desks/:userId`,(req,res)=>{ // this one return all desks owned by user
  try{ // no foreign implication // not specific route at all
    let arrayOfDesk = db.prepare(`
      SELECT * FROM
      desks WHERE
      ownerId = ?
      `).all(req.params.userId);
      return res.json(arrayOfDesk);
  }catch(error){
    res.status(500).json({log: `failed to delete desk`, error: error.message});
  }
})


////////////// ACCESS QUERIES SIDE ////////////////

app.delete('/deskAccess/:deskId',(req,res)=>{ // only desk id // not very specific route
  try{ // foreign relation with accessDesk table Deletion on cascade.
    const {userId} = req.body 
    db.prepare(`
      DELETE FROM
      deskAccess
      WHERE 
      deskId = ? AND userId = ? 
      `).run(req.params.deskId,userId);
      res.json({log : 'Desk deleted'})
    }
  catch(error){ //NEED TO REDO THIS ONE YOU DON T WANT TO REMOVE DESK IF IT IS SHARED
    res.status(500).json({log: `failed to delete desk`, error: error.message});
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


