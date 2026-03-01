export function createBtnWithFunction(section,text,purpose){
    let btn = document.createElement('button');
    btn.classList.add('context-menu-btn');
    btn.innerText = text;
    btn.addEventListener('click',()=>{
        purpose();
    })
    section.appendChild(btn);
    return btn;
}

export function createBtn(section,text){
    let btn = document.createElement('button');
    btn.classList.add('context-menu-btn');
    btn.innerText = text;
    section.appendChild(btn);
    return btn;
}
