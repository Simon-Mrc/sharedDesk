import './style/style.css';
import './style/animations.css';
import './style/buttons.css';
import './style/containers.css';
import { initiate} from './functions.js';
import { displayTree } from './tree.js'; // bit ashamed .... this one is full AI. Got lazy and very not fun building process function anyway
import { clearStateInHtml, clearStateInStorage, createUserDb, savingDesk } from './manager.js';
import { initiateDeskandUser } from './state.js';

////////////////// Inititalisation ///////////////////
clearStateInHtml();
clearStateInStorage();



let result = await initiateDeskandUser();
export const state = {
  currentUser: result[0],
  currentDesk: result[1]
}
////////////////// END OF INITIALISATION ////////////// MAYBE DIFFERENT ORGANISATION LATER /////////

// Really need to set up a starting state to reset beetween each switching environment.
// Testing purpose ! don t look at desk 3 btw


// Displaying all my shame. But it feels good.
const treeBtn = document.getElementById('showTree');
treeBtn.addEventListener('click', displayTree);


// This can surely be optimized but i want it to be global scope ...
// already took me too much brain cells and time to figure out how to manage data
let screens = [{id : 0}];
localStorage.setItem('screens', JSON.stringify(screens));

// Creation of container for all that s gonna be displayed. Receptacle
// for first appenchild(desk)
export const globalHome = document.getElementById(`globalHome`);

// Function to toggle sidebar expansion, basically just css class changing function
// nice animation tho
const toggleSideBarButton = document.getElementById("toggleSideBar");
toggleSideBarButton.addEventListener("click",()=>{
  toggleSideBar();
});
function toggleSideBar() {
    const sideBar = document.getElementById('sideBar');
    sideBar.classList.toggle('expanded');
};

// This one create your work environment. Need to be displayed none afterward
const initiateButton = document.getElementById("initiate");
initiateButton.addEventListener("click", ()=>{
  initiate(globalHome);
});

// Those were for testing purposes. Keeping it for now out of pity for them
// To be fair they really helped me adjust the animations 
// They now let you choose from different user to test permissions ! feels nice

const logginBtn = document.getElementById(`btnSettings`);
logginBtn.textContent = "logging test";
logginBtn.addEventListener("click",async ()=>{ 
  let transitionVar = await initiateDeskandUser();
  if(transitionVar){
    clearStateInHtml();
    clearStateInStorage();
    state.currentDesk = transitionVar[1];
    state.currentUser = transitionVar[0];
  }
});

let savingBtn=document.getElementById("desk2");
savingBtn.textContent = "savedesk";

savingBtn.addEventListener("click",()=>{
  savingDesk();
})

const createUserBtn = document.getElementById("createUserBtn");
createUserBtn.textContent = "Create a new user !";
createUserBtn.addEventListener("click",()=>{
  createUserDb(globalHome);
});