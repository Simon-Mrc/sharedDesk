import { quiteSlideLeft, slideRight } from "./animations";
import { array, showContextMenu } from "./creationbundle";
import { createNew } from "./functions";
import { openOption, addScreenAndUpdate } from "./helperFunctions";
import { state } from "./main";
import { textNeeded, passingInfo } from "./namePrompt";
import { getAllItemFromDesk } from "./queriesDb/accessQueries";
import { displayTree } from "./tree";

// Ok so to explain here. I basically copy/paste my previous code for setting files
// when right clicking on screen BUT : I kept only what is data information
// kicked all promises from displayed form
// I keep everything that  is archistructure building 
// such as filling up arrays or giving index to sections 
// have fun reading     All comments about building creation are found in helpers functions
// OH YEAH MOST IMPORTANT i kept obviously all that is adding eventlistener so that the 
// recreated desk react as it is supposed to !
// just gonna leave my old comment after all it s easier to read 
export function recreateByFile(createdFile,section){
    if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        let container = document.createElement('div');
        container.classList.add('icon');
        container.style.position = 'absolute';
        container.style.left = createdFile.x + 'px';
        container.style.top = createdFile.y + 'px';
        
        // Image getting taken here
        let img = document.createElement('img');
        img.src = "../pictures/file.png";
        
        // Label : need to add a prompt there
        let label = document.createElement('span');
        label.classList.add('icon-label');
        label.textContent = createdFile.name;
        
        // Attaching img and label to box container
        container.appendChild(img);
        container.appendChild(label);
        
        // Wtf s gonna happen if you double click a file ? Gettin rick rolled?
        // Just kiding thinking about download option !
        container.addEventListener("dblclick",()=>{
            
        })
        let file = createdFile;
        container.id = file.id;  
        container.style.boxShadow = `0 8px 20px ${file.creatorColor}`
        
        container.addEventListener("contextmenu",async(e)=>{
            e.preventDefault(); // Prevent browser menu!
            e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
            await openOption(file,section,label,container);                    
        })

                // OMG if it works I AM A FREAKING GENIOUS. This is for saving file data into folder he s beeen created into !
    section.appendChild(container);         
}

export async function recreateByFolder(createdFolder,section){
        // Used to force container to have right style properties to allow positionning on click
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        // try{//obvioulsy awaiting there because you need data to follow script flow
        
        let container = document.createElement('div');
        container.classList.add('icon');
        container.style.left = createdFolder.x + 'px';
        container.style.top = createdFolder.y + 'px';
        container.style.position = 'absolute';
        
        // Image for file 
        let img = document.createElement('img');
        img.src = "../pictures/folder.jpg";
        
        // Label thats gonna be displayed need to work on it
        let label = document.createElement('span');
        label.classList.add('icon-label');
        label.textContent = createdFolder.name;
        
        // Attached img and label to container wich is right-positionned
        container.appendChild(img);
        container.appendChild(label);
        let folder = createdFolder;
        let newDesk = await createNew(section);// await needed there because i need result in later script
        newDesk.dataset.id = folder.id; // starting from here actually 
        array.push(newDesk);
        container.dataset.index = array.length-1;  
        container.id = folder.id;     
        container.style.boxShadow = `0 8px 20px ${folder.creatorColor}`
             
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
        

        container.addEventListener("contextmenu",/*async*/ (e)=>{
            e.preventDefault(); // rightclicking interprated by computer
            e.stopPropagation();// rightclicking interpretader elsewhere from container
  /*await*/ openOption(folder,section,label,container); //async and await obviously not needed but i like the colours so considering keeping it
        })
//Final linking the box created to current desk
    section.appendChild(container);


    await displayTree()
return newDesk;// funny things i commented this because this return new desk solo handle recursive recreation
}
// Always return something right ! well obviously this one s gonna be usefull 

export async function recreateDesk(deskGiven){
    // Initialisation !
    let desk = document.getElementById(`globalHome`);
    let section = document.createElement(`div`); // need to set up first state as this one doesn' t have dataset.id
    // Initiate ? need to store it somewhere ? for navigation purpose ?
        section.addEventListener('contextmenu', function(event) {
            event.preventDefault(); 
            const elementX = event.offsetX;
            const elementY = event.offsetY;
            showContextMenu(elementX,elementY,section);
        });            
        desk.appendChild(section);
        section.classList.add(`desk-column-large`);
            
        await new Promise(resolve => requestAnimationFrame(resolve));
        await slideRight(desk); // keeping it for loading first page of new environment.
        state.currentDesk = deskGiven; // Set up current desk as you recreate it
     
    // RECURSIVE FUN PART STARTS HERE 
    // all that pain copy/paste and choosing what to keep to finally use brain !
    async function recursiveDesk(deskContent, section){
        let sectionId = section.dataset.id || null;
        let allItem = deskContent.filter(item => 
            String(sectionId) == String(item.parentId));
        
        for(let item of allItem){ // cant await in foreach
            if(item.type == "file"){
                recreateByFile(item , section);
            }
            else{
                let newSection = await recreateByFolder(item ,section);
                await recursiveDesk(deskContent,newSection);
            }
        }
    }
    let deskContent = await getAllItemFromDesk(deskGiven.id); 
// and thats it ! calling the function and we re good to go !
    await recursiveDesk(deskContent, section); 
}
