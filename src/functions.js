import { showNamePrompt } from './namePrompt.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { newFile, newFolder,showContextMenu } from './creationbundle.js';
// Will i need to import fs too ?
//
//
export async function initiate(section){
    // OMG First desk creation here
    let desk = document.createElement(`div`);
   
    // Need to add listener for right click on every desk creation !
    desk.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const elementX = event.offsetX;
        const elementY = event.offsetY;
        showContextMenu(elementX,elementY,desk);
    });

    // First desk linking to main display. Called in main
    section.appendChild(desk);
    desk.classList.add(`desk-column-large`);

    // this await is to be sure that animations go smoothly despite loading speed
    await new Promise(resolve => requestAnimationFrame(resolve));
    await slideRight(desk);

    // Need to add header on every desk 
    // displayed or not it s gonna be usefull for json creation later.
    desk.id = "home";   
};


export async function createNew(section){
    // building the new desk here 
    let desk = document.createElement(`div`);
    desk.classList.add(`desk-column-large`);
    
    // button there is needed . Need to work on css tho
    let goBack = document.createElement(`button`);
    goBack.textContent = "Goback";
    goBack.addEventListener("click",async ()=>{
        await quiteSlideLeft(desk);
        desk.style.display = `none`;
        await slideRight(section);
    });
    
    // Each created desk need to have this addEvent add at creation
    // Allows right clicking to create files and folders
    desk.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const elementX = event.offsetX;
        const elementY = event.offsetY;
        showContextMenu(elementX,elementY,desk);
    });

    // Linking created function to new desk
    desk.appendChild(goBack);

    // making old disappear before linking new desk to main display
    // Fashion choice. Fashion matters
    await quiteSlideLeft(section);
    globalHome.appendChild(desk);
    await slideRight(desk);
    return desk;   
};

