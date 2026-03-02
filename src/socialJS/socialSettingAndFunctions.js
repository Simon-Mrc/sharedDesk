import { createBtn, createBtnWithFunction, createInput } from '../DOMmanipJS/button.js';
import { createContainer, quickMessage, yesOrNoPrompt } from '../namePrompt.js';
import { findUserByNameUserNameId, selectUser } from '../queriesDb/userQueries.js';
import { state } from '../constJS/exportConst.js';
import { sendFriendRequest, showNotif } from '../socialJS/socialLife.js';
import { globalHome } from '../constJS/exportConst.js';


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////FUNCTIONS SECTION ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


///////////////////DISPLAY NOTIF FUNCTION//////////////////
export function displayNotif(){
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
                let targetFriend = (await selectUser(allNotif[i]));
                let notifBtn = createBtn(container,`Invite from ${targetFriend.userName}`);
                notifBtn.style.backgroundColor = targetFriend.userColor;
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
export function displayFriendSearch(inputValue){
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
                if(!allFriendFound.length){allFriendFound=[allFriendFound]}; // !allfriend.length only 1 friendid in search
                for(let i = 0 ; i<allFriendFound.length; i = i + 1){
                    console.log('testloop');
                    console.log(allFriendFound[i]);
                    let friendIbtn = createBtnWithFunction(container,allFriendFound[i].userName,async()=>{
                        container.style.display = 'none';
                        await yesOrNoPrompt(globalHome,'SendFriendRequest','Cancel',
                            ()=> {sendFriendRequest(allFriendFound[i])},
                            ()=> {null}
                        )
                        container.style.display = '';
                    })
                    friendIbtn.style.backgroundColor = allFriendFound[i].userColor;
                    console.log('test passage');
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


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////SOCIAL MANAGMENT DISPLAY/////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

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
