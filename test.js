// import { getCurrentDesk, updateCurrentDesk, updateCurrentDeskInDesks } from "./src/helperFunctions";

import { getCurrentDesk, updateCurrentDesk, updateCurrentDeskInDesks } from "./src/helperFunctions";

// // learned so usefull sht with this file tho
//  function searchIdandPushAndUpdate(currentDesk,objects,needStorage,targetID){
//     objects.forEach(object => {
//         if (object.id == targetID){
//             object.children.push(needStorage);
//             updateCurrentDesk(currentDesk);
//             updateCurrentDeskInDesks(currentDesk);
//             return;
//         }
//         if (object.type == "folder"){
//             searchIdandPushAndUpdate(object.children, needStorage,targetID);  
//         };
//     });
// }


///////////////DUPLICATE 2 TRY/////////////
let dupObject = {};
Object.assign(dupObject,JSON.parse(JSON.stringify(object)));
dupObject.id = Date.now();
dupObject.x = (dupObject.x+40);
dupObject.y = (dupObject.y+30);

function recursiveDup(items){
    items.forEach(item => {        
        if(item.type == "file"){
            item.id = `desk-${crypto.randomUUID()}`;
            item.x = (item.x+40) ;
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
if(!section.dataset.id){
    currentDeskContent.push(dupObject); 
} else {
    recursiveFindAndPush(currentDeskContent); 
}
updateCurrentDesk(currentDesk);
updateCurrentDeskInDesks(currentDesk);



if(dupObject.type == "folder"){
}





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