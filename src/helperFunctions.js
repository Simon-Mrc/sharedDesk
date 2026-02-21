import { textNeeded } from "./namePrompt";

export function createDesk(currentUserid, chosenName, idNumber){
    console.log('Creating desk:', chosenName, 'for user:', currentUserid);
    return {
        id: idNumber,
        name: chosenName,
        ownerId: currentUserid,
        accessUserId: [currentUserid],                      // No one can view
        modifyUserId: [currentUserid],            // Only Bob can edit
        urlLink: null,
        accessPassword: null,
        content: []  // EMPTY
    }
};
export function createFile(currentUser, chosenName, currentDesk,x,y){
    return {
        id: "icon-002",
        deskId: currentDesk.id,
        name: chosenName,
        type: "file",
        x: x,
        y: y,
        accessUserId: [currentUser.id],                      
        modifyUserId: [currentUser.id],          
        urlLink: null,
        accessPassword: null,
        createdBy: currentUser.id,
        creatorColor: "#FF5733",
        fileData: null,
    }
};
export function createFolder(currentUser, chosenName, currentDesk,x,y){
    console.log('Creating folder:', chosenName, 'for user:', currentUser.id);
    return {
            id: "icon-001",
            deskId: currentDesk.id,
            name: chosenName,
            type: "folder",
            x: x,
            y: y,
            accessUserId: [currentUser.id],                      
            modifyUserId: [currentUser.id],            
            urlLink: null,
            accessPassword: null,
            createdBy: currentUser.id,
            creatorColor: "#FF5733",
            children: []  // Empty folder for now
    }
};
export function getCurrentUser(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
};
export function getCurrentDesk(){
    let currentDesk = JSON.parse(localStorage.getItem("currentDesk"));
    return currentDesk;
}
export function getAllDesks(){
    let allDesk = JSON.parse(localStorage.getItem("desks"));
    return allDesk || [];
}
export function updateDesks(item){
    localStorage.setItem("desks",JSON.stringify(item));
}
export function updateCurrentDesk(item){
    localStorage.setItem("currentDesk", JSON.stringify(item));
}
export function updateUsers(item){
    localStorage.setItem("users",JSON.stringify(item));
}
export function addContentAndUpdate(item){
    let currentDesk = getCurrentDesk()
    currentDesk.content.push(item);
    let desks=getAllDesks();
    for(let i = 0 ; i < desks.length ; i = i + 1){
        if (desks[i].id == currentDesk.id){
            desks[i] = currentDesk;
        }
    }
    updateDesks(desks);
    updateCurrentDesk(currentDesk);

}
export function openOption(object, section,label,container){
    new Promise((resolve, reject) => {  
        let optionMenu = document.createElement('div');
        optionMenu.classList.add('option-menu');
        optionMenu.style.position = 'absolute'
        optionMenu.style.left = object.x + 'px';
        optionMenu.style.top = object.y + 'px';
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('prompt-buttons');
        let renameBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        let setPasswordBtn = document.createElement('button');
        let duplicateBtn = document.createElement('button');
        let settinBtn = document.createElement('button');
        let cancelBtn = document.createElement('button');
        renameBtn.classList.add('prompt-btn', 'prompt-btn-create');
        renameBtn.textContent = '✏️ Rename';
        deleteBtn.classList.add('prompt-btn', 'prompt-btn-create');
        deleteBtn.textContent = '🗑️ Delete';
        setPasswordBtn.classList.add('prompt-btn', 'prompt-btn-create');
        setPasswordBtn.textContent = '🔒 Set Password';
        settinBtn.classList.add('prompt-btn', 'prompt-btn-create');
        settinBtn.textContent = '⚙️ Advanced Settings';
        duplicateBtn.classList.add('prompt-btn', 'prompt-btn-create');
        duplicateBtn.textContent = '📋 Duplicate';
        cancelBtn.classList.add('prompt-btn', 'prompt-btn-create');
        cancelBtn.textContent = '❌ Cancel';
        buttonContainer.appendChild(renameBtn);
        buttonContainer.appendChild(duplicateBtn);
        buttonContainer.appendChild(deleteBtn);
        buttonContainer.appendChild(setPasswordBtn);
        buttonContainer.appendChild(settinBtn);
        buttonContainer.appendChild(cancelBtn);
        optionMenu.appendChild(buttonContainer);
        section.appendChild(optionMenu);
        renameBtn.addEventListener('click', async (e) => {
              try{ let name = await textNeeded("choose a new name","choose a new name",section);
                if (name) {
                    optionMenu.remove();
                    object.name = name;
                    label.textContent = name;
                    //update object.name in localStorage
                    // update currentDesk and desks in local Storage
                    resolve(name); 
                }
             else {
                input.classList.add('prompt-input-error');
                setTimeout(() => input.classList.remove('prompt-input-error'), 500);
            }}catch{
                reject();
            };})
            setPasswordBtn.addEventListener('click', async (e)=>{
                try{
                    let newPsw = await textNeeded("Set a password", "Don t be genereic", section);
                    object.accessPassword = newPsw;
                    // updates in local storage
                    optionMenu.remove();
                    resolve();
                }catch{}
            })
            deleteBtn.addEventListener('click', ()=>{
                optionMenu.remove();
                container.remove();
                //update in local storage
                resolve();
            })
        });
        setTimeout(() => {
            document.addEventListener('click', function closeOptionMenu(e) {
                if (!optionMenu.contains(e.target)) {
                    optionMenu.remove();
                    reject('cancelled'); // ← Added reject
                    document.removeEventListener('click', closeOptionMenu);
                }
            }, 0);
        });
    }

