import { quiteSlideLeft, slideRight } from "./animations";
import { array } from "./creationbundle";
import { passingInfo, textNeeded } from "./namePrompt";
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
        notifications : [],
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
export function getAllItemCurrentDesk(){
    let allItem = [];
    for(let i = 0 ; i< getCurrentDesk().content.length ; i = i + 1){
        allItem.push(getCurrentDesk().content[i]); 
    } 
    return allItem;
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
                Object.assign(stuff , item); // Just learn this one and this is freaking magic
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
export function addContentAndUpdate(item){ // Modify desks and currentdesk in LS
    let currentDesk = getCurrentDesk()
    if(item!=null){
        currentDesk.content.push(item);
    } // I actually have to check if i still use this one because it won t work anymore
    let desks=getAllDesks(); // I need it to be recursive to put in children from folder
    for(let i = 0 ; i < desks.length ; i = i + 1){
        if (desks[i].id == currentDesk.id){
            desks[i] = currentDesk;
        }
    }
    updateDesks(desks);
    updateCurrentDesk(currentDesk);
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

        duplicateBtn.addEventListener("click", ()=>{
            let dupFile = {...object, id: Date.now()}; // i wrote let dupFile=object but it creates just another pointer to same object
            // and you don t want 2 items with same ID anyway
    // You actually have to define function here because you use dupfile and it has to be in 
    //function from addEventListener 
            function recursiveDup(currentDeskContent){
                currentDeskContent.forEach(stuff => {
                    if(stuff.type == "folder"){ // files don t have children 
                        if(stuff.id == section.dataset.id){ // ok so i built environment such as section dataset.id 
                            stuff.children.push(dupFile);// is matching the id of folder it comes from
                            return;// so as soon as there is a match you found your parent.
                        }
                        else{
                            recursiveDup(stuff.children);
                        }           
                    }
                })
            }
            // so i have to remember that duping function is scope limited now cannot use outside
            // eventlistener function
            if(object.type == "file"){
                let container = document.createElement('div');
                container.classList.add('icon');
                container.style.left = (object.x+130) + 'px';
                container.style.top = (object.y+30) + 'px';
                let img = document.createElement('img');
                img.src = "../pictures/file.png";
                let label = document.createElement('span');
                label.classList.add('icon-label');
                label.textContent = object.name;
                container.appendChild(img);
                container.appendChild(label);
                container.addEventListener("dblclick",()=>{
// still have to find something to put here
                });
                container.addEventListener("contextmenu",async(e)=>{
                    e.preventDefault(); // Prevent browser menu!
                    e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
                    await openOption(dupFile,section,label,container);                    
                })
                // recursive dups for localStorageManagment               
                let currentDesk = getCurrentDesk();// number 1 you get 
                let currentDeskContent = currentDesk.content;
                if(!section.dataset.id){ // just here for homesection case. 
                    currentDeskContent.push(dupFile);// Only section that doesn t have dataset.id
                } else {
                    recursiveDup(currentDeskContent);
                }
                // number 2 you change
                updateCurrentDesk(currentDesk); // number 3 you update in datastorage !
                updateCurrentDeskInDesks(currentDesk);
                section.appendChild(container);
                optionMenu.remove();
                resolve();
            }
            else{
                 // I M SO FCKIN STUPID SOMETIMES

                let container = document.createElement('div');
                container.classList.add('icon');
                container.style.left = (object.x+130) + 'px';
                container.style.top = (object.y+30) + 'px';
                let img = document.createElement('img');
                img.src = "../pictures/folder.jpg";
                let label = document.createElement('span');
                label.classList.add('icon-label');
                label.textContent = object.name;
                container.appendChild(img);
                container.appendChild(label);
                container.addEventListener("dblclick",async ()=>{
                let securityCheck = 0;
                // Little trick there ! i can use folder here before creation. I could have put it before but i find it fun to leeave it there.
                if (folder.accessPassword){ 
                    let pswrd = await textNeeded('what is the password?','Try to guess mthfckr',section);//await really needed there
                        if(pswrd === folder.accessPassword){
                            passingInfo('u re in my man',section); // need to solve some issues with box stayin on screen still not solved tho
                        }                                        // to lazy to create a specific display function just for this
                        else{
                            passingInfo('u re out buddy',section);
                            securityCheck = 1; // security check is locked in 
                        }
                    }
                if(securityCheck === 0){// U can come in my man ! Just choosin what i ll display you there
                    // array is full of div representing all my created screen displayed
                if(container.dataset.index){ // i stored dataset in container representing folder
                await quiteSlideLeft(section);// then i just linked it to a specific index in DOM array
                array[container.dataset.index].style.display=``; // Big brain thinking there
                await slideRight(array[container.dataset.index]); // Await everywhere for smooth animations
                }
            }
        })        
                container.addEventListener("contextmenu",async(e)=>{
                    e.preventDefault(); // Prevent browser menu!
                    e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
                    await openOption(dupFile,section,label,container);                    
                })           
                let currentDesk = getCurrentDesk();
                let currentDeskContent = currentDesk.content;
                if(!section.dataset.id){
                    currentDeskContent.push(dupFile);
                } else {
                    recursiveDup(currentDeskContent);
                }
                updateCurrentDesk(currentDesk);
                updateCurrentDeskInDesks(currentDesk);

                section.appendChild(container);
                optionMenu.remove();
                resolve();
            }
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
        if (object.id == targetID){
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

