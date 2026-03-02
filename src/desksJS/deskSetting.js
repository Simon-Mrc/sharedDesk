import { globalHome , state} from "../constJS/exportConst";
import { createBtn,createBtnWithFunction } from "../DOMmanipJS/button";
import { createContainer, quickMessage, yesOrNoPromptWithText } from "../namePrompt";
import { addUserToDesk, changePermission, getAllUserFromDesk } from "../queriesDb/accessQueries";
import { selectUser } from "../queriesDb/userQueries";

/////////////////////////////////////////////////////////
  //////////////////DESKS FUNCTIONS////////////////
/////////////////////////////////////////////////////////

export async function displayFriendForDesk(desk){
  const {container,cleanUp} = createContainer(globalHome);

  try{
      let allFriend = JSON.parse(state.currentUser.friendList);
      console.log(allFriend);
      for(let i = 0 ; i < allFriend.length ; i = i + 1){
          let targetFriend = await selectUser(allFriend[i]);       
          createBtnWithFunction(container,targetFriend.userName,
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

export async function changeFriendPermission(desk,accessType){
  const {container , cleanUp} = createContainer(globalHome);
  try{
    accessType = 'admin'
    let allCurrentUser = await getAllUserFromDesk(desk.id);
    console.log(allCurrentUser);
    for(let i = 0 ; i < allCurrentUser.length ; i = i + 1){
      if(allCurrentUser[i].userId != state.currentUser.id){
        let targetFriend = await selectUser(allCurrentUser[i].userId)
        console.log(targetFriend);
        createBtnWithFunction(container,targetFriend.userName,
          async ()=>{ await yesOrNoPromptWithText(globalHome,'You sur u wanna give him permission ??','Hell Yeah!' , 'Hell no!',
            async ()=>{await changePermission(accessType,allCurrentUser[i].userId,desk.id)},
            ()=>null
          )
        })
      }   
    }}catch{
      quickMessage('it seems you re not up to the task!')
    }
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })
}


/////////////////////////////////////////////////////////
  ///////////////DESKS MANAGMENT DISPLAY////////////////
/////////////////////////////////////////////////////////

export async function showDeskMenu(desk){
  ////////////////CREATE CONTAINER ///////////////////
    let {container,cleanUp} = createContainer(globalHome);

    ////////////////Give Permission DESK ////////////////////
    let givePermissionBtn = createBtn(container,"Give permission");
    givePermissionBtn.addEventListener('click',()=>{
      let accessType;
      changeFriendPermission(desk,accessType)
    })


    /////////////////QUIT/DELETE DESK ////////////////
    createBtn(container,"Delete/quit");

    /////////////////GIVE OWNERSHIP////////////////
    createBtn(container,"Give Desk");

    ////////////////INVITE FRIEND/////////////////////
    let inviteFriendBtn = createBtn(container,"Invite Friend");
    inviteFriendBtn.addEventListener('click',()=>{
      displayFriendForDesk(desk);
    })



    //////////////SEARCH IN DESK ////////////////
    createBtn(container,"Search for file");

    ///////////////CANCEL BUTTON ////////////////
    let closeBtn = createBtn(container,"Close Menu");
    closeBtn.addEventListener('click',()=>{
        cleanUp();
    })

}


