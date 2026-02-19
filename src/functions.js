
export async function initiate(section){
    let a = document.createElement(`div`);
    let newPage = document.createElement(`button`);
    newPage.textContent = "createN";
    newPage.addEventListener("click",()=>{
        createNew(a);
    })
    a.appendChild(newPage);
    section.appendChild(a);
    a.classList.add(`desk-column-large`);
    await new Promise(resolve => requestAnimationFrame(resolve));
    await slideRight(a);
    a.id = "home";   
};
export async function createNew(section){
    let a = document.createElement(`div`);
    a.classList.add(`desk-column-large`);
    let newPage = document.createElement(`button`);
    newPage.textContent = "createN";
    newPage.addEventListener("click",()=>{
        createNew(a);
    })
    let goBack = document.createElement(`button`);
    goBack.textContent = "Goback";
    goBack.addEventListener("click",async ()=>{
        await quiteSlideLeft(a);
        a.style.display = `none`;
        await slideRight(section);
    })
    a.appendChild(newPage);
    a.appendChild(goBack);
    await quiteSlideLeft(section);
    globalHome.appendChild(a);
    await slideRight(a);
    a.id = section.id + "1";   
};
function extendSide(){

};
function retractSide(){

};
function retractDisplay(chosenOne){

};
function showDisplay(chosenOne){

};
function hideDisplay(chosenOne){
    
};
// export function resetClass(sectionName){
//     sectionName.classList.remove("section-exit");
//     sectionName.classList.remove(`desk-column-large`);
//     sectionName.classList.remove("section-exit-minimal");
//     sectionName.classList.remove("section-enter");
//     sectionName.style.display = ``;
// };
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
            element.classList.add(`ranged`);
            element.classList.remove(`section-exit-minimal`);
            resolve();
        }, {once : true})
    })
}
export function slideRight(element){
    resetClass(element);
    return new Promise((resolve)=>{
        element.classList.add(`section-enter`);
        element.addEventListener(`animationend`, ()=>{
            element.classList.add(`desk-column-large`);
            element.classList.remove(`section-enter`);
            resolve();
        }, {once : true})
    })
}
