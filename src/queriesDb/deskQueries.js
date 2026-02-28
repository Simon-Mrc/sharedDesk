export async function createDesk(desk){ // Return nothing // Create a desk with 
    try{        // Parameters : name, ownerId , id
        let newDesk = await fetch(`http://localhost:3000/desks/deskAccess`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(desk)
        });
        const res = await newDesk.json();
        console.log('Desk created');
        console.log(res);
        return res;
    }catch(error){
        console.log('Choose a different name u dummy');
    }
 }

 export async function updateDesk(desk){ //Return nothing, need all desk object.
    try{ // no foreign implication // global route need to be placed pretty far in script in index
        let upDateDesk = await fetch(`http://localhost:3000/desks/${desk.id}`,{
            method : 'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(desk)
        })
        const res = await upDateDesk.json();
        console.log('desk Updated');
        console.log(res);
        return res;
    }catch(error){
        console.log('something went terribly wrong computer s gonna explode in 5,4,3,2')
    }
 }
 

 export async function deleteDesk(deskId){ // need to delete all desk from user if it s not shared.
    try{
        let deletedDesk = await fetch(`http://localhost:3000/desks/${deskId}`,{
            method : 'DELETE',
        })
        console.log('successfull delete');
    }catch(error){
        console.log('something went wrong');
    }
 }

 export async function selecteDesk(id){ // return a desk with its id as a parameter
    try{
        let selectedDesk = await fetch(`http://localhost:3000/desks/${id}`,{
            method : 'GET'
        })
        const res = await selectedDesk.json();
        console.log('Desk found !');
        console.log(res);
        return res;
    }catch(error){
        console.log('something went awefully wrong ..look behind you !!')
    }
 }

 export async function getAllDesksUser(userId){ // return array of all desks owned by user
    try{ // no foreign implication // only userid as parameter
        let arrayOfDesk = await fetch(`http://localhost:3000/desks/user/${userId}`,{
            method : 'GET'
        })
        const res = await arrayOfDesk.json();
        console.log('Desks found !');
        console.log(res);
        return res;
    }catch(error){
        console.log('something went awefully wrong ..look behind you !!')
    }
 }