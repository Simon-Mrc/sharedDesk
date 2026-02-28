import { acceptOrDenied,textNeeded } from './namePrompt.js';
import { array } from './creationbundle.js';
import { recreateDesk } from './recreateDesk.js';
import { displayTree } from './tree.js';
import { createUser, selectUser, updateUser } from './queriesDb/userQueries.js';
import { getAllDesksUser, selecteDesk } from './queriesDb/deskQueries.js';
import { state } from './main.js';

export function clearStateInStorage(){
    let wipe = document.getElementById('globalHome');
    wipe.innerHTML=``; // clearing all displayed sections
    array.length = 0; // by doin so i empty the array without breaking reference and contain it to this scope
}
export function clearStateInHtml(){
    let allThatClear = document.querySelectorAll(`.needEmpty`); // Node object of DOM elements
    allThatClear.forEach(element => {
        element.remove();// clearing all created DOM elements that needs it
    });
}
export async function switchDesk(deskGiven){
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
        let newUser = await createUser({ // this function needs all obect not just values!
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
        state.currentUser = newUser;     // updates current state
        await updateUser(state.currentUser);      //save in DB
        await loadState(state.currentUser);     //Load new environnement
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
            let deskbtn = document.createElement('button');
            let deskbtnSettings = document.createElement('button');
            let fullDesk = await selecteDesk(desk.id);
            console.log(fullDesk);
            deskbtn.addEventListener("click",()=>{
                switchDesk(fullDesk);
            })
            deskbtnSettings.addEventListener('click',()=>{
                ///////// Desk Setting here ///////////
            })
            deskbtn.innerText = fullDesk.name;
            deskbtnSettings.innerText = "⚙️";
            deskbtnSettings.classList.add('needEmpty');
            deskbtn.classList.add("needEmpty"); // for reset when switching users
            document.getElementById("myDesks").appendChild(deskbtn);
            document.getElementById("myDesks").appendChild(deskbtnSettings);
        };
    }
}

export function savingDesk(){
    if(document.getElementById(state.currentDesk.id)){ //If it is already a saved desk
        let fullDesk = {};// create a different pointer to be putted in eventlistener btn
        let cleanBtn = document.getElementById(state.currentDesk.id).cloneNode(true); // THIS ONE SO USEFULL copies domelement + nod
        document.getElementById(state.currentDesk.id).replaceWith(cleanBtn);          // Replace with usefull to know to !
        Object.assign(fullDesk,state.currentDesk); // exact copy of current desk
        cleanBtn.addEventListener("click",()=>{
            switchDesk(fullDesk);
        });
        // deskbtnSettings.addEventListener('click',()=>{
        //     ///////// Desk Setting here ///////////
        // }); /// need to think more about if needed to update with new content 
    }
    else{
        let deskbtn = document.createElement('button');
        let deskbtnSettings = document.createElement('button');
        let fullDesk = {}; //same as before different pointer .....
        Object.assign(fullDesk,state.currentDesk);
        deskbtn.addEventListener("click",()=>{
            switchDesk(fullDesk); // ..... but same values
        });
        deskbtnSettings.addEventListener('click',()=>{
            ///////// Desk Setting here ///////////
        });
        deskbtn.textContent = state.currentDesk.name;
        deskbtn.id = state.currentDesk.id; // to check later if already existing desk ! (ealier in code tho)
        deskbtnSettings.innerText = "⚙️";
        deskbtnSettings.classList.add('needEmpty');
        deskbtn.classList.add("needEmpty") // to be clean out when resetting
        document.getElementById(`myDesks`).appendChild(deskbtn);
        document.getElementById("myDesks").appendChild(deskbtnSettings);
    }
}

// Again we need full targetUser object for this function
export async function changeUser(targetUser){ // Not sure if this function will find use
    await loadState(targetUser); // think about sharing account ?
    state.currentUser = targetUser;
}

export async function acceptFriend(targetFriendId){ // accepting ones invite stored in user.notif in usersDB !
    let friendList = JSON.parse(state.currentUser.friendList); // In order to make the string an array
    friendList.push(targetFriendId);
    state.currentUser.friendList = JSON.stringify(friendList); // reconvert into string
    let notif = JSON.parse(state.currentUser.notif); 
    notif.splice(0,1);
    state.currentUser.notif = JSON.stringify(notif);
    let targetFriend = await selectUser(targetFriendId); // Only friends Id is needed
    let targetFriendFriendList = JSON.parse(targetFriend.friendList);
    targetFriendFriendList.push(state.currentUser.id);
    targetFriend.friendList = JSON.stringify(targetFriendFriendList);
    await updateUser(state.currentUser);
    await updateUser(targetFriend); // don t forget to update both users
}

export async function sendFriendRequest(targetFriend){ // push own id in friends notif
    let notif = JSON.parse(targetFriend.notif);
    notif.push(state.currentUser.id);
    targetFriend.notif = JSON.stringify(notif);
    await updateUser(targetFriend);
}

export async function showNotif(){
    let globalHome = document.getElementById('globalHome');
        if(state.currentUser.notif[0] != undefined){
        await acceptOrDenied("will you take me as a friend ?", globalHome,
            () => acceptFriend(state.currentUser.notif[0]), // in case of resolve()
            () => deleteNotif())// in cas of denied() // need to think about no possibility to ask again ? prevents spam ?
    }    
}

export async function deleteNotif(){ // just cut askerId from currentuser.notif
    state.currentUser.notif.splice(0,1);
    await updateUser(state.currentUser); // update in db
}
 