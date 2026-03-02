import { createBtn, createInput } from './DOMmanipJS/button.js';
import { createContainer} from './namePrompt.js';
import { findUserByUserName, updateUser } from './queriesDb/userQueries.js';
import { state } from './constJS/exportConst.js';
import { createColorPicker } from './DOMmanipJS/createContainerNStuff.js';
import { getAllItems, updateItem } from './queriesDb/itemQueries.js';
import { recreateDesk } from './desksJS/recreateDesk.js';
import { clearStateInStorage, loadState } from './manager.js';

/////////////////////CHANGE NAME CHECK FUNCTION ////////////////////
export function changeName(newName){ 
    return new Promise(async(resolve, reject) => { //promise for manual exit
        let existingUser = await findUserByUserName(newName);
        if (existingUser!=null){
            reject();
        }
        else{
            resolve(newName);
        }
    })
}

/////////////////////////////////////////////////////////
///////////////GLOBAL MANAGMENT DISPLAY////////////////
/////////////////////////////////////////////////////////
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


    //////////////////CHANGE COLOR SECTION /////////////////////////
    let colorBtn = createBtn(container,"Choose a new color");
    let colorContainer = createColorPicker(container,state.currentUser.userColor);
    colorBtn.addEventListener('click',async ()=>{
        let selectedColor = colorContainer.value;
        state.currentUser.userColor = selectedColor;
        await updateUser(state.currentUser); // always await queries
        let allItemCurrentUser = await getAllItems(state.currentUser.id);
        for (let item of allItemCurrentUser){ // await in loop need for
            item.creatorColor = state.currentUser.userColor;
            await updateItem(item);
        }
        cleanUp();
        clearStateInStorage();// really need to clean those up
        document.body.style.pointerEvents = 'none';
        await loadState(state.currentUser);
        await recreateDesk(state.currentDesk);
        setTimeout(() => { // time for user to actually see changes
            showUserSetting(section);
            document.body.style.pointerEvents = ''; // don t want stupid user start clicking everywhere while so
        },1200);
    });


    //////////////////USERNAME SECTION /////////////////////////
    createBtn(container,"subscribe to premium");


    //////////////////CHANGE PASSWORD/////////////////////////
    createBtn(container,"Change mail");


    //////////////////CHANGE MAIL /////////////////////////
    createBtn(container,"Change change password");


    //////////////////SUBSCRIBE TO PREMIUM/////////////////////////
    createBtn(container,"Change color");


    //////////////////CLOSE BTN /////////////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}
