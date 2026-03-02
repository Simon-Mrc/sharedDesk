import { globalHome , state} from "../constJS/exportConst";
import { createBtn,createBtnWithFunction } from "../DOMmanipJS/button";
import { chooseBetween, createContainer, quickMessage, yesOrNoPromptWithText } from "../namePrompt";
import { addUserToDesk, changePermission, checkAccess, getAllUserFromDesk } from "../queriesDb/accessQueries";
import { selectUser } from "../queriesDb/userQueries";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////// DESKS FUNCTIONS ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////CHOOSE A FRIEND TO ADD TO YOUR DESK ///////////////////////////////////////
export async function displayFriendForDesk(desk){
  const {container,cleanUp} = createContainer(globalHome);
  try{
      let allFriend = JSON.parse(state.currentUser.friendList);
      let friendsInDesk = await getAllUserFromDesk(desk.id);
      for(let i = 0 ; i < allFriend.length ; i = i + 1){
        let targetFriend = await selectUser(allFriend[i]);       
        if(!JSON.stringify(friendsInDesk).includes(targetFriend.id)){
          let btn = createBtnWithFunction(container,targetFriend.userName,
              async ()=>{
                  await yesOrNoPromptWithText(globalHome,`invite ${targetFriend.userName}`, 'Let Her In ! ',`HOLDTHEDOOR`,
                    async ()=>{
                      await addUserToDesk(targetFriend.id,desk.id);
                      return;
                    },
                    ()=> {return}
                  )
              }
          )
          btn.style.boxShadow = `0 8px 20px ${targetFriend.userColor}`;
      }
        }
      let closeBtn = createBtn(container,"Close Menu");
      closeBtn.addEventListener('click',()=>{
          cleanUp();
      })
    }catch{
      quickMessage('you have no friend you lonely fck');
      cleanUp();
    }
}


////////////////////////////CHANGE PERMISSION OF FRIEND /////////////////////////////
export async function changeFriendPermission(desk){
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
          quickMessage(`I just ${choice} rights to ${targetFriend.userName}`);
        })
        btn.style.boxShadow = `0 8px 20px ${targetFriend.userColor}`;
      }   
    }
  }catch{
      quickMessage('it seems you re not up to the task!')
    }
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
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
        let accessType;
        await changeFriendPermission(desk,accessType)
      })
    }

                              ///////////////// DELETE DESK ////////////////
    if (state.currentUser.id === desk.ownerId){
      createBtn(container,"Delete/quit");
    };

                              /////////////////GIVE OWNERSHIP////////////////
    if (state.currentUser.id === desk.ownerId){
      createBtn(container,"Give Desk");
    };

                             ////////////////INVITE FRIEND/////////////////////
    let inviteFriendBtn = createBtn(container,"Invite Friend");
    inviteFriendBtn.addEventListener('click',async ()=>{
      await displayFriendForDesk(desk);
    })

                               //////////////////QUIT DESK ////////////////////
    let quitDeskBtn = createBtn(container,"Quit desk");
    inviteFriendBtn.addEventListener('click',async ()=>{
      await quitDesk(desk);
    })

                              //////////////SEARCH IN DESK ////////////////
    createBtn(container,"Search for file");

                              ///////////////CANCEL BUTTON ////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}


