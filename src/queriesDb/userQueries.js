
////////////// USERS FUNCTIONS ////////////////:
 export async function createUser(user){ /// Create new user. All user object as a parameter
    try{            // No foreign implication
        let newUser = await fetch(`http://localhost:3000/users`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(user)
        })
        console.log('user created')
    }catch(error){
        console.log('user not created')
    }
 }

 export async function updateUser(user){    // Update user. All user object as a parameter
    try{                    //// No foreign implication
        let updatedUser = await fetch(`http://localhost:3000/users/${user.id}`,{
            method : 'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(user),
        }) 
        console.log('user fully uptodate')
    }catch(error){
        console.log('somethin ovisously went wrong')
    }
 }

 export async function deleteUser(userId){  /// This one delete a user. Only user.id as a parameter
    try{                    // Non specific route // foreign key with desks and items
        let deletedUser = await fetch(`http://localhost:3000/users/${userId}`,{
            method : 'DELETE'
        })
        console.log('User Deleted');
    }catch(error){
        console.log('Something went wrong');
    }
 }

 export async function selectUser(userId){ // Return a user object take only userId as a parameter
    try{               // no foreign key of course
        let selectedUser = await fetch(`http://localhost:3000/users/${userId}`,{
            method : 'GET'
        })
        console.log(selectedUser +'has been detected')
        return await selectedUser.json();
    }catch(error){
        console.log('something went wrong')
    }
 }

//  export async function selectAllUser(deskId){ // return an array of users no parameters    
//     try{            // It returns an object of all users sharing the desk identified by deskId
//         let allUser = await fetch(`http://localhost:3000/users/deskAccess/${deskId}`,{
//             method : 'GET'
//         })
//         console.log('Success !');
//         return await allUser.json();
//     }catch(error){
//         console.log('something went wrong');
//     }
//  }

