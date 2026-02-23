import { passingInfo, showNamePrompt, textNeeded } from './namePrompt.js';
import { createDesk, getAllDesks, getCurrentUser, getCurrentDesk, updateDesks,updateAllUsers,
addContentAndUpdate, createFolder, createFile, updateCurrentDesk, openOption, 
addScreenAndUpdate,
updateCurrentDeskInDesks} from './helperFunctions.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { initiate,createNew } from './functions.js';
import { searchIdandPushAndUpdate } from './helperFunctions.js';
import { displayTree } from './tree.js';
// Scope is a pain hopefully localstorage exist. Too lazy to change it to manage changes.
export let array = [];
export async function newFile(x,y,section){ //Actually async probably not needed there !    
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
                
                container.addEventListener("contextmenu",async(e)=>{
                    e.preventDefault(); // Prevent browser menu!
                    e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
                    await openOption(file,section,label,container);                    
                })

                // OMG if it works I AM A FREAKING GENIOUS. This is for saving file data into folder he s beeen created into !
                section.appendChild(container);
                let checkCondition=0; //Useless not deleting it tho What u gonna do about that              
                if(!section.dataset.id){// if section doesnt have dataset.id it means it doesn t came from a folder                  
                    addContentAndUpdate(file); // So it the main desk basically
                }
                // They have the same unique id (given to folder at creation and given to section)
                // via folder on creation 
                
                // gonna run a few test with this one . Spent 1 hour on this! My first recursive call
                // Learned a frking lot i love it ! very quite tricky tho
                // i have to match to witch folder it came from
                else{
                    let currentDesk = getCurrentDesk(); // Ok so this is recursive file datastorage function !
                    searchIdandPushAndUpdate(currentDesk,currentDesk.content,file,section.dataset.id)
                    }
                    displayTree();     
                return [container,label];    
                }         
            }catch (error){

            }
    }
    else{
        passingInfo("You don t have permission boy", section);//DENIED
    }
};

export async function newFolder(x,y,section){// many wait needed
    if(getCurrentDesk().modifyUserId.includes(getCurrentUser().id)){// do you have the right bro ?

        // Used to force container to have right style properties to allow positionning on click
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        // try{//obvioulsy awaiting there because you need data to follow script flow
            let folderName = await showNamePrompt(x,y,section,"folder");
            if (folderName){// in cas something went wrong in shownameprompt fuction
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
                let folder = createFolder(getCurrentUser(),folderName,getCurrentDesk(),x,y);
                        let newDesk = await createNew(section);// await needed there because i need result in later script
                        newDesk.dataset.id = folder.id; // starting from here actually 
                        addScreenAndUpdate({id : folder.id})
                        array.push(newDesk); // filling array with DOM Section identified by dataset and using index to display right section 
                        container.dataset.index = array.length-1;     
            
                // Need to work on this part. If already been double click you have to retrieve the right div and not create one
                // Probably give a dynamic id to desk and write it somewhere in container property to be able to retrieve it ?
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
                
                //Amazing to see that i can create folder element here. So beautiful
                // let folder = createFolder(getCurrentUser(),folderName,getCurrentDesk(),x,y);          
                container.addEventListener("contextmenu",/*async*/ (e)=>{
                    e.preventDefault(); // rightclicking interprated by computer
                    e.stopPropagation();// rightclicking interpretader elsewhere from container
                    /*await*/ openOption(folder,section,label,container); //async and await obviously not needed but i like the colours so considering keeping it
                })
                //Final linking the box created to current desk
                section.appendChild(container);
                if(!section.dataset.id){
                    addContentAndUpdate(folder);
                }
                else{
                    let currentDesk = getCurrentDesk();
                    searchIdandPushAndUpdate(currentDesk,currentDesk.content,folder,section.dataset.id)

                }
                displayTree()
                return folder; // Always return something right ! well obviously this one s gonna be usefull 
            }
        // }catch{ // Nice user experience
        // console.log('gonna fix it later. i ve got much more to do u know')}
    }
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
        menu.remove(); // plz don t forget that line .... 
    });
    
    // Folder creation button. Still not fun                                              Getting late there you know
    let button2 = document.createElement('button');
    button2.classList.add('context-menu-btn'); // All these freaking css class currently going mad manipulated these.
    button2.textContent = 'New Folder';
    button2.addEventListener('click', () => {   
        newFolder(x,y,section);// no await here because you want menu to be removed instantly
        menu.remove(); // You really don t want to forget this one
    });
    
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
    // Again nice user experience
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}
