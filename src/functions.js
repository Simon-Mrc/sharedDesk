import { showNamePrompt,textNeeded,passingInfo } from './namePrompt.js';
import { createDesk, getAllDesks, getCurrentUser, getCurrentDesk, updateDesks,updateUsers,addContentAndUpdate } from './helperFunctions.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { newFile, newFolder,showContextMenu } from './creationbundle.js';

//
export async function initiate(section){
    try{
        let nameChosen = await textNeeded("choose a name for your environment", "Enter a name", section);
        // OMG First desk creation here
        let desk = document.createElement(`div`);
        
        // Need to add listener for right click on every desk creation !
        desk.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            const elementX = event.offsetX;
            const elementY = event.offsetY;
            showContextMenu(elementX,elementY,desk);
        });
                
        let currentUser = getCurrentUser();
        console.log(currentUser.id);
        // Need to add header on every desk 
        // displayed or not it s gonna be usefull for json creation later.
        // there is environment creation . going through all created desk to see if id matches
        let deskid = currentUser.id + '-' + nameChosen;
        let allDesk = getAllDesks();
        let check = 0 ;
        for (let i = 0 ; i < allDesk.length ; i = i+1){
            if(allDesk[i].id == deskid){
                check = 1 ;
                i = allDesk.length ;
            }
        }
        if(check == 0){

            let currentDesk = createDesk(currentUser.id, nameChosen, deskid);
            // First desk linking to main display. Called in main
            section.appendChild(desk);
            desk.classList.add(`desk-column-large`);
            
            // this await is to be sure that animations go smoothly despite loading speed
            await new Promise(resolve => requestAnimationFrame(resolve));
            await slideRight(desk);
            allDesk.push(currentDesk);
            updateDesks(allDesk);
            localStorage.setItem("currentDesk", JSON.stringify(currentDesk)); //updating currentDesk
        }
        else{
            await passingInfo("Already picked that name =D", section);
        }

    }catch(error){
        console.log("unexpected issue");
    }
};


export async function createNew(section){
    // building the new desk here 
    let desk = document.createElement(`div`);
    desk.classList.add(`desk-column-large`);
    
    // button there is needed . Need to work on css tho
    let goBack = document.createElement('button');
    goBack.classList.add('back-button');
    goBack.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
    `;
    goBack.title = "Go Back"; // Tooltip on hover
    
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

