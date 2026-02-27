import { clearStateInHtml, clearStateInStorage } from "./manager";
import { textNeeded } from "./namePrompt";
import { deleteItem, updateItem } from "./queriesDb/itemQueries";
import { recreateDesk } from "./recreateDesk";

//those functions speak for themselves
//This one is usefull !!! Used to be able to replace my array const !
export function addScreenAndUpdate(screen){ // I really need to focus on this to built a proper start set up
    let screens = JSON.parse(localStorage.getItem('screens')) || [];
    screens.push(screen);
    localStorage.setItem('screens',JSON.stringify(screens));
}

// speak for itself. Button creation there
export function openOption(object, section,label,container){
    return new Promise((resolve, reject) => {  
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
        //BORING PART ENDS
        // LITTLE MORE INTERESTING HERE
        renameBtn.addEventListener('click', async (e) => {// Obviously gonna need to wait
            // Gotta admit textNeeded isn t great naming but IDC
              try{ let name = await textNeeded("choose a new name","choose a new name",section);
                if (name) { //change name function and update in LS
                    optionMenu.remove();
                    object.name = name;
                    label.textContent = name;
                    //update object.name in localStorage
                    // update currentDesk and desks in local Storage
                    updateItem(object);
                    resolve(name); 
                }
             else {//Stupid user not even able to pick a name
                input.classList.add('prompt-input-error');
                setTimeout(() => input.classList.remove('prompt-input-error'), 500);
            }}catch{
                reject();//And don t come back
            };
        })

        setPasswordBtn.addEventListener('click', async (e)=>{
            try{ //i ll stop commentary there you got the idea
                let newPsw = await textNeeded("Set a password", "Don t be genereic", section);
                object.accessPassword = newPsw;
                updateItem(object); // ok i need to work on that function Right now it s not recursive
                optionMenu.remove();// so not storing data as it should
                resolve();
            }catch{}
        })
        deleteBtn.addEventListener('click', ()=>{
            optionMenu.remove();
            container.remove();
            deleteItem(object.id); // this one has been made recursive !    
            resolve();
        })
        cancelBtn.addEventListener('click', ()=>{ //Recursive ? just kidding
            optionMenu.remove()
            resolve();
        })
        /////////////NEED TO ADD SETTING THERE !!//////////

        //////////// NEED TO ADD DUPLICATE //////DONNNEEEEE////////////
//OMG this one was so hard to build and it is still not working. Need to dupe file and folder and all children ...
        // duplicateBtn.addEventListener("click", ()=>{
        //     let dupObject = {};
        //     Object.assign(dupObject,JSON.parse(JSON.stringify(object))); // same object but 2 pointers ! So it s actually not really the same !
        //     dupObject.id = Date.now();
        //     dupObject.x = (dupObject.x+40);
        //     dupObject.y = (dupObject.y+30);
    
        //     function recursiveDup(items){
        //         items.forEach(item => {        
        //         if(item.type == "file"){
        //             item.id = `desk-${crypto.randomUUID()}`; // not using Date.now() because i m afraid it script goes to quick
        //             item.x = (item.x+40) ;// it ll be giving same id twice
        //             item.y = (item.y+40) ;
        //         }
        //         else{
        //             item.id = `desk-${crypto.randomUUID()}`;
        //             item.x = (item.x+40) ;
        //             item.y = (item.y+40) ;
        //             recursiveDup(item.children);
        //             }
        //         });
        //     }
        //     let currentDesk = getCurrentDesk();
        //     let currentDeskContent = currentDesk.content;
        //     if(!object.children){    
        //     }
        //     else{
        //         recursiveDup(dupObject.children)
        //     }
        //     function recursiveFindAndPush(currentDeskContent){
        //         currentDeskContent.forEach(item => {
        //         if(!item.children){
        //         }
        //         else{
        //             if(item.id == object.id){
        //                 currentDeskContent.push(dupObject);
        //             }
        //             else{
        //             recursiveFindAndPush(item.children);
        //             };            
        //         }     
        //     });
        // }
        // if(!section.dataset.id){ // if in main page just push it
        //     currentDeskContent.push(dupObject); 
        // } 
        // else {
        //     recursiveFindAndPush(currentDeskContent); 
        // }
        // updateCurrentDesk(currentDesk);
        // updateCurrentDeskInDesks(currentDesk);
        // clearStateInHtml();
        // clearStateInStorage() ; 
        // setTimeout(() => { // set up a timeout because i am afraid of script speed excecution
        //     recreateDesk(currentDesk);
        // }, 1000);

        // }) 

            //////////// LOVE CAPSLOCK ///////////////////:
        ///////////WHERE IS THE NEXT RICKROLLED TRAP????/////////
        setTimeout(() => {
            document.addEventListener('click', function closeOptionMenu(e) {
                if (!optionMenu.contains(e.target)) {
                    optionMenu.remove();
                    reject('cancelled'); // ← Added reject
                    document.removeEventListener('click', closeOptionMenu);
                }
            });
        }, 0);
    });
}

// Ok so this is recursive file datastorage function 

