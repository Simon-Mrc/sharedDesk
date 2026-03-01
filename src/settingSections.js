import { createBtn, createBtnWithFunction, createInput } from './DOMmanipJS/button.js';
import { createContainer, quickMessage, yesOrNoPrompt } from './namePrompt.js';
import { findUserByUserName, updateUser, findUserByNameUserNameId } from './queriesDb/userQueries.js';
import { state } from './constJS/exportConst.js';
import { createColorPicker } from './DOMmanipJS/createContainerNStuff.js';
import { getAllItems, updateItem } from './queriesDb/itemQueries.js';
import { recreateDesk } from './desksJS/recreateDesk.js';
import { clearStateInStorage } from './manager.js';
import { sendFriendRequest, showNotif } from './socialJS/socialLife.js';
import { globalHome } from './constJS/exportConst.js';

/////////////////////CHANGE NAME CHECK FUNCTION ////////////////////
export function changeName(newName){ 
    return new Promise(async(resolve, reject) => { //promise for manual exit
        let existingUser = await findUserByUserName(newName);
        if (existingUser!=null){
            reject();
        }
        else{
            resolve(newName);
        }
    })
}

///////////////////DISPLAY NOTIF FUNCTION//////////////////
function displayNotif(){
    return new Promise(async(resolve) => { // u set a new promise here because you want a manual exit !    
        let allNotif = JSON.parse(state.currentUser.notif);
        if(allNotif.length === 0){
            await quickMessage("You have no friend request u lonely bastard");
            resolve();
            return;
        }
        else{
            let {container , cleanUp} = createContainer(globalHome);
            for(let i = 0 ; i<allNotif.length; i = i +1){
                let notifBtn = createBtn(container,`Invite from ${allNotif[i]}`);
                notifBtn.addEventListener('click',async()=>{
                    await showNotif(i);
                })
            }
            let closeBtn = createBtn(container,"Close");
            closeBtn.addEventListener('click',()=>{
                cleanUp();
                resolve();
            })
        }
    })
}

///////////////////////SEARCHFRIEND FUNCTION//////////////////
function displayFriendSearch(inputValue){
    return new Promise(async(resolve) => {
        try{
            let allFriendFound = await findUserByNameUserNameId(inputValue);
            if(allFriendFound === null){ // set null on fail request from dbquerie !
                quickMessage("No user match you Search ! ... you lonely fck");
                resolve();
                return;
            }
            else{
                let {container, cleanUp} = createContainer(globalHome);
                if(!allFriendFound.length){allFriendFound=[allFriendFound]};
                for(let i = 0 ; i<allFriendFound.length; i = i + 1){
                    console.log('testloop');
                    let friendIbtn = createBtnWithFunction(container,allFriendFound[i].userName,async()=>{
                        await yesOrNoPrompt(container,'SendFriendRequest','Cancel',
                            ()=> sendFriendRequest(allFriendFound[i]),
                            ()=> null
                        )
                    })
                }
                let closeBtn = createBtn(container,"Close");
                closeBtn.addEventListener('click',()=>{
                    cleanUp();
                    resolve();
                })
            }
        }catch(error){
            quickMessage("No user match you Search ! ... you lonely fck");
            resolve();
        }
    })
}
/////////////////////////////////////////////////////////
///////////////GLOBAL MANAGMENT DISPLAY////////////////
/////////////////////////////////////////////////////////
export async function showUserSetting(section){
    
    ////////////////CREATE CONTAINER ///////////////////
    let {container,cleanUp} = createContainer(section);
    
    //////////////////NAME SECTION /////////////////////////
    let nameBtn = createBtn(container,"Change name");
    let inputName = createInput(container,'Nothing offensive plz')
    nameBtn.addEventListener('click',async ()=>{
        try{ 
            let newName = await changeName(inputName.value);       
            state.currentUser.userName = newName;
            updateUser(state.currentUser); 
            return(state.currentUser);
        }catch{
            inputName.classList.add('container-input-error');
            inputName.style.color = "red";
            setTimeout(() => {
                inputName.style.color = "";
                inputName.value = "";
                inputName.placeholder = "UserName already taken";
                inputName.classList.remove('container-input-error');
            },1500);
        }       
    })


    //////////////////CHANGE COLOR SECTION /////////////////////////
    let colorBtn = createBtn(container,"Choose a new color");
    let colorContainer = createColorPicker(container,state.currentUser.color);
    colorContainer.addEventListener('input', () => {
        console.log("Live color:", colorContainer.value);
    });
    colorBtn.addEventListener('click',async ()=>{
        let selectedColor = colorContainer.value;
        state.currentUser.userColor = selectedColor;
        await updateUser(state.currentUser); // always await queries
        let allItemCurrentUser = await getAllItems(state.currentUser.id);
        for (let item of allItemCurrentUser){ // await in loop need for
            item.creatorColor = state.currentUser.userColor;
            await updateItem(item);
        }
        cleanUp();
        clearStateInStorage();// really need to clean those up
        document.body.style.pointerEvents = 'none';
        await recreateDesk(state.currentDesk);
        setTimeout(() => { // time for user to actually see changes
            showUserSetting(section);
            document.body.style.pointerEvents = ''; // don t want stupid user start clicking everywhere while so
        },1200);
    });


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"subscribe to premium");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change mail");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change change password");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change color");


    //////////////////CLOSE BTN /////////////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}

export async function showDeskMenu(desk){
    ////////////////CREATE CONTAINER ///////////////////
    let {container,cleanUp} = createContainer(globalHome);

    ////////////////RENAME DESK ////////////////////

    /////////////////QUIT/DELETE DESK ////////////////

    /////////////////GIVE OWNERSHIP////////////////

    ////////////INVITE FRIEND/////////////////////

    //////////////SEARCH IN DESK ////////////////

}

export async function showFriendMenu(section){
    ///////////////CONTAINER CREATION ///////////////////
    let {container , cleanUp} = createContainer(section);
    
    ////////////////SHOW NOTIF ////////////////
    let notifBtn = createBtnWithFunction(container,"Notifications",async ()=>{
        cleanUp();
        await displayNotif();
        showFriendMenu(section);
    });

    ///////////////SEARCH FRIEND /////////////////
    let input = createInput(container,"Search Friend")
    let searchFriendBtn = createBtnWithFunction(container,"Find Your Friends !",async ()=>{
        cleanUp();
        await displayFriendSearch(input.value);
        showFriendMenu(section);
    })

    // friend container with displayed result and from there
    // send friend request

    ///////////////CURRENT FRIEND //////////////
    // display all friend of user with little btn for setting
    // from there : Delete friend / Invite to desk / Send message

    ///////////// MAILBOX ////////////////
    // recieved password for file mostly !!
    // need to think about db usage for this
    // new table with 3 columns ? senderId,recieverId,content?

    ///////////////CANCEL BUTTON ////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}