///////Note : json() can only be consumed once. convinient to make const res = ....
///// then console log the res to see what is return for every call !


////////////// USERS FUNCTIONS ////////////////:
export async function logging(userName,password){ // two string expected as argument !
    try{
        let user = await fetch(`http://localhost:3000/logging/${userName}`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({password})
        })
        const res = await user.json();
        console.log(res);
        return res; // This return an user object !
    }catch(error){
        console.log('wrong username or password')
    }
} 

export async function createUser(user){ /// Create new user. All user object as a parameter
    try{            // No foreign implication
        let newUser = await fetch(`http://localhost:3000/users`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(user)
        })
        const res = await newUser.json();
        console.log('user created');
        console.log(res);
        return res; // This return an user object !
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
        const res = await updatedUser.json();
        console.log('user fully uptodate');
        console.log(res);
        return res;
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
        const res = await selectedUser.json();
        console.log(res);
        return res;
    }catch(error){
        console.log('something went wrong')
    }
 }
