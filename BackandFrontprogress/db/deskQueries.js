export async function createDesk(desk){ // Return nothing // Create a desk with 
    try{        // Parameters : name, ownerId , id
        let newDesk = await fetch(`http://localhost:3000/desks/${desk.id}`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(desk)
        });
        console.log('Desk created');
    }catch(error){
        console.log('Choose a different name u dummy');
    }
 }

 export async function updateDesk(desk){
    try{
        let upDateDesk = await fetch(`http://localhost:3000/desks/${desk.id}`,{
            method : 'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(desk)
        })
        console.log('desk Updated');
    }catch(error){
        console.log('something went terribly wrong computer s gonna explode in 5,4,3,2')
    }
 }