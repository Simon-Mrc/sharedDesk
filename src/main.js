import './style/style.css';
import './style/animations.css';
import './style/buttons.css';
import './style/containers.css';
import { initiate} from './functions.js';
import { displayTree } from './tree.js'; // bit ashamed .... this one is full AI. Got lazy and very not fun building process function anyway
import { clearStateInHtml, clearStateInStorage, createUserDb, savingDesk, loadState } from './manager.js';
import { initiateDeskandUser } from './state.js';


////////////////// INITIALISATION ///////////////////
clearStateInHtml();
clearStateInStorage();


////////////////////////// EXPORT SECTION ///////////////////
export const globalHome = document.getElementById(`globalHome`);
let result = await initiateDeskandUser();
export const state = {
  currentUser: result[0],
  currentDesk: result[1] || {}
}


/////////////////////////////////////////////////////////
///////////////BTN ATTRIBUTION SECTION //////////////////
///////////////////////////////////////////////////////////

////////////////////// TOGGLE SIDEBAR BTN//////////////////
const toggleSideBarButton = document.getElementById("toggleSideBar");
toggleSideBarButton.addEventListener("click",()=>{
  toggleSideBar();
});
function toggleSideBar() {
    const sideBar = document.getElementById('sideBar');
    sideBar.classList.toggle('expanded');
};

////////////////// INITATE NEW DESK BTN///////////////////
const initiateButton = document.getElementById("newDeskBtn");
initiateButton.addEventListener("click", ()=>{
  initiate(globalHome);
});

////////////////////LOGGING BTN///////////////////////////
const logginBtn = document.getElementById(`logInLogOut`);
logginBtn.addEventListener("click",async ()=>{ 
  let transitionVar = await initiateDeskandUser();
  if(transitionVar){
    clearStateInHtml();
    clearStateInStorage();
    state.currentDesk = transitionVar[1];
    state.currentUser = transitionVar[0];
    await loadState(state.currentUser);
  }
});

//////////////////////SAVING DESK BTN /////////////////////
let savingBtn=document.getElementById("saveCurrent");
savingBtn.addEventListener("click",()=>{
  savingDesk();
})

//////////////////////////CREATE USER BTN //////////////////
const createUserBtn = document.getElementById("createUserBtn");
createUserBtn.addEventListener("click",()=>{
  createUserDb(globalHome);
});

//////////////////SHAMING TREE BTN ////////////////////
const treeBtn = document.getElementById('shamingTree');
treeBtn.addEventListener('click', displayTree);