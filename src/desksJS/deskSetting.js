import { globalHome , state} from "../constJS/exportConst";
import { createBtn,createBtnWithFunction } from "../DOMmanipJS/button";
import { loadState } from "../manager";
import { chooseBetween, createContainer, quickMessage, yesOrNoPromptWithText } from "../namePrompt";
import { addUserToDesk, changePermission, checkAccess, getAllUserFromDesk, removeUserFromDesk } from "../queriesDb/accessQueries";
import { selectUser } from "../queriesDb/userQueries";
import { killDeskDb } from "../queriesDb/deskQueries";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////// DESKS FUNCTIONS ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////CHOOSE A FRIEND TO ADD TO YOUR DESK ///////////////////////////////////////
export function displayFriendForDesk(desk){
  return new Promise(async(resolve, reject) => {
    const {container,cleanUp} = createContainer(globalHome);
    try{
        let allFriend = JSON.parse(state.currentUser.friendList);
        let friendsInDesk = await getAllUserFromDesk(desk.id);
        for(let i = 0 ; i < allFriend.length ; i = i + 1){
          let targetFriend = await selectUser(allFriend[i]);       
          if(!JSON.stringify(friendsInDesk).includes(targetFriend.id)){
            let btn = createBtnWithFunction(container,targetFriend.userName,
              async ()=>{
                  container.style.display = 'none';
                    await yesOrNoPromptWithText(globalHome,`invite ${targetFriend.userName}`, 'Let Her In ! ',`HOLDTHEDOOR`,
                      async ()=>{
                        await addUserToDesk(targetFriend.id,desk.id);
                        container.style.display = '';
                        resolve();
                      },
                      ()=> {container.style.display = '';return}
                    )
                }
            )
            btn.style.boxShadow = `0 8px 20px ${targetFriend.userColor}`;
        }
          }
        let closeBtn = createBtn(container,"Close Menu");
        closeBtn.addEventListener('click',()=>{
            cleanUp();
            resolve();
        })
      }catch{
        quickMessage('you have no friend you lonely fck');
        cleanUp();
        resolve();
      }
    
  })
}


////////////////////////////CHANGE PERMISSION OF FRIEND /////////////////////////////
export function changeFriendPermission(desk){
  return new Promise(async(resolve, reject) => {
    
    const {container , cleanUp} = createContainer(globalHome);
    try{
      let allCurrentUser = await getAllUserFromDesk(desk.id);
      for(let i = 0 ; i < allCurrentUser.length ; i = i + 1){
  
        if(allCurrentUser[i].userId != state.currentUser.id){
          let targetFriend = await selectUser(allCurrentUser[i].userId)
          let text = ['Give admin','GIve read','Give modify'];
          let options = [
          async ()=>await changePermission('admin',allCurrentUser[i].userId,desk.id), // need to take care of this
          async ()=>await changePermission('read',allCurrentUser[i].userId,desk.id),
          async ()=>await changePermission('modify',allCurrentUser[i].userId,desk.id)
          ];
          console.log(options);
          let btn = createBtn(container,targetFriend.userName);
          btn.addEventListener('click',async ()=>{
            let choice = await chooseBetween(text,options);
            await quickMessage(`I just ${choice} rights to ${targetFriend.userName}`);
          })
          btn.style.boxShadow = `0 8px 20px ${targetFriend.userColor}`;
        }   
      }
    }catch{
        await quickMessage('it seems you re not up to the task!');
        resolve();
      }
      let closeBtn = createBtn(container,"Close Menu");
      closeBtn.addEventListener('click',()=>{
          cleanUp();
          resolve();
      })
  })
}

////////////////////////////CHANGE PERMISSION OF FRIEND /////////////////////////////
export function quitDesk(desk){
  return new Promise(async(resolve)=>{
    let response =await  yesOrNoPromptWithText(globalHome,'U sure you want to leave',"PrettySure","NotQuiteTho",
      async ()=>{await removeUserFromDesk(desk.id,state.currentUser.id); resolve()},
      ()=>resolve()
  )})
}

////////////////////////////KILL DESK AND ALL THING IN IT ! /////////////////////////////
export function killDesk(desk){
  return new Promise(async(resolve) => {
    await yesOrNoPromptWithText(globalHome,"You are about to kill/delete that desk, all items will be lost and so is hope",
      "LET S DO IT", "well if you say it like that ...",
      ()=>{console.log('test3');killDeskDb(desk.id);console.log('test4'); resolve()},
      ()=>{resolve()}
    )
  })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////DESKS MANAGMENT DISPLAY///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function showDeskMenu(desk){
                            ////////////////CREATE CONTAINER ///////////////////
    let {container,cleanUp} = createContainer(globalHome);

                            ////////////////Give Permission DESK ////////////////////
    if(await checkAccess(state.currentUser.id,desk.id).typeAccess == 'admin'|| state.currentUser.id === desk.ownerId){
      let givePermissionBtn = createBtn(container,"Give permission");
      givePermissionBtn.addEventListener('click',async ()=>{
        cleanUp();
        let accessType;
        await changeFriendPermission(desk,accessType);
        showDeskMenu(desk);
      })
    }

                  ///////////////// DELETE DESK ////////////////
    if (state.currentUser.id === desk.ownerId){
      let killBtn = createBtn(container,"Kill desk");
      killBtn.addEventListener('click',async ()=>{
      cleanUp();
      await killDesk(desk);
      loadState(state.currentUser);
      showDeskMenu(desk);
      })
    };
    
    

                              /////////////////GIVE OWNERSHIP////////////////
    if (state.currentUser.id === desk.ownerId){
      createBtn(container,"Give Desk");
    };

                             ////////////////INVITE FRIEND/////////////////////
    let inviteFriendBtn = createBtn(container,"Invite Friend");
    inviteFriendBtn.addEventListener('click',async ()=>{
      cleanUp();
      await displayFriendForDesk(desk);
      showDeskMenu(desk);
    })

                               //////////////////QUIT DESK ////////////////////
    let quitDeskBtn = createBtn(container,"Quit desk");
    quitDeskBtn.addEventListener('click',async ()=>{
      cleanUp()
      await quitDesk(desk);
      await loadState(state.currentUser);
      showDeskMenu(desk);
    })

                              //////////////SEARCH IN DESK ////////////////
    createBtn(container,"Search for file");

                              ///////////////CANCEL BUTTON ////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}


