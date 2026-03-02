import { createBtn } from "./DOMmanipJS/button.js";


export function showNamePrompt(x, y, section, type = "file") { // Ok lets go put comment on this !
    return new Promise((resolve, reject) => { // you want to be able to w8 for it
        // and you want the script to pause until resolve fullfills
        const existingPrompt = section.querySelector('.name-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        } // Weird case where one exists already. Security mostly doesn t hurt to check

        let prompt = document.createElement('div');
        prompt.classList.add('name-prompt');
        prompt.style.left = x + 'px';
        prompt.style.top = y + 'px'; // Slightly off for user experience

        let title = document.createElement('div');
        title.classList.add('prompt-title'); // Nice emoji right ?
        title.textContent = type === "file" ? "📄 New File" : "📁 New Folder";
        
        let input = document.createElement('input');
        input.classList.add('prompt-input');
        input.type = 'text';
        input.placeholder = type === "file" ? "Enter file name..." : "Enter folder name...";
        input.maxLength = 50;
        
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('prompt-buttons');
        
        let createBtn = document.createElement('button');
        createBtn.classList.add('prompt-btn', 'prompt-btn-create');
        createBtn.textContent = 'Create';
        
        let cancelBtn = document.createElement('button');
        cancelBtn.classList.add('prompt-btn', 'prompt-btn-cancel');
        cancelBtn.textContent = 'Cancel';
        
        buttonContainer.appendChild(createBtn);
        buttonContainer.appendChild(cancelBtn);
        
        prompt.appendChild(title);
        prompt.appendChild(input);
        prompt.appendChild(buttonContainer);
        
        section.appendChild(prompt);
        input.focus();
        
        createBtn.addEventListener('click', () => {
            let name = input.value.trim();
            if (name) {
                prompt.remove();//plz
                resolve(name); //promise remember ??
            } else {
                input.classList.add('prompt-input-error');
                setTimeout(() => input.classList.remove('prompt-input-error'), 500);//design purpose
            }
        });
        
        // Cancel button handler - use reject()
        cancelBtn.addEventListener('click', () => {
            prompt.remove();
            reject('cancelled'); // ← Added reject
        });
        
        // U can press enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                createBtn.click(); //addEventListener triggers here !
            }
        });
        
        // u can press escape
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                prompt.remove();
                reject('cancelled'); //promise remember ?
            }
        });
        
        // Same sht next time an event occurs this will take effect. User experience QL
        setTimeout(() => {
            document.addEventListener('click', function closePrompt(e) {
                if (!prompt.contains(e.target)) {
                    prompt.remove();
                    reject('cancelled'); // ← Added reject
                    document.removeEventListener('click', closePrompt);
                }
            });
        }, 0);//0 set the time it ll take place. 1000 = 1s; 2000=2s ; 0 = .... next event here is the click
    });
}

export function textNeeded(question,placeholder,section){  //almost same sht here not gonna comment sorry ! 
return new Promise((resolve, reject) => {
    const existingPrompt = section.querySelector('.name-prompt');
    if (existingPrompt) {
        existingPrompt.remove();
    }

    let prompt = document.createElement('div');
    prompt.classList.add('name-prompt');
    prompt.style.left = '50%';
    prompt.style.top = '50%';
    prompt.style.transform = 'translate(-50%, -50%)';

    let title = document.createElement('div');
    title.classList.add('prompt-title');
    title.textContent = question;
    
    let input = document.createElement('input');
    input.classList.add('prompt-input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.maxLength = 50;
    
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('prompt-buttons');
    
    let createBtn = document.createElement('button');
    createBtn.classList.add('prompt-btn', 'prompt-btn-create');
    createBtn.textContent = 'Create';
    
    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('prompt-btn', 'prompt-btn-cancel');
    cancelBtn.textContent = 'Cancel';
    
    buttonContainer.appendChild(createBtn);
    buttonContainer.appendChild(cancelBtn);
    
    prompt.appendChild(title);
    prompt.appendChild(input);
    prompt.appendChild(buttonContainer);
    
    section.appendChild(prompt);
    input.focus();
    
    createBtn.addEventListener('click', () => {
        let name = input.value.trim();
        if (name) {
            prompt.remove();
            resolve(name); 
        } else {
            input.classList.add('prompt-input-error');
            setTimeout(() => input.classList.remove('prompt-input-error'), 500);
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        prompt.remove();
        reject('cancelled'); 
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            createBtn.click();
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            prompt.remove();
            reject('cancelled'); 
        }
    });
    
    setTimeout(() => {
        document.addEventListener('click', function closePrompt(e) {
            if (!prompt.contains(e.target)) {
                prompt.remove();
                reject('cancelled'); 
                document.removeEventListener('click', closePrompt);
            }
        });
    }, 0);
});
}
    // End of copy/past hell and typos searching nightmare!

    export function acceptOrDenied(question,section,accept,denied){  // Getting better at giving name
        return new Promise((resolve, reject) => {// setting promise with callback so i can choose beetween 2 functions depending
            const existingPrompt = section.querySelector('.name-prompt');// depending on result !
            if (existingPrompt) {
                existingPrompt.remove();
            }
        
            let prompt = document.createElement('div');
            prompt.classList.add('name-prompt');
            prompt.style.left = '50%';
            prompt.style.top = '50%';
            prompt.style.transform = 'translate(-50%, -50%)';
        
            let title = document.createElement('div');
            title.classList.add('prompt-title');
            title.textContent = question;
            
            let buttonContainer = document.createElement('div');
            buttonContainer.classList.add('prompt-buttons');
            
            let createBtn = document.createElement('button');
            createBtn.classList.add('prompt-btn', 'prompt-btn-create');
            createBtn.textContent = 'got it';
            
            let cancelBtn = document.createElement('button');
            cancelBtn.classList.add('prompt-btn', 'prompt-btn-cancel');
            cancelBtn.textContent = 'wanna get RickRolled?';
            
            buttonContainer.appendChild(createBtn);
            buttonContainer.appendChild(cancelBtn);
            
            prompt.appendChild(title);
            prompt.appendChild(buttonContainer);
            
            section.appendChild(prompt);
    
            createBtn.addEventListener('click', () => {
                prompt.remove();
                    resolve(accept()); 
                } );
                
                cancelBtn.addEventListener('click', () => {
                    prompt.remove();
                    reject(denied()); 
                    } );
    
            document.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    createBtn.click();
                    prompt.remove();
                }
            },{once : true});
                 
            setTimeout(() => {
                document.addEventListener('click', function closePrompt(e) {
                    if (!prompt.contains(e.target)) {
                        prompt.remove();
                        reject(denied()); 
                        document.removeEventListener('click', closePrompt);
                    }
                });
            }, 0);
        });
        }

export function createContainer(section){ // finally made a dom creator function 
    let container = document.createElement('div');
    container.classList.add('container');
    let blurEffect = document.createElement('div');
    blurEffect.classList.add('modal-overlay');
    document.querySelector('body').appendChild(blurEffect);
    section.appendChild(container);
    function cleanUp(){
        container.remove();
        blurEffect.remove();
    }
    return {container,blurEffect,cleanUp}
}

export function quickMessage(text){
    return new Promise((resolve) => { // promise here is crucial for letting await possible for caller   
        let wrapper = document.createElement('div'); // either you wait for her or you let script flows
        wrapper.classList.add('quickMessageWrapper');
        document.body.appendChild(wrapper);
        let messageContainer = document.createElement('div');
        messageContainer.classList.add('quickMessageContainer');
        wrapper.appendChild(messageContainer);
        let message = document.createElement('p');
        message.classList.add('quickMessage');
        message.innerText = text;
        messageContainer.appendChild(message);
        document.body.style.pointerEvents = 'none';
        setTimeout(()=>{
            document.body.style.pointerEvents = '';
            wrapper.remove();
            resolve(); //So satisfying !
        },3000)
    })
}

export function yesOrNoPrompt(section,btn1text,btn2text,function1,function2){
    return new Promise((resolve) => {
        let {container,cleanUp} = createContainer(section);
        container.style.zIndex = 1001;
        let btn1 = createBtn(container,btn1text);
        let btn2 = createBtn(container,btn2text);
        btn1.addEventListener('click',()=>{
            cleanUp();
            function1();
            resolve();
        })
        btn2.addEventListener('click',()=>{
            cleanUp();
            function2();
            resolve();
        })
    })
}


export function yesOrNoPromptWithText(section,text,btn1text,btn2text,function1,function2){
    return new Promise((resolve) => {
        let {container,cleanUp} = createContainer(section);
        container.style.zIndex = 1001;
        let divContainer = document.createElement('div');
        divContainer.classList.add('divYesOrNo');
        let p = document.createElement('p');
        p.innerText = text;
        divContainer.appendChild(p);
        container.appendChild(divContainer);
        let btn1 = createBtn(container,btn1text);
        let btn2 = createBtn(container,btn2text);
        btn1.addEventListener('click',()=>{
            cleanUp();
            function1();
            resolve();
        })
        btn2.addEventListener('click',()=>{
            cleanUp();
            function2();
            resolve();
        })
    })
}