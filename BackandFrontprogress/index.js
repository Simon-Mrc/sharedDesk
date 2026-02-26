// PART WHERE YOU DEFINED ALL THATS GOING TO BE NEEDED //
const express = require('express');
const cors = require('cors');
const db = require('./testSimondb.js'); // File that create the database

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/// DEFINITION OF METHODS FOR DESKS /////        NEED TO BE REDONE
// app.post('/desksTest', (req,res)=>{ // Add a desk to database
//   const {id , name , ownerId , modifyUserId, urlLink, accessPassword, content} = req.body;
//   try{
//     db.prepare(`
//       INSERT INTO desksTest (id , name , ownerId , modifyUserId, urlLink, accessPassword, content)
//       VALUES(?,?,?,?,?,?,?)
//       `).run(id , name , ownerId , modifyUserId, urlLink, accessPassword, content);
//       res.json({log : 'desk has been successfully added'});
//   }catch(error){
//     res.json({log : 'Unsuccessfull as always' , error : error.message})
//   }
// });

// app.get('/desksTest', (req,res)=>{
//   const results = db.prepare(`
//     SELECT * FROM desksTest
//     `).all();
//   res.json(results); 
// })

// app.delete('/desksTest/:id', (req,res)=>{
//   try{
//     db.prepare(`
//       DELETE FROM desksTest WHERE id = ?
//       `).run(req.params.id);
//       res.json({log :'Desk has been deleted'});
//       }catch(error){
//         res.json({log : 'error', error : error.message})
//       }
// })

// app.put('/desksTest/:id', (req,res)=>{
//   const { name , ownerId , modifyUserId, urlLink, accessPassword, content} = req.body;
//   try{
//     db.prepare(`
//       UPDATE desksTest SET name = ?, ownerId = ?,modifyUserId = ?,
//       urlLink = ?, accessPassword = ?, content = ? WHERE id = ?
//       `).run(name , ownerId , modifyUserId, urlLink, accessPassword, content, req.params.id);
//       res.json({log : 'Desk successfully updated'});
//   }catch(error){
//     res.json({log : 'Failure', error : error.message});
//   }
// })

// app.get('/desksTest/:id',(req,res)=>{
//   try{
//     const result = db.prepare(`
//       SELECT * FROM desksTest WHERE id = ?
//       `).get(req.params.id);
//       res.json({log : 'found it' , desk : result});
//   }catch(error){
//     res.json({log : 'Failur', error : error.message})
//   }
// })


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
  }catch{
    res.status(500).json({log: `failed to update item`, error: error.message})
  }
})

app.get(`/items/user/:userId`,(req,res)=>{ //// This one gets you all the items created by user 
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

// app.get(`/users/deskAccess/:deskId`,(req,res)=>{
//   try{
//     let allDeskUser = db.prepare(`
//       SELECT * FROM
//       users
//       WHERE
//       user.id = ?
//       `)
//   }
// })


////////////// DESK SIDE ////////////

app.post(`/desks/:desk`,(req,res)=>{ // Not so specific route // will decide later where it needs to be put.
  try{ //Create a desk with , // Parameters : name, ownerId , id
    const {name,ownerId} = req.body;
    let newDesk = db.prepare(`
      INSERT INTO desks
      (name,ownerId,id)
      VALUES
      (?,?,?)
      `).run(id,name,req.params.desk);
      res.json(newDesk);
  }catch(error){
    res.status(500).json({log: `failed to create desk`, error: error.message});
  }
})

app.put(`/desks/:deskId`,(req,res)=>{
  try{
    const {name,ownedId,urlLink,accessPassword,createdAt} = req.body;
    let updatedDate = db.prepare(`
    UPDATE desks,
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


