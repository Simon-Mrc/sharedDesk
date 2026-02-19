// Will i need to import fs too ?
//
//
let array = [];
export async function initiate(section){
    // OMG First desk creation here
    let desk = document.createElement(`div`);
   
    // ok first thing written actually need to be removed lol
    // Terrible mental breakdown there
    let newPage = document.createElement(`button`);
    newPage.textContent = "createN";
    newPage.addEventListener("click",()=>{
        createNew(desk);
    })

    // Need to add listener for right click on every desk creation !
    desk.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const elementX = event.offsetX;
        const elementY = event.offsetY;
        showContextMenu(elementX,elementY,desk);
    });

    // this also need to be remove tho
    desk.appendChild(newPage);

    // First desk linking to main display. Called in main
    section.appendChild(desk);
    desk.classList.add(`desk-column-large`);

    // this await is to be sure that animations go smoothly despite loading speed
    await new Promise(resolve => requestAnimationFrame(resolve));
    await slideRight(desk);

    // Need to add header on every desk 
    // displayed or not it s gonna be usefull for json creation later.
    desk.id = "home";   
};


export async function createNew(section){
    // building the new desk here 
    let desk = document.createElement(`div`);
    desk.classList.add(`desk-column-large`);
    // this button need to be remove. Keeping it for testing RN
    let newPage = document.createElement(`button`);
    newPage.textContent = "createN";
    newPage.addEventListener("click",()=>{
        createNew(desk);
    })
    // button there is needed . Need to work on css tho
    let goBack = document.createElement(`button`);
    goBack.textContent = "Goback";
    goBack.addEventListener("click",async ()=>{
        await quiteSlideLeft(desk);
        desk.style.display = `none`;
        await slideRight(section);
    });
    
    // Each created desk need to have this addEvent add at creation
    // Allows right clicking to create files and folders
    desk.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const elementX = event.offsetX;
        const elementY = event.offsetY;
        showContextMenu(elementX,elementY,desk);
    });

    // Linking created function to new desk
    desk.appendChild(newPage);
    desk.appendChild(goBack);

    // making old disappear before linking new desk to main display
    // Fashion choice. Fashion matters
    await quiteSlideLeft(section);
    globalHome.appendChild(desk);
    await slideRight(desk);
    desk.id = section.id + "1";
    return desk;   
};

// All of functions under this are for animations purpose. Probably need some adjustement tho


export function resetClass(sectionName){
    if(sectionName.className != undefined){
        sectionName.className=``;
    }
}
export function slideLeft(element) {
    return new Promise((resolve) => {
        resetClass(element);      
        element.classList.add('section-exit');
        element.addEventListener('animationend', () => {
            // display : none is because of spawning probleme issues
            element.style.display = 'none';
            resolve();
      }, { once: true });
    });
}
export function quiteSlideLeft(element){
    return new Promise((resolve)=>{
        resetClass(element);
        element.classList.add(`section-exit-minimal`);
        element.addEventListener(`animationend`, ()=>{
            // ranged there is forcing section to only take little place
            element.classList.add(`ranged`);
            element.classList.remove(`section-exit-minimal`);
            if(element.classList.contains(`desk-column-large`)){
                element.classList.remove(`desk-column-large`);
            }
            resolve();
        }, {once : true})
    })
}
export function slideRight(element){
    resetClass(element);
    if(element.style.display==`none`){
        element.display=``;
    }
    return new Promise((resolve)=>{
        element.classList.add(`section-enter`);
        element.addEventListener(`animationend`, ()=>{
            // use is for forcing last one displayed to take 95% of container space 
            // Need to rearrange for other option than desks ?
            // Don t even want to think about it
            element.classList.add(`desk-column-large`);
            element.classList.remove(`section-enter`);
            resolve();
        }, {once : true})
    })
}

// Creation functions for files and folders 

export function newFile(x,y,section){
    // Used to force container to have right style properties to allow positionning on click
    if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
        section.style.position = 'relative';
    }
    section.style.overflow = 'hidden';
    
    // Box building for image and label
    let container = document.createElement('div');
    container.classList.add('icon');
    container.style.left = x + 'px';
    container.style.top = y + 'px';
    
    // Image getting taken here
    let img = document.createElement('img');
    img.src = "../pictures/file.png";
    
    // Label : need to add a prompt there
    let label = document.createElement('span');
    label.classList.add('icon-label');
    label.textContent = "labelText";
    
    // Attaching img and label to box container
    container.appendChild(img);
    container.appendChild(label);

    // Wtf s gonna happen if you double click a file ? Gettin rick rolled?
    // Just kiding thinking about download option !
    container.addEventListener("dblclick",()=>{
        
    })
    section.appendChild(container);
};

export async function newFolder(x,y,section){
    // Used to force container to have right style properties to allow positionning on click
    if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
        section.style.position = 'relative';
    }
    section.style.overflow = 'hidden';
   
    // Box for image and label
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
    label.textContent = "labelText";
    
    // Attached img and label to container wich is right-positionned
    container.appendChild(img);
    container.appendChild(label);

    // Need to work on this part. If already been double click you have to retrieve the right div and not create one
    // Probably give a dynamic id to desk and write it somewhere in container property to be able to retrieve it ?
    container.addEventListener("dblclick",async ()=>{
        if(container.dataset.index){
            await quiteSlideLeft(section);
            array[container.dataset.index].style.display=``;
            console.log(array);
            await slideRight(array[container.dataset.index]);
            console.log(array);
        }
        else{
            let newDesk = await createNew(section)
            array.push(newDesk);
            container.dataset.index = array.length-1; 
        };  
        }
    )
    //Final linking the box created to current desk
    section.appendChild(container);
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

