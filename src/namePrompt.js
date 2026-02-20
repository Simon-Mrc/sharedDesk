export function showNamePrompt(x, y, section, type = "file") {
    // Remove the 'callback' parameter and return a Promise instead
    return new Promise((resolve, reject) => {
        const existingPrompt = section.querySelector('.name-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        }

        let prompt = document.createElement('div');
        prompt.classList.add('name-prompt');
        prompt.style.left = x + 'px';
        prompt.style.top = y + 'px';

        let title = document.createElement('div');
        title.classList.add('prompt-title');
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
        
        // Create button handler - use resolve() instead of callback()
        createBtn.addEventListener('click', () => {
            let name = input.value.trim();
            if (name) {
                prompt.remove();
                resolve(name); // ← Changed from callback(name)
            } else {
                input.classList.add('prompt-input-error');
                setTimeout(() => input.classList.remove('prompt-input-error'), 500);
            }
        });
        
        // Cancel button handler - use reject()
        cancelBtn.addEventListener('click', () => {
            prompt.remove();
            reject('cancelled'); // ← Added reject
        });
        
        // Enter key handler
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                createBtn.click();
            }
        });
        
        // Escape key handler
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                prompt.remove();
                reject('cancelled'); // ← Added reject
            }
        });
        
        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closePrompt(e) {
                if (!prompt.contains(e.target)) {
                    prompt.remove();
                    reject('cancelled'); // ← Added reject
                    document.removeEventListener('click', closePrompt);
                }
            });
        }, 0);
    });
}

export function textNeeded(question,placeholder,section){  
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
    
    // Create button handler - use resolve() instead of callback()
    createBtn.addEventListener('click', () => {
        let name = input.value.trim();
        if (name) {
            prompt.remove();
            resolve(name); // ← Changed from callback(name)
        } else {
            input.classList.add('prompt-input-error');
            setTimeout(() => input.classList.remove('prompt-input-error'), 500);
        }
    });
    
    // Cancel button handler - use reject()
    cancelBtn.addEventListener('click', () => {
        prompt.remove();
        reject('cancelled'); // ← Added reject
    });
    
    // Enter key handler
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            createBtn.click();
        }
    });
    
    // Escape key handler
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            prompt.remove();
            reject('cancelled'); // ← Added reject
        }
    });
    
    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closePrompt(e) {
            if (!prompt.contains(e.target)) {
                prompt.remove();
                reject('cancelled'); // ← Added reject
                document.removeEventListener('click', closePrompt);
            }
        });
    }, 0);
});
}