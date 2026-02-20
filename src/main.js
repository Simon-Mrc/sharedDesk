import './style/style.css';
import './style/animations.css';
import './style/buttons.css';
import './style/containers.css';
import { createDesk, getAllDesks, getCurrentUser, getCurrentDesk, updateDesks,updateUsers,addContentAndUpdate } from './helperFunctions.js';
import { fakeUsers, desks, loadMockData } from './mock.js';
import {localStorageStoreTest, localStorageGetTest} from './localStorageTest.js';
import { showNamePrompt,textNeeded } from './namePrompt.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { newFile, newFolder,showContextMenu } from './creationbundle.js';
import { initiate,createNew } from './functions.js';

// loadMockData();
// Creation of container for all that s gonna be displayed. Receptacle
// for first appenchild(desk)
const globalHome = document.getElementById(`globalHome`);


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
const displayed = document.getElementById(`test`);
const buttonExpand = document.getElementById(`btnDesks`);
const quite = document.getElementById(`quite`);
buttonExpand.addEventListener("click", ()=>{
  localStorageStoreTest();
});
const buttonShrink = document.getElementById(`btnSettings`);
buttonShrink.addEventListener("click", ()=>{
  localStorageGetTest();
});

quite.addEventListener("click", ()=>{

});

