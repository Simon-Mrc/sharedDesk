import { passingInfo, showNamePrompt, textNeeded } from './namePrompt.js';
import { createDesk, getAllDesks, getCurrentUser, getCurrentDesk, updateDesks,updateUsers,
addContentAndUpdate, createFolder, createFile, updateCurrentDesk, openOption, 
addScreenAndUpdate,
updateCurrentDeskInDesks} from './helperFunctions.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { initiate,createNew } from './functions.js';
import { searchIdandPushAndUpdate } from './helperFunctions.js';
import { displayTree } from './tree.js';
import { array } from './creationbundle.js';
import { createUser } from './helperFunctions.js';

export function clearState(){
    // 1. Wipe the DOM
    let wipe = document.getElementById('globalHome');
    wipe.innerHTML=``;
    array.length = 0; // by doin so i empty the array without breaking reference and contain it to this scope
    localStorage.setItem(`screens`,JSON.stringify([{id : 0}]));
}
export function switchDesk(deskGiven){
    clearState() ;    // BYE BYE
    localStorage.setItem(`currentDesk`, JSON.stringify(deskGiven));  
    recreateDesk(deskGiven);  // HELLO
}
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
    }catch(error){
        console.log(error);
    }
}
