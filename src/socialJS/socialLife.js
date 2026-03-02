import { acceptOrDenied, quickMessage, yesOrNoPromptWithText } from '../namePrompt.js';
import { selectUser, updateUser } from '../queriesDb/userQueries.js';
import { state } from '../constJS/exportConst.js';
import { globalHome } from '../constJS/exportConst.js';

export async function acceptFriend(targetFriendId){ // accepting ones invite stored in user.notif in usersDB !
    let friendList = JSON.parse(state.currentUser?.friendList||'[]'); // In order to make the string an array
    console.log(friendList);
    console.log(targetFriendId);
    friendList.push(targetFriendId);
    state.currentUser.friendList = JSON.stringify(friendList); // reconvert into string
    let notif = JSON.parse(state.currentUser.notif); 
    notif.splice(0,1);
    state.currentUser.notif = JSON.stringify(notif);
    console.log(targetFriendId);
    let targetFriend = await selectUser(targetFriendId); // Only friends Id is needed
    console.log(targetFriend);
    let targetFriendFriendList = JSON.parse(targetFriend?.friendList || '[]'); //fallback to string before parse that crash before fallback
    console.log(targetFriendFriendList);
    targetFriendFriendList.push(state.currentUser.id);
    console.log(targetFriendFriendList);
    targetFriend.friendList = JSON.stringify(targetFriendFriendList);

    await updateUser(state.currentUser);
    await updateUser(targetFriend); // don t forget to update both users
}

export async function sendFriendRequest(targetFriend){ // push own id in friends notif
    if (targetFriend?.notif.includes(state.currentUser.id)){
        quickMessage(" You already sent a friend request u unpatient fck");
        return;
    }
    else if(targetFriend?.friendList.includes(state.currentUser.id)){
        quickMessage("He is already your friend and everybody's wondering why !")
    }
    else if (targetFriend.id === state.currentUser.id){
        quickMessage("So Lonely you try to add yourself? How sad")
    }
    else{
        let notif = JSON.parse(targetFriend?.notif||'[]');
        notif.push(state.currentUser.id);
        targetFriend.notif = JSON.stringify(notif);
        await updateUser(targetFriend);
    }
}

export async function showNotif(i){
    let notif = JSON.parse(state.currentUser.notif||'[]');
    let targetFriendUserName = (await selectUser(notif[i])).userName;
    if(notif?.length!=0){
        await yesOrNoPromptWithText(globalHome,`will you take ${targetFriendUserName} as a friend ?`, 'Of course','NEVER',
        () => acceptFriend(notif[i]), // in case of resolve()
        () => deleteNotif(i))// in cas of denied() // need to think about no possibility to ask again ? prevents spam ?
    }
    else{
        quickMessage("You have no friend request u poor lonely boy")
    }
}    


export async function deleteNotif(i){ // just cut askerId from currentuser.notif
    let notif = JSON.parse(state.currentUser.notif);
    notif.splice(i,1);
    state.currentUser.notif = JSON.stringify(notif);
    await updateUser(state.currentUser); // update in db
}
 