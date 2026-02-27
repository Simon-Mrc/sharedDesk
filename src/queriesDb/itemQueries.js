



/////////// ITEM FUNCTIONS /////////////

export async function createItem(item){ ////// Create in database /// No foreign implication
    try{                    // all item object as a parameter
        let createItem = await fetch(`http://localhost:3000/items`,{
        method :'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify(item),
    })
    console.log("item created");
    return await createItem.json();
    }catch{
        console.log("Fail item creation");
    }
}

export async function deleteItem(itemId){ ////// Delete in database //// Children got delete too
    try{                                //// Only item.id as a parameter
        let deleteItem = await fetch(`http://localhost:3000/items/${itemId}`,{
            method : 'DELETE',
        })
    console.log("Item deleted");
    }catch{
        console.log("Failed to delete item");
    }
}

export async function updateItem(item){ // update selected item // Use item object as a parameter
    try{                            // No foreign implication
        let modItem = await fetch(`http://localhost:3000/items/${item.id}`,{
            method : 'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(item)
        })
        console.log('Item was correctly modified')
    }catch(error){
        console.log('failed item modifications')
    }
}

export async function getAllItems(userId){ //// This one gets you all the items created by user 
    try{                                // If i m correct it now only needs user.id as a parameter
        let allItems = await fetch(`http://localhost:3000/items/users/${userId}`,{      // No foreign implication
            method : 'GET',
        })
        return await allItems.json();
    }catch(error){
        console.log('failed item modifications')
    }
}

export async function getSpecificItem(id){   //// Return an item with a given id
    try{                       /// Very non specific route probably needs to be put last 
        let item = await fetch(`http://localhost:3000/items/${id}`,{        // No foreign implication
            method : 'GET'      
        })
        return await item.json();
    }catch(error){
        console.log('Fail to load item')
    }
}

