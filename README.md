There is not gonna be updates in few days !  Don t worry i m not dead ! (at least not when i m writing those)
Just side learning and practicing sql in order to implement it into this project before going further !
See you <3



# SharedDesk

A collaborative workspace manager built with vanilla JavaScript.

## Features
- 🗂️ Create and manage virtual desks
- 📁 Files and folders with drag-and-drop
- 👥 Multi-user support with permissions
- 💾 Persistent storage with localStorage
- ✨ Smooth animations

## Built With
- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- Vite

## Status
🚧 Work in progress - dev started on 18/02/2026 (french convention what u gonna do about it)

## Run Locally
```bash
npm install
npm run dev
```
plz read comments so i don t feel so empty when writing these

Describing how it works to make reading easier ! 
also will act as a reminder for me if i want to get back to it.

SO !
1 : You logg in and initiate on an empty screen
    you already have user json object and current user json set in local storage
    iniate will create the environement.
    u choose a name that gives you environement unique id
    it set up the first currentdesk in json current desk
    a div is created wich is the window that ll appear on screnn with slide right animation
    all addeventlistener right click created now
    div get an index and a setdata.id to build database correctly
    forgot to tell but everytime a div is created (for displayed)
    it get store in an array defined in main.js to be load later to display the right section.
    it is the dom object that is in that array (i mean it s pointer at least)

2:  you create with right-click a file or folder
    as you create it it get automaticly add to you currentdesk data in json
    folder got key: children[] that is checked 
    everytime an object is created it get an eventlistener attached to it in create function
    tricky part is it gets attacched before object is created
    (file got rightclick event listener in code before it actually gets created)
    if file is created it check index on section he is in to be stored in json
    right folder.children[]

3:  double clicking on a folder check if div created exist or not by checking the array
    if div already created it gets displayed with animation using it setdata and index in array
    if a file is created it check setdata.id from the section he is in to know
    from wich folder this section was created setdata.id and folder.id (folder div is from are the same)


And that s how global structure works. Every time something is created or modified all item (almost)
gets load from localstorage using JSON and shit and get updates
then reinject into localstorage.

function as password , rename, delete and so on are not hard to build with this kind of well structured archi
not to brag tho but i feel proud for my first real project.


FCK just noticed that tree doesn t get displayed the way i want it to be . But i swear it s structured as it should (like a computer)
go look into localStorage.getItem('currentDesk') in browser console as you create your environnement ! i suggest you then parse it to a stringify this 
with node or anything to have a better displayed and view on how it s done !
will try to have this adjust by tomorrow !
