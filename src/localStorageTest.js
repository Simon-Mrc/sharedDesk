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