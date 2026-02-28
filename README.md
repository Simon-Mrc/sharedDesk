Today's todo :

1 - Build preset environment for each reset. easy testing purpose : ✅ 
2 - Rework html and main.js to clean all useless testing purpose and build 
clean environment for testing purpose : ❌
3 - Full review of all scripts, clean useless parts, add commentaries : ❌
4 - Full test of all remaining features, datastorage, dom creation and cleaning : ❌
5 - fix all remaining bugs : ❌

SO i can start from a real fresh and clean state to add feature as i create them !

/////////////////// AI GENERATED SUMMARY ////////////// NOT PROUD BUT TOO LAZY //////////////////
# 🖥️ SharedDesk

A collaborative virtual desktop app built with vanilla JavaScript, Node.js, Express and SQLite.  
Create desks, organize files and folders, share workspaces with friends and manage permissions — all in real time.

WELL : mostly now i think you can create your virtual space with friends and family to share photo/video and manage
all of that in a visually appealing style. It s like a mix of git / google drive / with a sense of social media

---

## ✨ Features

- 📁 **Create files and folders** on a virtual desktop with drag-and-drop positioning
- 🖥️ **Multiple desks** per user, with smooth animated transitions between them
- 👥 **User management** — create accounts, log in, manage friends
- 🔐 **Permission system** — admin / modify / read access per desk per user
- 🔒 **Password protection** on individual folders
- 🌳 **Visual tree view** of your desk structure
- 💾 **Persistent storage** — everything saved in SQLite database
- ⚡ **Full stack** — REST API backend + vanilla JS frontend bundled with Vite

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JavaScript (ES Modules) |
| Bundler | Vite |
| Backend | Node.js + Express |
| Database | SQLite via better-sqlite3 |
| Styling | Pure CSS with animations |

---

## 📁 Project Structure

```
sharedDesk/
├── backend/
│   ├── data/
│   │   └── database.db        # SQLite database (auto generated) // Carefull here i set up an auto reset in database.js
│   ├── database.js            # DB setup, tables, preset data // Remove auto delete if you want data persistence
│   └── index.js               # Express REST API   ///////!!!!! NEEDS REWORK TOO: RETURN AND PLACEMENT TO BE RETHINK !!/
├── src/
│   ├── queriesDb/          /////!!!! ALL ROUTES NEED REWORKING : RETURNS NOT REALLY ON POINT !!!!!////////
│   │   ├── accessQueries.js   # Desk access + items fetch 
│   │   ├── deskQueries.js     # Desk CRUD
│   │   ├── itemQueries.js     # File/folder CRUD
│   │   └── userQueries.js     # User CRUD + login
│   ├── style/            /////////////CSS MESSY AS *** full of !important but will do for now ! ///////////
│   │   ├── style.css          # Main styles   
│   │   ├── animations.css     # Slide animations
│   │   ├── buttons.css        # Button styles
│   │   └── containers.css     # Container styles
│   ├── animations.js          # Slide left/right animations   /////////!!! TOO AFRAID TOO TOUCH NOW 
│   ├── creationbundle.js      # New file/folder creation + context menu
│   ├── functions.js           # Desk creation + screen helpers
│   ├── helperFunctions.js     # Option menu (rename/delete/password)
│   ├── main.js                # App entry point + state init  
│   ├── manager.js             # State management (load/switch/save desk)
│   ├── namePrompt.js          # All modal prompts (text input, confirm)
│   ├── recreateDesk.js        # Rebuild desk from DB on login
│   ├── state.js               # Login + initial state setup
│   └── tree.js                # Visual tree display ////////ASHAMED AI GENERATED FUNCTION IT WAS FOR TESTING PURPOSES ////
├── index.html                 # App shell
├── package.json
└── vite.config.js

## 🚀 Getting Started
### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
# Clone the repo
git clone https://github.com/yourname/sharedDesk.git
cd sharedDesk

# Install dependencies
npm install
```
### Run the app
```bash
# Terminal 1 - start backend API
npm run backend

# Terminal 2 - start frontend dev server
npm run dev
```
Then open **http://localhost:5173** in your browser.

## 👤 Preset Test Users

| Name | Username | Password | Role |
|------|----------|----------|------|
| user0 | user0 | 1 | user |
| Bob | bob | 1 | user |
| Simon | simon | 1 | admin |

## 🔮 Roadmap

- [ ] Drag and drop repositioning of files and folders
- [ ] Duplicate file/folder (recursive)
- [ ] Friend system and shared desk invites
- [ ] User color customization
- [ ] Search across desks, folders and files
- [ ] Mobile optimization

