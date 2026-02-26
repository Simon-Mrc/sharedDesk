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