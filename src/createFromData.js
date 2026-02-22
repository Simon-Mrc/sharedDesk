import { getCurrentDesk, getCurrentUser, openOption } from "./helperFunctions";

export function createFileandContainerFromData(object,section){
    let currentUser = getCurrentUser();
    let currentDesk = getCurrentDesk();
    let dupFile = createFile(currentUser,object.name,currentDesk,object.x,object.y);
    dupFile.accessUserId = object.accessUserId;
    dupFile.modifyUserId = object.modifyUserId;
    // got to add the other char there but first i ll try to see if my function works


    let container = document.createElement('div');
    container.classList.add('icon');
    container.style.left = object.x + 'px';
    container.style.top = object.y + 'px';
    let img = document.createElement('img');
    img.src = "../pictures/file.png";
    let label = document.createElement('span');
    label.classList.add('icon-label');
    label.textContent = object.name;
    container.appendChild(img);
    container.appendChild(label);
    container.addEventListener("dblclick",()=>{

    });
    container.addEventListener("contextmenu",async(e)=>{
        e.preventDefault(); // Prevent browser menu!
        e.stopPropagation();// Prevent interpretation of addevent listeners to current displayed screen.
        await openOption(file,section,label,container);                    
    })
    section.appendChild(container);

}