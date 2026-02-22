export function resetState(){
    let screen = [{id : 0}];

}
import { array } from "./creationbundle";
import { updateCurrentDesk,recreateDesk } from "./helperFunctions";

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

