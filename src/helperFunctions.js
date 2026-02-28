import { textNeeded } from "./namePrompt";
import { deleteItem, updateItem } from "./queriesDb/itemQueries";

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
        ////////////////////////BORING PART ENDS
        //////////////////////// LITTLE MORE INTERESTING HERE
        renameBtn.addEventListener('click', async (e) => {
            // Gotta admit textNeeded isn t great naming but IDC
              try{ let name = await textNeeded("choose a new name","choose a new name",section);
                if (name) { //change name function and update in DB
                    optionMenu.remove();
                    object.name = name;
                    label.textContent = name;
                    updateItem(object);
                    resolve(name); 
                }
             else {//Stupid user not even able to pick a name
                optionMenu.remove();
            }}catch{
                reject();//And don t come back
            };
        })

        setPasswordBtn.addEventListener('click', async (e)=>{
            try{ //i ll stop commentary there you got the idea
                let newPsw = await textNeeded("Set a password", "Don t be genereic", section);
                object.accessPassword = newPsw;
                updateItem(object); // update in DB
                optionMenu.remove();
                resolve();
            }catch{}
        })
        deleteBtn.addEventListener('click', ()=>{
            optionMenu.remove();
            container.remove(); //Delete from DOM
            deleteItem(object.id); // delete from DB    
            resolve();
        })
        cancelBtn.addEventListener('click', ()=>{ 
            optionMenu.remove()
            resolve();
        })
        /////////////NEED TO ADD SETTING THERE !!//////////

        //////////// NEED TO ADD DUPLICATE /////////////////
        ////////////THIS IS GONNA BE QUITE A CHALLENGE/////////

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



