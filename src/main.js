import './style.css'
import * as usable from './functions.js'
// Function to toggle sidebar expansion
const globalHome = document.getElementById(`globalHome`);
const toggleSideBarButton = document.getElementById("toggleSideBar");
toggleSideBarButton.addEventListener("click",()=>{
  toggleSideBar();
});
function toggleSideBar() {
    const sideBar = document.getElementById('sideBar');
    sideBar.classList.toggle('expanded');
};
const initiateButton = document.getElementById("initiate");
initiateButton.addEventListener("click", ()=>{
  usable.initiate(globalHome);
});
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

// Example: You can call this function on a button click
// Create a button in your HTML and add: onclick="toggleSideBar()"