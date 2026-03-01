////////////////////////// EXPORT SECTION ///////////////////

// let result = await initiateDeskandUser();
export const state = {
    currentUser:  {},
    currentDesk:  {}
}
export const globalHome = document.getElementById(`globalHome`);
export let array = [];
// This array is gonna fill up with section as DOM element 
// it s used to search and find right section to display 
// the dataset.id of the section = id of folder it s coming from
// the container(DOM object representing folder object) s'id = folders'id
// and container.dataset.index = place in array 
// so when you double click on a folder, it checks its datasetindex, and load DOM element in the right position of array. 

