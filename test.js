export async function newFolder(x,y,section){
    if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
        section.style.position = 'relative';
    }
    section.style.overflow = 'hidden';
    a.src = "../pictures/file.png";
    a.classList.add("icon");
    a.style.left = x + 'px';
    a.style.top = y + 'px';
    a.addEventListener("doubleClick",async ()=>{
        if(a.classList.includes("exist")){
            await quiteSlideLeft(section);
            await slideRight(````````````);
        }
        else{
            createNew(section);
        };  
        }
    )
};



export function showContextMenu(x, y, section) {
    // Remove any existing context menu first
    const existingMenu = section.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    // Create menu container
    let menu = document.createElement('div');
    menu.classList.add('context-menu');
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    
    // Create button 1
    let button1 = document.createElement('button');
    button1.classList.add('context-menu-btn');
    button1.textContent = 'New File';
    button1.addEventListener('click', () => {      
        newFile(x, y, section);
        menu.remove();
    });
    
    // Create button 2
    let button2 = document.createElement('button');
    button2.classList.add('context-menu-btn');
    button2.textContent = 'New Folder';
    button2.addEventListener('click', () => {
       
        // Your folder creation code here
        menu.remove();
    });
    
    // Build structure
    menu.appendChild(button1);
    menu.appendChild(button2);
    
    // Add to section
    section.appendChild(menu);
    
    // Close menu when clicking anywhere else
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

// Usage in your main code:
// section.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//     showContextMenu(e.offsetX, e.offsetY, section);
// });