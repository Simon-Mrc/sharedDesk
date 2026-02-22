import { quiteSlideLeft, slideRight } from "./animations";
import { array, showContextMenu } from "./creationbundle";
import { createNew } from "./functions";
import { getCurrentUser, getAllDesks, createDesk, updateDesks, addContentAndUpdate, createFile, getCurrentDesk, openOption, searchIdandPushAndUpdate, addScreenAndUpdate, createFolder } from "./helperFunctions";
import { textNeeded, passingInfo, showNamePrompt } from "./namePrompt";
import { displayTree } from "./tree";

export async function recreateDesk(deskGiven){
    // Initialisation !
    let desk = document.getElementById(`globalHome`);
    let section = document.createElement(`div`);
    // Initiate ? need to store it somewhere ? for navigation purpose ?
        section.addEventListener('contextmenu', function(event) {
            event.preventDefault(); 
            const elementX = event.offsetX;
            const elementY = event.offsetY;
            showContextMenu(elementX,elementY,desk);
        });            
        desk.appendChild(section);
        section.classList.add(`desk-column-large`);
            
        await new Promise(resolve => requestAnimationFrame(resolve));
        await slideRight(desk);
        localStorage.setItem("currentDesk", JSON.stringify(deskGiven)); 
     
    // RECURSIVE FUN PART STARTS HERE
    async function recursiveDesk(deskContent, section){
        for(let content of deskContent){
            if(content.type == "file"){
                recreateByFile(content, section);  
            }
            else if(content.type == "folder"){
                let newSectionBis =  await recreateByFolder(content, section);  
                if(content.children.length > 0){
                    let newSection = newSectionBis;
                    await recursiveDesk(content.children, newSection); 
                }
            }
        }
    }
    let deskContent = deskGiven.content;
    await recursiveDesk(deskContent, section); 
}

export function recreateByFile(createdFile,section){
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        // Box building for image and label
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
    addScreenAndUpdate({id : folder.id})
    array.push(newDesk);
    container.dataset.index = array.length-1;     

    
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
                        // else{
                        //     let newDesk = await createNew(section);// await needed there because i need result in later script
                        //     newDesk.dataset.id = folder.id; // starting from here actually 
                        //     addScreenAndUpdate({id : folder.id})
                        //     array.push(newDesk);
                        //     container.dataset.index = array.length-1; 
                        // };  
        }
    }
         )
                //Amazing to see that i can create folder element here. So beautiful
                // let folder = createFolder(getCurrentUser(),folderName,getCurrentDesk(),x,y);          
        container.addEventListener("contextmenu",/*async*/ (e)=>{
            e.preventDefault(); // rightclicking interprated by computer
            e.stopPropagation();// rightclicking interpretader elsewhere from container
  /*await*/ openOption(folder,section,label,container); //async and await obviously not needed but i like the colours so considering keeping it
            })
                //Final linking the box created to current desk
            section.appendChild(container);

                
            displayTree()
            return newDesk;
            // Always return something right ! well obviously this one s gonna be usefull 
}
        // }catch{ // Nice user experience
        // console.log('gonna fix it later. i ve got much more to do u know')}


export async function recreateSection(section){
    let desk = document.createElement(`div`);
    desk.classList.add(`desk-column-large`);
    let goBack = document.createElement('button');
    goBack.classList.add('back-button');
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
    desk.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const elementX = event.offsetX;
        const elementY = event.offsetY;
        showContextMenu(elementX,elementY,desk);
    });
    desk.appendChild(goBack);
    desk.style.display = 'none';
    section.appendChild(desk);
return desk;
};
