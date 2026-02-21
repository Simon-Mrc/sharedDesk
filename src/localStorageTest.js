// Just me learning how to use localstorage
// experiment it is best way to learn
// Console.log local storage in browser seriously a pain in the ass tho

export function localStorageStoreTest(){
    let user = {
        id : 1234,
        password : 4321,
        preferences : {
            color : "blue",
            theme : "dark"
        }
    }
    localStorage.setItem("user1", JSON.stringify(user));
}
export function localStorageGetTest(){
    let a = localStorage.getItem("user1");
    console.log(a);
    localStorage.clear();
}