import { acceptOrDenied } from '../namePrompt.js';
import { selectUser, updateUser } from '../queriesDb/userQueries.js';
import { state } from '../constJS/exportConst.js';
import { globalHome } from '../constJS/exportConst.js';

export async function acceptFriend(targetFriendId){ // accepting ones invite stored in user.notif in usersDB !
    let friendList = JSON.parse(state.currentUser.friendList); // In order to make the string an array
    friendList.push(targetFriendId);
    state.currentUser.friendList = JSON.stringify(friendList); // reconvert into string
    let notif = JSON.parse(state.currentUser.notif); 
    notif.splice(0,1);
    state.currentUser.notif = JSON.stringify(notif);
    let targetFriend = await selectUser(targetFriendId); // Only friends Id is needed
    let targetFriendFriendList = JSON.parse(targetFriend.friendList);
    targetFriendFriendList.push(state.currentUser.id);
    targetFriend.friendList = JSON.stringify(targetFriendFriendList);
    await updateUser(state.currentUser);
    await updateUser(targetFriend); // don t forget to update both users
}

export async function sendFriendRequest(targetFriend){ // push own id in friends notif
    let notif = JSON.parse(targetFriend.notif);
    notif.push(state.currentUser.id);
    targetFriend.notif = JSON.stringify(notif);
    await updateUser(targetFriend);
}

export async function showNotif(i){
        if(state.currentUser.notif[0] != undefined){
        await acceptOrDenied("will you take me as a friend ?", globalHome,
            () => acceptFriend(state.currentUser.notif[i]), // in case of resolve()
            () => deleteNotif(i))// in cas of denied() // need to think about no possibility to ask again ? prevents spam ?
    }    
}

export async function deleteNotif(i){ // just cut askerId from currentuser.notif
    let notif = JSON.parse(state.currentUser.notif);
    notif.splice(i,1);
    state.currentUser.notif = JSON.stringify(notif);
    await updateUser(state.currentUser); // update in db
}
 