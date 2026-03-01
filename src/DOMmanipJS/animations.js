
// Honestly this was so painfull to set up so it displays nicely
// Manipulating css class with awefull !important everywhere. Don t go look that up plz
export function resetClass(sectionName){ //speak for itself tho
    if(sectionName.className != undefined){
        sectionName.className=``;
    }
}
export function slideLeft(element) {
    return new Promise((resolve) => {// want to be able to wait for resolve when called
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
    return new Promise((resolve)=>{ //so i ll be able to await for it to end. that s why promise is needed
        element.classList.add(`section-enter`);
        element.addEventListener(`animationend`, ()=>{
            // use is for forcing last one displayed to take 95% of container space 
            // Need to rearrange for other option than desks ?
            // Don t even want to think about it
            element.classList.add(`desk-column-large`);
            element.classList.remove(`section-enter`);
            resolve();
        }, {once : true}) // if i don t put this my element would keep eventlistener on animationend
    })
}
