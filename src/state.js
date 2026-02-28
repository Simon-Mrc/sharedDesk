import { loadState } from "./manager";
import { textNeeded } from "./namePrompt";
import { getAllDesksUser, selecteDesk } from "./queriesDb/deskQueries";
import { selectUser, logging  } from "./queriesDb/userQueries";

///////////// Logging section /////// BACK END WORK ? /////////////
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
      currentDesk0 = (await getAllDesksUser(currentUser0.id))[0];
    }catch(error){
      currentDesk0 = await selecteDesk('desk0');
      currentUser0 = await selectUser('user0');
    }
    console.log(currentUser0);
    await loadState(currentUser0);
    return([currentUser0,currentDesk0]);
}

