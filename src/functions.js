import { textNeeded } from './namePrompt.js';
import { quiteSlideLeft,slideRight } from './animations.js';
import { showContextMenu } from './creationbundle.js';
import { clearStateInStorage } from './manager.js';
import { globalHome,state } from './main.js';
import { createDesk, updateDesk } from './queriesDb/deskQueries.js';
import { updateUser } from './queriesDb/userQueries.js';
//
export async function initiate(section){
    clearStateInStorage();
    try{ // always think about user experience here
        // Obvioulsy need the data so we await lazy user to choose name
        let nameChosen = await textNeeded("choose a name for your environment", "Enter a name", section);
        // OMG First desk creation here
        let desk = document.createElement(`div`);
        
        // Need to add listener for right click on every desk creation !
        desk.addEventListener('contextmenu', function(event) {
            event.preventDefault(); // computer interpretating rightclick
            const elementX = event.offsetX;
            const elementY = event.offsetY;
            showContextMenu(elementX,elementY,desk);
        });
        // Need to add header on every desk 
        // displayed or not it s gonna be usefull for json creation later.
        // there is environment creation . going through all created desk to see if id matches
        let id = state.currentUser.userName + '-' + nameChosen;
        let newDesk = await createDesk({
            id: id,
            name: nameChosen,
            ownerId: state.currentUser.id,
            createdAt: Date.now()
        });
        Object.assign(state.currentDesk,newDesk);
        await updateDesk(state.currentDesk);
        // First desk linking to main display. Called in main
        section.appendChild(desk);
        desk.classList.add(`desk-column-large`);
        
        // this await is to be sure that animations go smoothly despite loading speed
        await new Promise(resolve => requestAnimationFrame(resolve));
        await slideRight(desk);
//add the new environment to users data so it can reaccess
        updateUser(state.currentUser);// update it in storage
        
        
    }catch(error){ //USERRRRRR
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
    // Yeah it s gross but it s really not interesting creating this from scratch honestly
    goBack.innerHTML = ` 
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
    `;
    goBack.title = "Go Back"; // GO BACK I SAID
    
    goBack.addEventListener("click",async ()=>{
        await quiteSlideLeft(desk);
        desk.style.display = `none`;
        await slideRight(section); // So nice set up animations
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
    // await quiteSlideLeft(section);
    desk.style.display = 'none';
    globalHome.appendChild(desk);

    // await slideRight(desk);
    return desk; // In case i ll need it !  
};

