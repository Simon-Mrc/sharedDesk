import './style/style.css';
import './style/animations.css';
import './style/buttons.css';
import './style/containers.css';
import { initiate } from './desksJS/desksAndSectionDOM.js';
import { displayTree } from './ashamedAITree.js';
import { clearStateInHtml, clearStateInStorage, createUserDb, loadState, initiateDeskandUser, firstTime } from './manager.js';
import { savingDesk } from './desksJS/desksAndSectionDOM.js';
import { showUserSetting } from './settingSections.js';
import { state } from './constJS/exportConst.js';
import { globalHome } from './constJS/exportConst.js';
import { showFriendMenu } from './socialJS/socialSettingAndFunctions.js';
import { yesOrNoPromptWithText } from './namePrompt.js';


////////////////// INITIALISATION ///////////////////
clearStateInHtml();
clearStateInStorage();
firstTime(globalHome);

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
const logginBtn = document.getElementById(`logBtn`);
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

//////////////////ACCOUNT SETTING BTN ////////////////////
const accountSettingBtn = document.getElementById('accountSetting');
accountSettingBtn.addEventListener('click',()=>showUserSetting(globalHome));

//////////////////SOCIAL PANEL  BTN ////////////////////
const socialBtn = document.getElementById("socialBtn");
socialBtn.addEventListener('click',()=>showFriendMenu(globalHome));