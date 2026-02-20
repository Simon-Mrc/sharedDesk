export function createDesk(currentUserid, chosenName, idNumber){
    console.log('Creating desk:', chosenName, 'for user:', currentUserid);
    return {
        id: idNumber,
        name: chosenName,
        ownerId: currentUserid,
        accessUserId: [currentUserid],                      // No one can view
        modifyUserId: [currentUserid],            // Only Bob can edit
        urlLink: null,
        accessPassword: null,
        content: []  // EMPTY
    }
};
export function createFile(currentUser, chosenName, currentDesk,x,y){
    return {
        id: "icon-002",
        deskId: currentDesk.id,
        name: chosenName,
        type: "file",
        x: x,
        y: y,
        accessUserId: [currentUser.id],                      
        modifyUserId: [currentUser.id],          
        urlLink: null,
        accessPassword: null,
        createdBy: currentUser.id,
        creatorColor: "#FF5733",
        fileData: null,
    }
};
export function createFolder(currentUser, chosenName, currentDesk,x,y){
    console.log('Creating folder:', chosenName, 'for user:', currentUser.id);
    return {
            id: "icon-001",
            deskId: currentDesk.id,
            name: chosenName,
            type: "folder",
            x: x,
            y: y,
            accessUserId: [currentUser.id],                      
            modifyUserId: [currentUser.id],            
            urlLink: null,
            accessPassword: null,
            createdBy: currentUser.id,
            creatorColor: "#FF5733",
            children: []  // Empty folder for now
    }
};
export function getCurrentUser(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
};
export function getCurrentDesk(){
    let currentDesk = JSON.parse(localStorage.getItem("currentDesk"));
    return currentDesk;
}
export function getAllDesks(){
    let allDesk = JSON.parse(localStorage.getItem("desks"));
    return allDesk || [];
}
export function updateDesks(item){
    localStorage.setItem("desks",JSON.stringify(item));
}
export function updateUsers(item){
    localStorage.setItem("users",JSON.stringify(item));
}
export function addContentAndUpdate(item){
    let currentDesk = getCurrentDesk()
    currentDesk.content.push(item);
    let desks=getAllDesks();
    for(let i = 0 ; i < desks.length ; i = i + 1){
        if (desks[i].id == currentDesk.id){
            desks[i] = currentDesk;
        }
    }
    updateDesks(desks);
}

// export function currentUserId(){
//     let userId = getCurrentUser().id;
// }

// export function openOption()