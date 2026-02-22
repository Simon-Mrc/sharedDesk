import { slideRight } from "./animations";
import { showContextMenu } from "./creationbundle";
import { getCurrentUser, getAllDesks, createDesk, updateDesks, addContentAndUpdate, createFile, getCurrentDesk, openOption, searchIdandPushAndUpdate } from "./helperFunctions";
import { textNeeded, passingInfo, showNamePrompt } from "./namePrompt";
import { displayTree } from "./tree";

export async function recreateDesk(recreatedDesk, deskContent){
    // Initialisation !
    let section = document.getElementById(`globalHome`);
        let nameChosen = desk.name 
        let desk = document.createElement(`div`);
        desk.addEventListener('contextmenu', function(event) {
            event.preventDefault(); 
            const elementX = event.offsetX;
            const elementY = event.offsetY;
            showContextMenu(elementX,elementY,desk);
        });            
        let deskid = desk.id;
        let currentDesk = createDesk(currentUser.id, nameChosen, deskid);
        section.appendChild(desk);
        desk.classList.add(`desk-column-large`);
            
        await new Promise(resolve => requestAnimationFrame(resolve));
        await slideRight(desk);
        localStorage.setItem("currentDesk", JSON.stringify(currentDesk)); 
     
    // RECURSIVE FUN PART STARTS HERE
    function recursiveDesk(recreatedDesk, deskContent){
        deskContent.forEach(content => {
            if(content.type == "file"){
                recreateByFile();
            }
            else if (content.children.length ==0){
                recreateByFolder();
                recreateSection();
            }
            else{
                recursiveDesk(desk ,content.children);
            }           
        });
    }
}

export function recreateByFile(createdFile){
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
export function recreateByFolder(){

}
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
    globalHome.appendChild(desk);
};
