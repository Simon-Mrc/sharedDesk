import { createDesk, getAllDesks, getCurrentUser, getCurrentDesk, updateDesks,updateUsers,addContentAndUpdate } from './helperFunctions.js';
import { users, desks, loadMockData } from './mock.js';
import {localStorageStoreTest, localStorageGetTest} from './localStorageTest.js';
import { showNamePrompt,textNeeded } from './namePrompt.js';
import { resetClass, slideLeft, quiteSlideLeft,slideRight } from './animations.js';
import { newFile, newFolder,showContextMenu } from './creationbundle.js';
import { initiate,createNew } from './functions.js';

// Got lazy building menus. but not enough to build this.
export function menuWithNButtons(n){

} 