// import { getCurrentDesk, updateCurrentDesk, updateCurrentDeskInDesks } from "./src/helperFunctions";

import { getCurrentDesk } from "./src/helperFunctions";

// // learned so usefull sht with this file tho
//  function searchIdandPushAndUpdate(currentDesk,objects,needStorage,targetID){
//     objects.forEach(object => {
//         if (object.id == targetID){
//             object.children.push(needStorage);
//             updateCurrentDesk(currentDesk);
//             updateCurrentDeskInDesks(currentDesk);
//             return;
//         }
//         if (object.type == "folder"){
//             searchIdandPushAndUpdate(object.children, needStorage,targetID);  
//         };
//     });
// }


///////////////DUPLICATE 2 TRY/////////////
let dupObject = {};
Object.assign(dupObject,object);
dupObject.id = Date.now();
dupObject.x = (dupObject.x+40)+`px`;
dupObject.y = (dupObject.y+30)+`px`;
function recursiveDup(items){
    items.forEach(item => {        
        if(item.type == "file"){
            item.id = `desk-${crypto.randomUUID()}`;
            item.x = (item.x+40) +`px`;
            item.y = (item.y+40) +`px`;
        }
        else{
            item.id = `desk-${crypto.randomUUID()}`;
            item.x = (item.x+40) +`px`;
            item.y = (item.y+40) +`px`;
            recursiveDup(item.children);
        }
    });
}
let currentDesk = getCurrentDesk();
let currentDeskContent = currentDesk;
let dupRecursiveDup=recursiveDup(dupObject);
function recursiveFindAndPush(currentDeskContent){
    currentDeskContent.forEach(item => {
        if(item.type == "file"){
        }
        else{
            if(item.children.includes(object)){
                item.push(dupObject)
            }
        }
        
    });
}




if(dupObject.type == "folder"){
}