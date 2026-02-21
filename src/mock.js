// ===SO WELL BUILT THO================<3=========================
// FAKE USERS (EXPORT!) NOTHING TO SEE THERE ! STAY TOO LONG AND GET RICKROLLED I VE WARNED YOU!!!
// ======<3============OMG FAKE DATAS===================<3=======

export const users = [
    {
        name: "Simon Mrc",
        userName: "simon_mrc",
        id: "user-001",
        accountType: "premium",
        mail: "simon@shareddesk.com",
        password: "test123",  // Plaintext for testing only!
        userColor: "#FF5733"
    },
    {
        name: "Alice Johnson",
        userName: "alice_j",
        id: "user-002",
        accountType: "free",
        mail: "alice@shareddesk.com",
        password: "test456",
        userColor: "#33FF57"
    },
    {
        name: "Bob Martinez",
        userName: "bob_m",
        id: "user-003",
        accountType: "premium",
        mail: "bob@shareddesk.com",
        password: "test789",
        userColor: "#3357FF"
    }
];

// ============================================
// FAKE DESKS (EXPORT! EMPTY CONTENT!)
// ============================================

export const desks = [
    {
        id: "desk-001",
        name: "Simon's Personal Workspace",
        ownerId: "user-001",
        accessUserId: ["user-002"],           // Alice can view
        modifyUserId: ["user-001"],           // Only Simon can edit
        urlLink: null,
        accessPassword: null,
        content: []  // EMPTY - you'll add items manually
    },
    {
        id: "desk-002",
        name: "Team Collaboration Space",
        ownerId: "user-002",
        accessUserId: ["user-001", "user-003"],  // Simon and Bob can view
        modifyUserId: ["user-001", "user-002"],  // Simon and Alice can edit
        urlLink: "https://shareddesk.com/share/abc123",
        accessPassword: "team2024",
        content: []  // EMPTY
    },
    {
        id: "desk-003",
        name: "Bob's Private Workspace",
        ownerId: "user-003",
        accessUserId: ["user-003"],
        modifyUserId: ["user-003"],
        urlLink: null,
        accessPassword: null,
        content: [
            {
                id: 1, name: "readme.txt", type: "file",
                deskId: "desk-003", x: 100, y: 100,
                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                urlLink: null, accessPassword: null,
                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
            },
            {
                id: 2, name: "notes.txt", type: "file",
                deskId: "desk-003", x: 200, y: 100,
                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                urlLink: null, accessPassword: null,
                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
            },
            {
                id: 3, name: "Projects", type: "folder",
                deskId: "desk-003", x: 300, y: 100,
                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                urlLink: null, accessPassword: null,
                createdBy: "user-003", creatorColor: "#FF5733",
                children: [
                    {
                        id: 4, name: "overview.txt", type: "file",
                        deskId: "desk-003", x: 100, y: 100,
                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                    },
                    {
                        id: 5, name: "WebApp", type: "folder",
                        deskId: "desk-003", x: 200, y: 100,
                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-003", creatorColor: "#FF5733",
                        children: [
                            {
                                id: 6, name: "index.html", type: "file",
                                deskId: "desk-003", x: 100, y: 100,
                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                            },
                            {
                                id: 7, name: "style.css", type: "file",
                                deskId: "desk-003", x: 200, y: 100,
                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                            },
                            {
                                id: 8, name: "Components", type: "folder",
                                deskId: "desk-003", x: 300, y: 100,
                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-003", creatorColor: "#FF5733",
                                children: [
                                    {
                                        id: 9, name: "header.js", type: "file",
                                        deskId: "desk-003", x: 100, y: 100,
                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                    },
                                    {
                                        id: 10, name: "footer.js", type: "file",
                                        deskId: "desk-003", x: 200, y: 100,
                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                    },
                                    {
                                        id: 11, name: "Buttons", type: "folder",
                                        deskId: "desk-003", x: 300, y: 100,
                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-003", creatorColor: "#FF5733",
                                        children: [
                                            {
                                                id: 12, name: "primary.js", type: "file",
                                                deskId: "desk-003", x: 100, y: 100,
                                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                            },
                                            {
                                                id: 13, name: "Styles", type: "folder",
                                                deskId: "desk-003", x: 200, y: 100,
                                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-003", creatorColor: "#FF5733",
                                                children: [
                                                    {
                                                        id: 14, name: "colors.css", type: "file",
                                                        deskId: "desk-003", x: 100, y: 100,
                                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                        urlLink: null, accessPassword: null,
                                                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                                    },
                                                    {
                                                        id: 15, name: "Themes", type: "folder",
                                                        deskId: "desk-003", x: 200, y: 100,
                                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                        urlLink: null, accessPassword: null,
                                                        createdBy: "user-003", creatorColor: "#FF5733",
                                                        children: [
                                                            {
                                                                id: 16, name: "dark.css", type: "file",
                                                                deskId: "desk-003", x: 100, y: 100,
                                                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                urlLink: null, accessPassword: null,
                                                                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                                            },
                                                            {
                                                                id: 17, name: "Variants", type: "folder",
                                                                deskId: "desk-003", x: 200, y: 100,
                                                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                urlLink: null, accessPassword: null,
                                                                createdBy: "user-003", creatorColor: "#FF5733",
                                                                children: [
                                                                    {
                                                                        id: 18, name: "light.css", type: "file",
                                                                        deskId: "desk-003", x: 100, y: 100,
                                                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                        urlLink: null, accessPassword: null,
                                                                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                                                    },
                                                                    {
                                                                        id: 19, name: "Overrides", type: "folder",
                                                                        deskId: "desk-003", x: 200, y: 100,
                                                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                        urlLink: null, accessPassword: null,
                                                                        createdBy: "user-003", creatorColor: "#FF5733",
                                                                        children: [
                                                                            {
                                                                                id: 20, name: "custom.css", type: "file",
                                                                                deskId: "desk-003", x: 100, y: 100,
                                                                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                                urlLink: null, accessPassword: null,
                                                                                createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                                                            },
                                                                            {
                                                                                id: 21, name: "Final", type: "folder",
                                                                                deskId: "desk-003", x: 200, y: 100,
                                                                                accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                                urlLink: null, accessPassword: null,
                                                                                createdBy: "user-003", creatorColor: "#FF5733",
                                                                                children: [
                                                                                    {
                                                                                        id: 22, name: "final.css", type: "file",
                                                                                        deskId: "desk-003", x: 100, y: 100,
                                                                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                                        urlLink: null, accessPassword: null,
                                                                                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                                                                    },
                                                                                    {
                                                                                        id: 23, name: "deepest.txt", type: "file",
                                                                                        deskId: "desk-003", x: 200, y: 100,
                                                                                        accessUserId: ["user-003"], modifyUserId: ["user-003"],
                                                                                        urlLink: null, accessPassword: null,
                                                                                        createdBy: "user-003", creatorColor: "#FF5733", fileData: null
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];


// Ok now for the fun part. Stringify, then Store, then get it back and parse

// store those data !
export function loadMockData(){
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("desks", JSON.stringify(desks));
    localStorage.setItem("currentUser", JSON.stringify(users[0]));
    localStorage.setItem("currentDesk", JSON.stringify(desks[2]));
}
