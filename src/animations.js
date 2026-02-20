

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
