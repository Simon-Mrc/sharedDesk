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

export function passingInfo(question,section){  // Getting better at giving name
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
                resolve(); 
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
                    reject('cancelled'); 
                    document.removeEventListener('click', closePrompt);
                }
            });
        }, 0);
    });
    }

    // End of copy/past hell and typos searching nightmare!