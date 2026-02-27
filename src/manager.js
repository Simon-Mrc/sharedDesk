import { acceptOrDenied,textNeeded } from './namePrompt.js';
import { array } from './creationbundle.js';
import { recreateDesk } from './recreateDesk.js';
import { displayTree } from './tree.js';
import { createUser, selectUser, updateUser } from './queriesDb/userQueries.js';
import { getAllDesksUser, selecteDesk } from './queriesDb/deskQueries.js';
import { state } from './main.js';

export function clearStateInStorage(){
    let wipe = document.getElementById('globalHome');
    wipe.innerHTML=``;
    array.length = 0; // by doin so i empty the array without breaking reference and contain it to this scope
    localStorage.setItem(`screens`,JSON.stringify([{id : 0}]));
}
export function clearStateInHtml(){
    let allThatClear = document.querySelectorAll(`.needEmpty`);
    allThatClear.forEach(element => {
        element.remove();
    });
}
export async function switchDesk(deskGiven){
    clearStateInHtml();
    clearStateInStorage() ;    // BYE BYE
    await recreateDesk(deskGiven);  // HELLO
    await displayTree();
    state.currentDesk = deskGiven;
    return state.currentDesk;
}

// This one create user, store in LS Set currentUser and load userState starting point
export async function createUserDb(section){
    try{
        let name = await textNeeded( "Choose a name","Don t be generic tho",section);
        let userName = await textNeeded( "Choose a Nickname","Nothing offensiv Boy",section);
        let mail= await textNeeded("Enter your mail","and get rickrolled",section);
        let password= await textNeeded("Enter password","no 1234 plz",section);
        let newUser = await createUser({
            name: name,
            userName: userName,
            id: crypto.randomUUID(), 
            mail: mail,
            password: password,
            accountType: 'user',
            friendList: '[]',
            notif: '[]',
            userColor: '#FF5733'
        });
        state.currentUser = newUser;
        await updateUser(state.currentUser);
        await loadState(state.currentUser);
    }catch(error){
        console.log(error);
    }
}

// Carefull there you need full user object for function // not just id
export async function loadState(user){ // Here user.desks is actually ids ! not the full desk
    console.log("Starting loading state");
    clearStateInStorage(); // thought it would be better for storage managment.
    clearStateInHtml();
    let allUserDesks = await getAllDesksUser(user.id);
    console.log(user);
    if(allUserDesks == undefined){
        console.log("User has no current desk");
        return;
    }
    else{
        for(let desk of allUserDesks) { // This assign all buttons to desks of certain user
            console.log("testloop"); // can t await in for each that why we change it to for !
            let deskbtn = document.createElement('button')
            let fullDesk = {};
            Object.assign(fullDesk,await selecteDesk(desk.id))
            deskbtn.addEventListener("click",()=>{
                switchDesk(fullDesk);
            })
            deskbtn.innerText = fullDesk.name;
            deskbtn.classList.add("needEmpty");
            document.getElementById("myDesks").appendChild(deskbtn);
        };
    }
}

export function savingDesk(){
    if(document.getElementById(state.currentDesk.id)){
        let fullDesk = {};
        let cleanBtn = document.getElementById(state.currentDesk.id).cloneNode(true); // THIS ONE SO USEFULL copies domelement + nod
        document.getElementById(state.currentDesk.id).replaceWith(cleanBtn);          // Replace with usefull to know to !
        Object.assign(fullDesk,state.currentDesk);
        cleanBtn.addEventListener("click",()=>{
            switchDesk(fullDesk);
        })
    }
    else{
        let deskbtn = document.createElement('button')
        let fullDesk = {};
        Object.assign(fullDesk,state.currentDesk);
        deskbtn.addEventListener("click",()=>{
            switchDesk(fullDesk);
        })
        deskbtn.textContent = state.currentDesk.name;
        deskbtn.id = state.currentDesk.id;
        deskbtn.classList.add("needEmpty")
        document.getElementById(`myDesks`).appendChild(deskbtn);
    }
}

// Again we need full targetUser object for this function
export async function changeUser(targetUser){
    await loadState(targetUser);
    state.currentUser = targetUser;
}

export async function addFriend(targetFriendId){ // add friend is actually accepting ones invite !
    state.currentUser.friendList.push(targetFriendId);
    state.currentUser.notif.splice(0,1);
    let targetFriend = await selectUser(targetFriendId);
    targetFriend.friendList.push(state.currentUser.id);
    await updateUser(state.currentUser);
    await updateUser(targetFriend);
}

export async function sendFriendRequest(targetFriend){
    let target = await selectUser(targetFriend.id);
    target.notif.push(state.currentUser.id);
    await updateUser(target);
    await updateUser(targetFriend);
}

export async function showNotif(){
    let globalHome = document.getElementById('globalHome');
        if(state.currentUser.notif[0] != undefined){
        await acceptOrDenied("will you take me as a friend ?", globalHome,
            () => addFriend(state.currentUser.notif[0]), // in case of resolve()
            () => deleteNotif())// in cas of denied()
    }    
}

export async function deleteNotif(){
    state.currentUser.notif.splice(0,1);
    await updateUser(state.currentUser);
}
 ///////////////// NEED TO BE REDO !!! ///////////////
// export function changeItemsColor(currentUser){ // this one is hard because you have to find every element created by currentuser
//                     // then access the DOM element if it exist
//     let allDesk = getAllDesks();// then change color
//     let currentDesk = getCurrentDesk();
//     allDesk.forEach(desk => {
//         let allItems = getAllItemCurrentDesk(desk);
//         if(desk.accessUserId.includes(currentUser.id)){

//             console.log("test1");
//             allItems.forEach(item => {
//                 console.log("updateAll called") 
//                 if(currentUser.id == item.createdBy){
//                     if(document.getElementById(item.id)){
//                         let targetContainer = document.getElementById(item.id);
//                         targetContainer.style.boxShadow = `0 8px 20px ${currentUser.userColor}`
//                         item.creatorColor = currentUser.userColor;
//                     }
//                 }            
//             }); 
//             localStorage.setItem('currentDesk',JSON.stringify(desk));
//             console.log("testhere");
//             updateAllItemsInCurrentAndAllDesk(allItems);    
//             console.log("and there");
//         }
//     });
//     localStorage.setItem('currentDesk',JSON.stringify(currentDesk));
// }
