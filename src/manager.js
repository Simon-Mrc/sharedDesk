import { acceptOrDenied, passingInfo, textNeeded } from './namePrompt.js';
import { getAllDesks, getAllUsers, createUser, updateCurrentDesk, getCurrentUser, updateCurrentUser, updateCurrentUserInUsers, updateAllUsers, getCurrentDesk, getAllItemCurrentDesk, updateAllItemsInCurrentAndAllDesk } from './helperFunctions.js';
import { array } from './creationbundle.js';
import { recreateDesk } from './recreateDesk.js';
import { displayTree } from './tree.js';

export function clearStateInStorage(){
    let wipe = document.getElementById('globalHome');
    wipe.innerHTML=``;
    array.length = 0; // by doin so i empty the array without breaking reference and contain it to this scope
    localStorage.setItem(`screens`,JSON.stringify([{id : 0}]));
}
export function clearStateInHtml(){
    let allThatClear = document.querySelectorAll(`.needEmpty`);
    allThatClear.forEach(element => {
        element.innerHTML=``;
    });
}
export function switchDesk(deskGiven){
    clearStateInHtml();
    clearStateInStorage() ;    // BYE BYE
    localStorage.setItem(`currentDesk`, JSON.stringify(deskGiven));  
    recreateDesk(deskGiven);  // HELLO
    displayTree();
}

// This one create user, store in LS Set currentUser and load userState starting point
export async function createUserAndUpdate(section){
    try{
        let name = await textNeeded( "Choose a name","Don t be generic tho",section);
        let userName = await textNeeded( "Choose a Nickname","Nothing offensiv Boy",section);
        let mail= await textNeeded("Enter your mail","and get rickrolled",section);
        let password= await textNeeded("Enter password","no 1234 plz",section);
        let newUser = createUser(name,userName,mail,password);
        let users = JSON.parse(localStorage.getItem('users'));
        users.push(newUser);
        localStorage.setItem('users',JSON.stringify(users));
        localStorage.setItem('currentUser',JSON.stringify(newUser));
        loadState(newUser);
    }catch(error){
        console.log(error);
    }
}
export function findDeskById(deskId){
    let allDesks = getAllDesks();
    let searchedDesk = {};
    allDesks.forEach(desk => {
        if(desk.id == deskId){
            Object.assign(searchedDesk,desk);
        }        
    });
    return searchedDesk
}

// Carefull there you need full user object for function // not just id
export function loadState(user){ // Here user.desks is actually ids ! not the full desk
    console.log("test3");
    clearStateInStorage(); // thought it would be better for storage managment.
    clearStateInHtml();
    let allUserDesks = user.desksId;
    console.log(user);
    if(allUserDesks == undefined){
        console.log("test desks");
        return;
    }
    else{
        allUserDesks.forEach(deskid => { // did the change at beginning for more lisibility
            console.log("testloop");
            let deskbtn = document.createElement('button')
            let fullDesk = {};
            Object.assign(fullDesk,findDeskById(deskid))
            deskbtn.addEventListener("click",()=>{
                switchDesk(fullDesk);
            })
            deskbtn.innerText = fullDesk.name;
            document.getElementById("myDesks").classList.add("needEmpty");
            document.getElementById("myDesks").appendChild(deskbtn);
        });
    }

}

export async function logging(section){
    try{
        let users = getAllUsers();
        let userName = await textNeeded( "Whats your name already ?","I don t recall you",section);
        let check = 0;
        let currentUser = {};
        users.forEach(user => {
            if(user.name == userName){
                check = 1;
                Object.assign(currentUser,user);
            }
        });
        if(check ==1){
            let pswrd = await textNeeded( "What the password","don t remember ? what a shame",section);
            if(pswrd == currentUser.password){
                passingInfo("Welcome Back", section);
                localStorage.setItem('currentUser',JSON.stringify(currentUser));
                console.log("test1");
                loadState(currentUser);
                console.log("test2");
            }
        }
    }catch(error){console.log(error)} 
}

export function savingDesk(currentDesk){
    if(document.getElementById(currentDesk.id)){
        let fullDesk = {};
        let cleanBtn = document.getElementById(currentDesk.id).cloneNode(true); // ✅ copies element, no listeners!
        document.getElementById(currentDesk.id).replaceWith(cleanBtn);          // ✅ swaps it in DOM!
        Object.assign(fullDesk,currentDesk);
        cleanBtn.addEventListener("click",()=>{
            switchDesk(fullDesk);
        })
    }
    else{
        let deskbtn = document.createElement('button')
        let fullDesk = {};
        Object.assign(fullDesk,currentDesk);
        deskbtn.addEventListener("click",()=>{
            switchDesk(fullDesk);
        })
        deskbtn.textContent = currentDesk.name;
        deskbtn.id = currentDesk.id;
        document.getElementById(`myDesks`).classList.add("needEmpty")
        document.getElementById(`myDesks`).appendChild(deskbtn);
    }
}

// Again we need full targetUser object for this function
export function changeUser(targetUser){
    localStorage.setItem('currentUser', JSON.stringify(targetUser));
    loadState(targetUser);
}

export function addFriend(targetFriendId){
    let currentUser = getCurrentUser()
    currentUser.friendList.push(targetFriendId);
    currentUser.notif.splice(0,1);
    updateCurrentUser(currentUser);
    updateCurrentUserInUsers(currentUser);
    let allUsers = getAllUsers();
    allUsers.forEach(user => {
        if(user.id == targetFriendId){
            user.friendList.push(currentUser.id)
        }
    });
    updateAllUsers(allUsers);
}

export function sendFriendRequest(targetFriend){
    let currentUser = getCurrentUser();
    let allUsers = getAllUsers();
    for(let i = 0 ; i < allUsers.length ; i = i + 1){
        if (allUsers[i].id == targetFriend.id){
            allUsers[i].notif.push(currentUser.id);
        }
    }
    updateAllUsers(allUsers);
}

export async function showNotif(){
    let globalHome = document.getElementById('globalHome');
    let currentUser = getCurrentUser();
    if(currentUser.notif[0] != undefined){
        await acceptOrDenied("will you take me as a friend ?", globalHome,
            () => addFriend(currentUser.notif[0]),
            () => deleteNotif())
    }    
}

export function deleteNotif(){
    let currentUser = getCurrentUser();
    currentUser.notif.splice(0,1);
    updateCurrentUser(currentUser);
    updateCurrentUserInUsers(currentUser);
}

export function changeItemsColor(){
    let currentUser = getCurrentUser();
    let allDesk = getAllDesks();
    let currentDesk = getCurrentDesk();
    allDesk.forEach(desk => {
        let allItems = getAllItemCurrentDesk(desk);
        if(desk.accessUserId.includes(currentUser.id)){

            console.log("test1");
            allItems.forEach(item => {
                console.log("updateAll called") 
                if(currentUser.id == item.createdBy){
                    if(document.getElementById(item.id)){
                        let targetContainer = document.getElementById(item.id);
                        targetContainer.style.boxShadow = `0 8px 20px ${currentUser.userColor}`
                        item.creatorColor = currentUser.userColor;
                    }
                }            
            }); 
            localStorage.setItem('currentDesk',JSON.stringify(desk));
            console.log("testhere");
            updateAllItemsInCurrentAndAllDesk(allItems);    
            console.log("and there");
        }
    });
    localStorage.setItem('currentDesk',JSON.stringify(currentDesk));
}
