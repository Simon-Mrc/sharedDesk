import { passingInfo, showNamePrompt, textNeeded } from './namePrompt.js';
import { openOption} from './helperFunctions.js';
import { quiteSlideLeft,slideRight } from './animations.js';
import { createNew } from './functions.js';
import { displayTree } from './tree.js';
import { checkAccess } from './queriesDb/accessQueries.js';
import { createItem } from './queriesDb/itemQueries.js';
import { state } from './main.js';

// This array is gonna fill up with section as DOM element 
// it s used to search and find right section to display 
// the dataset.id of the section = id of folder it s coming from
// the container(DOM object representing folder object) s'id = folders'id
// and container.dataset.index = place in array 
// so when you double click on a folder, it checks its datasetindex, and load DOM element in the right position of array. 
export let array = [];

////////////////////////////////////////////////////////////////
////////////////////////// FILE CREATION HERE /////////////////
/////////////////////////////////////////////////////////////////

export async function newFile(x,y,section){  // x,y is where you click, section is where you are now in DOM  
    let access = await checkAccess(state.currentUser.id,state.currentDesk.id); // Asking db : deskAccess the accesstype of user
    if(access?.accessType == "modify" || access?.accessType == "admin"){ // the question mark is optionnal chaining
        // Prevents crash if access.accessType is NULL ou undefined ! Very usefull !
                                //////////////STYLE POSITIONING////////////////
        // Used to force container to have right style properties to allow positionning on click
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        ////////////////////////STARTING PROMPT FOR INFOS //////////////////
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
                img.src = "/pictures/file.png";
                
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
                    ///////////NEED TO BE FILLED !!! //////////////
                })
                let file = await createItem({ // Full object not just parameters !
                    id: crypto.randomUUID(), // in case of 2 items created to quickly (in recreation)
                    deskId: state.currentDesk.id, // so to be consistent i put the same process everywhere
                    name: labelName,
                    type: "file",
                    x: x,
                    y: y,
                    createdBy: state.currentUser.id, 
                    creatorColor : state.currentUser.userColor,
                    parentId: section.dataset.id || null // null if you create it on first displayed section 
                }); // first section doesn t have dataset because it s not coming from a folder.
                
                container.id = file.id;
                container.style.boxShadow = `0 8px 20px ${state.currentUser.userColor}`
                container.addEventListener("contextmenu",async(e)=>{
                    e.preventDefault(); // Prevent browser menu!
                    e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
                    await openOption(file,section,label,container);                    
                })

                section.appendChild(container);
                await displayTree();     
                return [container,label];    
                }         
            }
            catch (error){
                console.log(error);
            }
    }
    else{
        passingInfo("You don t have permission boy", section); //DENIED : accessType from db must be 'read'
    }
};
 //////////////////////////////////////////////////////////////////////:
 ////////////////////////FOLDER S CREATION SECTION/////////////////////
 ////////////////almost same as file i ll just comment changes//////// 
 ////////////////////////////////////////////////////////////////////

export async function newFolder(x,y,section){
    let access = await checkAccess(state.currentUser.id,state.currentDesk.id);
        if(access?.accessType == "modify" || access?.accessType == "admin"){

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
                
                // Image for folder (commenting on changes as i said =D) 
                let img = document.createElement('img');
                img.src = "/pictures/folder.jpg";
                
                // Label thats gonna be displayed need to work on it
                let label = document.createElement('span');
                label.classList.add('icon-label');
                label.textContent = folderName;
                
                // Attached img and label to container wich is right-positionned
                container.appendChild(img);
                container.appendChild(label);
                let folder = await createItem({ 
                    id: crypto.randomUUID(),
                    deskId: state.currentDesk.id,
                    name: folderName,
                    type: "folder", //big change here . 
                    x: x,
                    y: y,
                    createdBy: state.currentUser.id, // ← id not userName! (note to myself ! keeping it tho)
                    creatorColor : state.currentUser.userColor,
                    parentId: section.dataset.id || null
                });
              ///////////////////////CREATION OF SECTION "INSIDE" THE CREATED FOLDER ////////////////////

                let newDesk = await createNew(section); // this just create the DOM element, appenchild to globalhome and put event listener on it
                newDesk.dataset.id = folder.id; // so dataset of section = folderId from witch it s coming  
                array.push(newDesk); // filling array with DOM Section identified by dataset and using index to display right section 
                container.dataset.index = array.length-1;    // Container.dataset.id is linked to DOM array to find wich section to display
                container.id = folder.id;  // Container.id is important there for recreate desk from scratch
                container.style.boxShadow = `0 8px 20px ${state.currentUser.userColor}`
            
                container.addEventListener("dblclick",async ()=>{
                    let securityCheck = 0;
                if (folder.accessPassword){ 
                        let pswrd = await textNeeded('what is the password?','Try to guess buddy',section);
                        if(pswrd === folder.accessPassword){
                            passingInfo('u re in my man',section); // need to solve some issues with box stayin on screen still not solved tho
                        }                                        // to lazy to create a specific display function just for this
                        else{
                            passingInfo('u re out buddy',section);
                            securityCheck = 1; // security check is locked in 
                        }
                    }
                    
                    if(securityCheck === 0){// U can come in my man ! Just choosin what i ll display you there
                    // ARRAY using there !
                        if(container.dataset.index){ // i stored dataset in container representing folder
                            await quiteSlideLeft(section);// then i just linked it to a specific index in DOM array
                            array[container.dataset.index].style.display=``; // Big brain thinking there
                            await slideRight(array[container.dataset.index]); // Await everywhere for smooth animations
                        }                       
                    }
                    
                })
                      
                container.addEventListener("contextmenu",(e)=>{
                    e.preventDefault(); // rightclicking interprated by computer
                    e.stopPropagation();// rightclicking interpretader elsewhere from container
                    openOption(folder,section,label,container);
                })
                //Final linking the box created to current desk
                section.appendChild(container);
                await displayTree()
                return folder; // Always return something right ! well obviously this one s gonna be usefull 
            }
        
    }catch (error){
        console.log(error);
    }}
    else{
        passingInfo("You don t have permission boy", section); //DENIED
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
        newFile(x, y, section); // no await here because you want menu to be removed instantly
        menu.remove();  
    });
    
    // Folder creation button. Still not fun                                              Getting late there you know
    let button2 = document.createElement('button');
    button2.classList.add('context-menu-btn'); // All these freaking css class currently going mad manipulated these.
    button2.textContent = 'New Folder';
    button2.addEventListener('click', () => {   
        newFolder(x,y,section);// no await here because you want menu to be removed instantly
        menu.remove();     });
    
    // Linking the freaking buttons
    menu.appendChild(button1);
    menu.appendChild(button2);
    
    // Linking the freaking menu. Well actually it s quite tricky here.
    // Because it is a temporary menu you can easily forget to appenchild it.
    // Didn t happen to me obviously tho . certainly not lost an hour of my life consoleloggin everything on this.
    section.appendChild(menu);
    
    // SOOOO follow script flow. if i don t put this at the end script will interpret
    // my click simultanously with content appearing. So disapear immediatly
    // that s why you set timeout. 0 means script will take effect at the next 
    // event (in our case clicking)
      setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}
