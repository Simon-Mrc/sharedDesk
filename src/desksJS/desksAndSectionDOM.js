import { textNeeded } from '../namePrompt.js';
import { quiteSlideLeft, slideRight } from '../DOMmanipJS/animations.js';
import { showContextMenu } from '../itemsJS/fileFolderAndContextMenu.js';
import { clearStateInStorage } from '../manager.js';
import { createDesk, updateDesk } from '../queriesDb/deskQueries.js';
import { updateUser } from '../queriesDb/userQueries.js';
import { state } from '../constJS/exportConst.js';
import { globalHome, array } from '../constJS/exportConst.js';
import { recreateDesk } from './recreateDesk.js';         // ← for switchDesk!
import { displayTree } from '../ashamedAITree.js';        // ← for switchDesk!
import { createBtnWithFunction } from '../DOMmanipJS/button.js'; // ← for savingDesk!
import { showDeskMenu } from '../settingSections.js';     // ← for savingDesk!


export async function initiate(section){
    clearStateInStorage();
    try{  // Obvioulsy need the data so we await lazy user to choose name
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
        // there is environment creation . going through all created desk to see if id matches
        let id = (state.currentUser.userName + '-' + nameChosen).replace(/\s+/g, '_'); // replacing all space because
        let newDesk = await createDesk({ // it messes up the route (path) in queries ! // g is for global and it means it s gonna replace all matches
            id: id,                      // \s means any white space and + means even if they re chained !
            name: nameChosen,
            ownerId: state.currentUser.id,
            createdAt: Date.now()
        });
        state.currentDesk = newDesk;
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
        console.log("unexpected issue",error);
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

export async function switchDesk(deskGiven){
    clearStateInStorage() ;    // BYE BYE
    await recreateDesk(deskGiven);  // HELLO
    await displayTree();
    state.currentDesk = deskGiven;
    return state.currentDesk;
}
export function savingDesk(){
    if(document.getElementById(state.currentDesk.id)){ //If it is already a saved desk
        let fullDesk = {};// create a different pointer to be putted in eventlistener btn
        let cleanBtn = document.getElementById(state.currentDesk.id).cloneNode(true); // THIS ONE SO USEFULL copies domelement + nod
        document.getElementById(state.currentDesk.id).replaceWith(cleanBtn);          // Replace with usefull to know to !
        Object.assign(fullDesk,state.currentDesk); // exact copy of current desk
        cleanBtn.addEventListener("click",()=>{
            switchDesk(fullDesk);
        });
        // deskbtnSettings.addEventListener('click',()=>{
        //     ///////// Desk Setting here ///////////
        // }); /// need to think more about if needed to update with new content 
    }
    else{
        let deskbtn = document.createElement('button');
        let fullDesk = {}; //same as before different pointer .....
        Object.assign(fullDesk,state.currentDesk);
        deskbtn.addEventListener("click",()=>{
            switchDesk(fullDesk); // ..... but same values
        });
        deskbtn.textContent = state.currentDesk.name;
        deskbtn.id = state.currentDesk.id; // to check later if already existing desk ! (ealier in code tho)
        deskbtn.classList.add("needEmpty") // to be clean out when resetting
        document.getElementById(`myDesks`).appendChild(deskbtn);
        let deskbtnSettings = createBtnWithFunction(document.getElementById(`myDesks`),'⚙️',()=>showDeskMenu(state.currentDesk));
        deskbtnSettings.classList.add('needEmpty');
    }
}
