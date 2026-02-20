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
    let desks=getAllDesk();
    for(let i = 0 ; i < desks.length ; i = i + 1){
        if (desks[i].id == currentDesk.id){
            desks[i] = currentDesk;
        }
    }
    updateDesks(desks);
}