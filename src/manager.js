import { createContainer, quickMessage, textNeeded } from './namePrompt.js';
import { createUser, logging, selectUser, updateUser } from './queriesDb/userQueries.js';
import { selecteDesk } from './queriesDb/deskQueries.js';
import { state, array, globalHome } from './constJS/exportConst.js';
import { switchDesk } from './desksJS/desksAndSectionDOM.js';
import { showDeskMenu } from './desksJS/deskSetting.js';
import { getAllDeskSharedUser } from './queriesDb/accessQueries.js';
import { createBtnWithFunction } from './DOMmanipJS/button.js';


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
} /////// need to move those out manager.js


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
    state.currentUser = user;
    console.log("Starting loading state");
    clearStateInStorage(); // thought it would be better for storage managment.
    clearStateInHtml();
    let allUserDesks = await getAllDeskSharedUser(user.id);
    console.log(user);
    if(allUserDesks == undefined){
        console.log("User has no current desk");
        return;
    }
    else{
        for(let desk of allUserDesks) { // This assign all buttons to desks of certain user
            let fullDesk = await selecteDesk(desk.deskId);
            state.currentDesk = fullDesk;
            let deskbtn = document.createElement('button');
            let deskbtnSettings = document.createElement('button');
            ////////////////RECREATEDESK//////////////////
            deskbtn.addEventListener("click",()=>{
                switchDesk(fullDesk);
            })
            //////////// Desk Setting here ////////////////
            deskbtnSettings.addEventListener('click',()=>{
                showDeskMenu(fullDesk);
            });
            ///////////////////////////////////////////////
            deskbtn.innerText = fullDesk.name;
            deskbtn.id = fullDesk.id;
            deskbtnSettings.innerText = "⚙️";
            deskbtnSettings.classList.add('needEmpty');
            deskbtn.classList.add("needEmpty"); // for reset when switching users
            /////////////GIVING BTN CREATOR COLOR///////////////
            let creatorUser = await selectUser(fullDesk.ownerId);
            deskbtn.style.boxShadow = `0 4px 10px ${creatorUser.userColor}`;
            deskbtnSettings.style.boxShadow = `0 4px 10px ${creatorUser.userColor}`;
            ////////////////////////////////////////////////////////////
            document.getElementById("myDesks").appendChild(deskbtn);
            document.getElementById("myDesks").appendChild(deskbtnSettings);
        };
    }
}

export async function firstTime(section){
    return new Promise((resolve, reject) => {
        let {container , cleanUp} = createContainer(section);
        container.classList.add("containerInit");
        let loggingbtn = createBtnWithFunction(container,'Log IN if you dare',
            async()=>{let userName = await textNeeded('Give your userName','UserName',section);
                let password = await textNeeded('Enter password, not too loud tho','password i m not looking',section);
                let user = await logging(userName,password);
                console.log(user);
                if(user?.id){
                    cleanUp();
                    loadState(user);
                    return;
                }
                else{
                    quickMessage('Try again but not too much');
                }
    
            }
        )
        let createNewUserBtn = createBtnWithFunction(container,'Create new user',
            ()=>createUserDb(globalHome))
            loggingbtn.classList.add('buttonInit');
            createNewUserBtn.classList.add('buttonInit');
    }
)}

// Again we need full targetUser object for this function
export async function changeUser(targetUser){ // Not sure if this function will find use
    await loadState(targetUser); // think about sharing account ?
    state.currentUser = targetUser;
}
export async function initiateDeskandUser(){
  const section = document.getElementById('globalHome');
  let currentUser0;
  let currentDesk0;
    try{
      let userName = await textNeeded( "Whats your name already ?","I don t recall you",section);
      let pswrd = await textNeeded( "What the password","don t remember ? what a shame",section);
      currentUser0 = await logging(userName,pswrd); 
      ////////////////////////////////////////////////////////////////
    //////////////////Throw new error explained /////////////////////////////
    ////////if password is wrong there is a return object {error:'message'}////
    //////////so it won t go into catch section if currentUser?.error means ////////
    /////////if currentUser0 And got an error property then ==> throw new ....///////
    ////////////////////////////////////////////////////////////////////////
      if(currentUser0?.error) throw new Error('bad login');
      currentDesk0 = await selecteDesk((await getAllDeskSharedUser(currentUser0.id))[0].deskId); //lazyasfckmenotproudofthis
    }catch(error){
      currentDesk0 = await selecteDesk('desk0');
      currentUser0 = await selectUser('user0');
    }
    console.log(currentUser0);
    // await loadState(currentUser0);
    return([currentUser0,currentDesk0]);
}


