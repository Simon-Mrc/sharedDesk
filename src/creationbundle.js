import { passingInfo, showNamePrompt, textNeeded } from './namePrompt.js';
import { createDesk, getAllDesks, getCurrentUser, getCurrentDesk, updateDesks,updateUsers,
addContentAndUpdate, createFolder, createFile, updateCurrentDesk, openOption } from './helperFunctions.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { initiate,createNew } from './functions.js';
let array = [];
export async function newFile(x,y,section){
    if(getCurrentDesk().modifyUserId.includes(getCurrentUser().id)){
        // Used to force container to have right style properties to allow positionning on click
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        
        try{
            let labelName =  await showNamePrompt(x,y,section,"file");
            if (labelName){
                // Box building for image and label
                let container = document.createElement('div');
                container.classList.add('icon');
                container.style.position = 'absolute';
                container.style.left = x + 'px';
                container.style.top = y + 'px';
                
                // Image getting taken here
                let img = document.createElement('img');
                img.src = "../pictures/file.png";
                
                // Label : need to add a prompt there
                let label = document.createElement('span');
                label.classList.add('icon-label');
                label.textContent = labelName;
                
                // Attaching img and label to box container
                container.appendChild(img);
                container.appendChild(label);
            
                // Wtf s gonna happen if you double click a file ? Gettin rick rolled?
                // Just kiding thinking about download option !
                container.addEventListener("dblclick",()=>{
                    
                })
                let file = createFile(getCurrentUser(),labelName,getCurrentDesk(),x,y);
                console.log("testing");
                container.addEventListener("contextmenu",async(e)=>{
                    e.preventDefault(); // ✅ Prevent browser menu!
                    e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
                    await openOption(file,section,label,container);                    
                })
                section.appendChild(container);
                addContentAndUpdate(file);
                return [container,label];    
            }  
        }catch (error){   
        }
    }
    else{
        passingInfo("You don t have permission boy", section);
    }
};

export async function newFolder(x,y,section){
    if(getCurrentDesk().modifyUserId.includes(getCurrentUser().id)){

        // Used to force container to have right style properties to allow positionning on click
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        try{
            let folderName = await showNamePrompt(x,y,section,"folder");
            if (folderName){
                let container = document.createElement('div');
                container.classList.add('icon');
                container.style.left = (x+2) + 'px';
                container.style.top = (y+2) + 'px';
                
                // Image for file 
                let img = document.createElement('img');
                img.src = "../pictures/folder.jpg";
                
                // Label thats gonna be displayed need to work on it
                let label = document.createElement('span');
                label.classList.add('icon-label');
                label.textContent = folderName;
                
                // Attached img and label to container wich is right-positionned
                container.appendChild(img);
                container.appendChild(label);
            
                // Need to work on this part. If already been double click you have to retrieve the right div and not create one
                // Probably give a dynamic id to desk and write it somewhere in container property to be able to retrieve it ?
                container.addEventListener("dblclick",async ()=>{
                    let securityCheck = 0;
                    if (folder.accessPassword){
                        let pswrd = await textNeeded('what is the password?','Try to guess mthfckr',section);
                        if(pswrd === folder.accessPassword){
                            passingInfo('u re in',section); // need to solve some issues with box stayin on screen 
                        }
                        else{
                            passingInfo('u re out',section);
                            securityCheck = 1;
                        }
                    }
                    if(securityCheck === 0){

                        if(container.dataset.index){
                            await quiteSlideLeft(section);
                            array[container.dataset.index].style.display=``;
                            await slideRight(array[container.dataset.index]);
                        }
                        else{
                            let newDesk = await createNew(section)
                            array.push(newDesk);
                            container.dataset.index = array.length-1; 
                        };  
                    }
                    }
                )
                let folder = createFolder(getCurrentUser(),folderName,getCurrentDesk(),x,y);
                console.log("testing");
                container.addEventListener("contextmenu",async (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    await openOption(folder,section,label,container);

                })
                //Final linking the box created to current desk
                section.appendChild(container);
                addContentAndUpdate(folder);
                return folder;    
            }
        }catch{    
        }
    }
    else{
        passingInfo("You don t have permission boy", section);
    }
};



export function showContextMenu(x, y, section) {
    // This is for dumb users that can t stop right clicking everywhere
    const existingMenu = section.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    // Box creation for button .Starting to repeat myself. 
    // Almost thinking about building a function for creation of html object .JK
    let menu = document.createElement('div');
    menu.classList.add('context-menu');
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    
    // File creation button. Nothing fun here
    let button1 = document.createElement('button');
    button1.classList.add('context-menu-btn');
    button1.textContent = 'New File';
    button1.addEventListener('click', () => {      
        newFile(x, y, section);
        menu.remove(); // plz don t forget that line .... 
    });
    
    // Folder creation button. Still not fun                                              Getting late there you know
    let button2 = document.createElement('button');
    button2.classList.add('context-menu-btn'); // All these freaking css class currently going mad manipulated these.
    button2.textContent = 'New Folder';
    button2.addEventListener('click', () => {   
        newFolder(x,y,section);
        menu.remove(); // You really don t want to forget this one
    });
    
    // Linking the freaking buttons
    menu.appendChild(button1);
    menu.appendChild(button2);
    
    // Linking the freaking menu. Well actually it s quite tricky here.
    // Because it is a temporary menu you can easily forget to appenchild it.
    // Didn t happen to me obviously tho . certainly not lost an hour of my life consoleloggin everything on this.
    section.appendChild(menu);
    
    // Really need to investigate this part because it obviously works fine
    // But i don t fully understand why yet.
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}
