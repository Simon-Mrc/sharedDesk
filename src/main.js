import './style.css'
import * as usable from './functions.js'

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
  usable.initiate(globalHome);
});

// Those were for testing purposes. Keeping it for now out of pity for them
// To be fair they really helped me adjust the animations 
const displayed = document.getElementById(`test`);
const buttonExpand = document.getElementById(`btnDesks`);
const quite = document.getElementById(`quite`);
buttonExpand.addEventListener("click", ()=>{
  usable.slideRight(displayed);
});
const buttonShrink = document.getElementById(`btnSettings`);
buttonShrink.addEventListener("click", async ()=>{
 await usable.slideLeft(displayed);
});

quite.addEventListener("click", async ()=>{
 await usable.quiteSlideLeft(displayed);
});

