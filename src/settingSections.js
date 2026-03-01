import { createBtn } from "./button";
import { createContainer } from "./namePrompt";

export function showUserSetting(section){
    let {container,cleanup} = createContainer(section);
    createBtn(container,"Change name");
}

export function showDeskMenu(desk){

}