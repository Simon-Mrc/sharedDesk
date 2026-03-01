import { createBtn, createInput } from "./button";
import { createContainer, passingInfo } from "./namePrompt";
import { findUserByUserName, updateUser } from "./queriesDb/userQueries";
import { state } from './importConst.js';

export function changeName(newName){
    return new Promise(async(resolve, reject) => {
        let existingUser = await findUserByUserName(newName);
        if (existingUser!=null){
            reject();
        }
        else{
            resolve(newName);
        }
    })
}

export async function showUserSetting(section){
    ////////////////CREATE CONTAINER ///////////////////
    let {container,cleanUp} = createContainer(section);
    
    //////////////////NAME SECTION /////////////////////////
    let nameBtn = createBtn(container,"Change name");
    let inputName = createInput(container,'Nothing offensive plz')
    nameBtn.addEventListener('click',async ()=>{
        try{ 
            let newName = await changeName(inputName.value);       
            state.currentUser.userName = newName;
            updateUser(state.currentUser); 
            return(state.currentUser);
        }catch{
            inputName.classList.add('container-input-error');
            inputName.style.color = "red";
            setTimeout(() => {
                inputName.style.color = "";
                inputName.value = "";
                inputName.placeholder = "UserName already taken";
                inputName.classList.remove('container-input-error');
            },1500);
        }       
    })


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change Username");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"subscribe to premium");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change mail");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change change password");


    //////////////////NAME SECTION /////////////////////////
    createBtn(container,"Change color");


    //////////////////CLOSE BTN /////////////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}

export function showDeskMenu(desk){

}