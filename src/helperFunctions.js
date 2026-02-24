import { quiteSlideLeft, slideRight } from "./animations";
import { array } from "./creationbundle";
import { clearStateInHtml, clearStateInStorage } from "./manager";
import { passingInfo, textNeeded } from "./namePrompt";
import { recreateDesk } from "./recreateDesk";
import { displayTree } from "./tree";
//those functions speak for themselves
export function createDesk(currentUserid, chosenName, idNumber){
    return {
        id: idNumber,
        name: chosenName,
        ownerId: currentUserid,
        accessUserId: [currentUserid],                      
        modifyUserId: [currentUserid],            
        urlLink: null,
        accessPassword: null,
        content: []  // EMPTY
    }
};
export function createFile(currentUser, chosenName, currentDesk,x,y){
    return {
        id: Date.now(), // So smart OMG. i started with currentDesk.content.lenght
        deskId: currentDesk.id,//felt like a genious
        name: chosenName,// until i deleted a file and had mental breakdown
        type: "file",
        x: x,
        y: y,
        accessUserId: [currentUser.id],                      
        modifyUserId: [currentUser.id],          
        urlLink: null,
        accessPassword: null,
        createdBy: currentUser.id,
        creatorColor: currentUser.userColor,
        fileData: null,
        children: []
    }
};
export function createFolder(currentUser, chosenName, currentDesk,x,y){
    console.log('Creating folder:', chosenName, 'for user:', currentUser.id);
    return {
            id: Date.now(),//same story as files
            deskId: currentDesk.id,
            name: chosenName,
            type: "folder",//You don t say ??
            x: x,
            y: y,
            accessUserId: [currentUser.id],                      
            modifyUserId: [currentUser.id],            
            urlLink: null,
            accessPassword: null,
            createdBy: currentUser.id,
            creatorColor: currentUser.userColor,
            children: []  // This one was hard to solve tho !
    }
};
export function createUser(name,userName,mail,password){
    return{
        name: name,
        userName: userName,
        id: mail,
        accountType: "",
        mail: mail,
        password: password,  
        desksId : [],
        friendList : [],  
        notif : [],
        userColor: "#FF5733"
    }
}

// LOOK AT ALL THOSE JSON UPDATE AND GET BUNDLE
// maybe redundant ones. lazy ass me wrote function without checking if existing
export function getCurrentUser(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
};
export function getAllUsers(){
    let allUsers = JSON.parse(localStorage.getItem("users"));
    return allUsers;
};
export function getCurrentDesk(){
    let currentDesk = JSON.parse(localStorage.getItem("currentDesk"));
    return currentDesk;
}
export function getAllDesks(){
    let allDesk = JSON.parse(localStorage.getItem("desks"));
    return allDesk || [];
}
// THIS ONE ..... ISN T IT JUST currentDesk.content .... i wrote i keeep !
export function getAllItemCurrentDesk(currentDesk){ //Returns an array !!!
    let currentDeskContent = currentDesk.content
    let items = [];
    function recursiveFill(currentDeskContent){
        currentDeskContent.forEach(item => {
            if(item.type == "file"){
                items.push(item);
            }
            else{
                items.push(item);
                recursiveFill(item.children);
            }         
        });
    }
    recursiveFill(currentDeskContent);
return items; // Returns an array of single items !!
}

export function updateDesks(item){
    localStorage.setItem("desks",JSON.stringify(item));
}
export function updateCurrentDesk(item){
    localStorage.setItem("currentDesk", JSON.stringify(item));
}
export function updateAllUsers(item){
    localStorage.setItem("users",JSON.stringify(item));
}
export function updateCurrentUser(item){
    localStorage.setItem('currentUser', JSON.stringify(item));
}
export function updateCurrentUserInUsers(currentUser){
    let allUsers = getAllUsers();
    for(let i = 0 ; i < allUsers.length ; i = i + 1){
        if(allUsers[i].id == currentUser.id){
            Object.assign(allUsers[i],currentUser); 
        }
    }
    localStorage.setItem('users',JSON.stringify(allUsers));
}
export function modifyContentAndUpdate(item){  // this one modify and update currentDesk in localStorage
    let currentDesk = getCurrentDesk();
    let currentDeskContent = currentDesk.content;
    function recursiveMod(currentDeskContent,item){
        currentDeskContent.forEach(stuff => {
            if(stuff.id == item.id){
                Object.assign(stuff , item); // Just learn this one and this is freaking magic // it s not a new copy !! same pointer !
                return;
            }
            else if(stuff.type == "folder"){
                recursiveMod(stuff.children,item)
            }           
        });
    }
    recursiveMod(currentDeskContent,item);
    updateCurrentDesk(currentDesk);
    updateCurrentDeskInDesks(currentDesk);
}
export function deleteContentAndUpdate(item){  // this one delete and update currentDesk in localStorage
    let currentDesk = getCurrentDesk();
    let currentDeskContent = currentDesk.content;
    //
    // Very interesting here. Since i splice i change length of what i going through !
    // So i have to do it backward !! This is a trick to remember !!
    function recursiveDelete(currentDeskContent){
        for(let i = currentDeskContent.length-1 ; i>=0 ; i = i - 1){
                if(currentDeskContent[i].id == item.id){
                currentDeskContent.splice(i,1);
            }
            else if (currentDeskContent[i].type == "folder"){
                recursiveDelete(currentDeskContent[i].children);
            }
        };
    }
    recursiveDelete(currentDeskContent);
    updateCurrentDesk(currentDesk);
    let desks=getAllDesks();
    for(let i = 0 ; i < desks.length ; i = i + 1){
        if (desks[i].id == currentDesk.id){
            desks[i] = currentDesk;
        }
    }
    updateDesks(desks);
    displayTree();
}

// Ok so this one is not recursive since it is only used in when in main page
export function addContentAndUpdate(item){ // Modify desks and currentdesk in LS
    let currentDesk = getCurrentDesk();
    let desks=getAllDesks(); // I need it to be recursive to put in children from folder
    if(item!=null){
        currentDesk.content.push(item);

        for(let i = 0 ; i < desks.length ; i = i + 1){
            if (desks[i].id == currentDesk.id){
                desks[i] = currentDesk;
            }
        }
        updateDesks(desks);
        updateCurrentDesk(currentDesk);
    } // I actually have to check if i still use this one because it won t work anymore
}

export function updateCurrentDeskInDesks(item){ // could be usefull ?
    let desks=getAllDesks();// Funny to see it 's one of the most usefull tho
    for(let i = 0 ; i < desks.length ; i = i + 1){
        if (desks[i].id == item.id){
            desks[i] = item;
        }
    }
    updateDesks(desks);
}
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
                    modifyContentAndUpdate(object);
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
                modifyContentAndUpdate(object); // ok i need to work on that function Right now it s not recursive
                optionMenu.remove();// so not storing data as it should
                resolve();
            }catch{}
        })
        deleteBtn.addEventListener('click', ()=>{
            optionMenu.remove();
            container.remove();
            deleteContentAndUpdate(object); // this one has been made recursive !    
            resolve();
        })
        cancelBtn.addEventListener('click', ()=>{ //Recursive ? just kidding
            optionMenu.remove()
            resolve();
        })
        /////////////NEED TO ADD SETTING THERE !!//////////

        //////////// NEED TO ADD DUPLICATE //////DONNNEEEEE////////////
//OMG this one was so hard to build and it is still not working. Need to dupe file and folder and all children ...
        duplicateBtn.addEventListener("click", ()=>{
            let dupObject = {};
            Object.assign(dupObject,JSON.parse(JSON.stringify(object))); // same object but 2 pointers ! So it s actually not really the same !
            dupObject.id = Date.now();
            dupObject.x = (dupObject.x+40);
            dupObject.y = (dupObject.y+30);
    
            function recursiveDup(items){
                items.forEach(item => {        
                if(item.type == "file"){
                    item.id = `desk-${crypto.randomUUID()}`; // not using Date.now() because i m afraid it script goes to quick
                    item.x = (item.x+40) ;// it ll be giving same id twice
                    item.y = (item.y+40) ;
                }
                else{
                    item.id = `desk-${crypto.randomUUID()}`;
                    item.x = (item.x+40) ;
                    item.y = (item.y+40) ;
                    recursiveDup(item.children);
                    }
                });
            return items;
            }
            let currentDesk = getCurrentDesk();
            let currentDeskContent = currentDesk.content;
            if(!object.children){    
            }
            else{
                recursiveDup(dupObject.children)
            }
            function recursiveFindAndPush(currentDeskContent){
                currentDeskContent.forEach(item => {
                if(item.type == "file"){
                }
                else{
                    if(item.id == object.id){
                        item.children.push(dupObject);
                    }
                    else{
                    recursiveFindAndPush(item.children);
                    };            
                }     
            });
        }
        if(!section.dataset.id){ // if in main page just push it
            currentDeskContent.push(dupObject); 
        } 
        else {
            recursiveFindAndPush(currentDeskContent); 
        }
        updateCurrentDesk(currentDesk);
        updateCurrentDeskInDesks(currentDesk);
        clearStateInHtml();
        clearStateInStorage() ; 
        setTimeout(() => { // set up a timeout because i am afraid of script speed excecution
            recreateDesk(currentDesk);
        }, 1000);

        }) 

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
export function searchIdandPushAndUpdate(currentDesk,objects,needStorage,targetID){
    objects.forEach(object => {
        if (object.id == targetID){ //when you find this 
            object.children.push(needStorage);
            updateCurrentDesk(currentDesk);
            updateCurrentDeskInDesks(currentDesk);
            return;
        }
        if (object.type == "folder"){
            searchIdandPushAndUpdate(currentDesk,object.children, needStorage,targetID);  
        };
    });
}

export function updateAllItemsInCurrentAndAllDesk(allItems){ //long enough name ?
    let currentDesk = getCurrentDesk();  
    let currentDeskContent = currentDesk.content ;
    function recursiveModify(currentDeskContent,i){
            currentDeskContent.forEach(item => {
                if(item.type == 'file'){
                    if(item.id == allItems[i].id){
                        Object.assign(item,allItems[i]);
                    }
                }
                else{
                    if(item.id == allItems[i].id){
                        Object.assign(item,allItems[i]);
                    }
                    recursiveModify(item.children,i);                                       
                }
            })      
        } 
        for(let i=0 ; i<allItems.length; i = i + 1){
        recursiveModify(currentDeskContent,i);
        }
    updateCurrentDesk(currentDesk);
    updateCurrentDeskInDesks(currentDesk);     
}
