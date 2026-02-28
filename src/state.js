import { loadState } from "./manager";
import { textNeeded } from "./namePrompt";
import { getAllDesksUser, selecteDesk } from "./queriesDb/deskQueries";
import { selectUser, logging  } from "./queriesDb/userQueries";

///////////// Logging section /////// BACK END WORK ? /////////////
export async function initiateDeskandUser(){
    const section = document.getElementById('globalHome');
       
    let userName = await textNeeded( "Whats your name already ?","I don t recall you",section);
    let pswrd = await textNeeded( "What the password","don t remember ? what a shame",section);
    let currentUser0;
    let currentDesk0;
    try{
      currentUser0 = await logging(userName,pswrd);
      currentDesk0 = (await getAllDesksUser(currentUser0.id))[0];
    }catch(error){
    
    }
    if (!currentUser0){
      currentDesk0 = await selecteDesk('desk0');
      currentUser0 = await selectUser('user0'); //for now until loggin has been made mandatory
    }
    console.log(currentUser0);
    await loadState(currentUser0);
    return([currentUser0,currentDesk0]);
}

