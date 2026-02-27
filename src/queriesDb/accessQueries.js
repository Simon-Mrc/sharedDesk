export async function removeUserFromDesk(deskId,userId){ // delete user from desk
    try{ // no foreign keys involved. maybe think later about a trigger or something for automatic deletion

        let deletedDesk = await fetch(`http://localhost:3000/deskAccess/${deskId}`,{
            method : 'DELETE',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({userId})
        });
        console.log('Desk deleted');
    }catch(error){
        console.log('Error during desk delete');
    }
 }

export async function getAllUserFromDesk(deskId){ // Get all user from this shareddesk
    try{
        let arrayOfDesk = await fetch(`http://localhost:3000/deskAccess/${deskId}`,{
            method : 'GET'
        })
        console.log('found your users');
        return await arrayOfDesk.json();
    }catch(error){
        console.log('Probably an empty desk not bein taken care of');
    }
}

export async function addUserToDesk(userId,deskId){ // Add a user to specific desk
    try{ // no foreign implicaton // userId deskId as parameters
        let userAdded = await fetch(`http://localhost:3000/deskAccess/${userId}`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({deskId})
        })
        console.log('user added');
        return await userAdded.json();
    }catch(error){
        console.log('User probably doesnt exist')
    }
}

export async function modifyAutorisation(deskId,userId,accessType){ // modify users right on desk
    try{ // quite specific route maybe place on top ? // no foreign implications
        let modifyin = await fetch(`http://localhost:3000/deskAccess/type/${userId}`,{
            method : 'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({deskId , accessType})
        })
        console.log('Modified users right done');
    }catch(error){
        console.log('user probably doesn t exist')
    }
}

export async function getAllItemFromDesk(deskId){ // Get all items from a given desk
    try{
        let allItems = await fetch(`http://localhost:3000/deskAccess/items/${deskId}`,{
            method : 'GET',
        })
        console.log('all items !');
        return await allItems.json();
    }catch(error){
        console.log('user probably doesn t exist')
    }
}

export async function checkAccess(userId,deskId){ // return the access type (modify, read ,admin)
    try{ // given an userId and a deskId
        let access = await fetch(`http://localhost:3000/deskAccess/accessType`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({userId,deskId})
        })
        return await access.json();
    }catch(error){

    }
}