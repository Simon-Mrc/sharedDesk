import { getCurrentDesk, updateCurrentDesk, updateCurrentDeskInDesks } from "./src/helperFunctions";

// learned so usefull sht with this file tho
 function searchIdandPushAndUpdate(currentDesk,objects,needStorage,targetID){
    objects.forEach(object => {
        if (object.id == targetID){
            object.children.push(needStorage);
            updateCurrentDesk(currentDesk);
            updateCurrentDeskInDesks(currentDesk);
            return;
        }
        if (object.type == "folder"){
            searchIdandPushAndUpdate(object.children, needStorage,targetID);  
        };
    });
}