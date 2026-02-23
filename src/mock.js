// ===SO WELL BUILT THO================<3=========================
// FAKE USERS (EXPORT!) NOTHING TO SEE THERE ! STAY TOO LONG AND GET RICKROLLED I VE WARNED YOU!!!
// ======<3============OMG FAKE DATAS===================<3=======

export const users = [
    {
        name: "Simon Mrc",
        userName: "SimonMrc",
        id: "user-001",
        accountType: "premium",
        mail: "simon@shareddesk.com",
        password: "test123",  // Plaintext for testing only!
        desksId : ["desk-004","desk-003" ],
        userColor: "#FF5733"
    },
    {
        name: "Alice Johnson",
        userName: "alice_j",
        id: "user-002",
        accountType: "free",
        mail: "alice@shareddesk.com",
        password: "test456",
        desksId : [],
        userColor: "#33FF57"
    },
    {
        name: "Bob Martinez",
        userName: "bob_m",
        id: "user-003",
        accountType: "premium",
        mail: "bob@shareddesk.com",
        password: "test789",
        desksId : [],
        userColor: "#3357FF"
    }
];

// ============================================
// FAKE DESKS (EXPORT! EMPTY CONTENT!)
// ============================================

export const desks = [
    {
        id: "desk-004",
        name: "Alice's Chaos Workspace",
        ownerId: "user-002",
        accessUserId: ["user-001", "user-002", "user-003"],
        modifyUserId: ["user-002"],
        urlLink: null,
        accessPassword: null,
        content: [
            // ROOT FILES
            {
                id: 100, name: "todo.txt", type: "file",
                deskId: "desk-004", x: 50, y: 50,
                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                urlLink: null, accessPassword: null,
                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
            },
            {
                id: 101, name: "budget.xlsx", type: "file",
                deskId: "desk-004", x: 150, y: 50,
                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                urlLink: null, accessPassword: null,
                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
            },
            {
                id: 102, name: "meeting-notes.txt", type: "file",
                deskId: "desk-004", x: 250, y: 50,
                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                urlLink: null, accessPassword: null,
                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
            },
    
            // BRANCH 1 - Design (wide, 3 levels deep with multiple children at each level)
            {
                id: 200, name: "Design", type: "folder",
                deskId: "desk-004", x: 50, y: 150,
                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                urlLink: null, accessPassword: null,
                createdBy: "user-002", creatorColor: "#33FF57",
                children: [
                    {
                        id: 201, name: "brief.txt", type: "file",
                        deskId: "desk-004", x: 50, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                    },
                    {
                        id: 202, name: "mockups.txt", type: "file",
                        deskId: "desk-004", x: 150, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                    },
                    {
                        id: 203, name: "Assets", type: "folder",
                        deskId: "desk-004", x: 250, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57",
                        children: [
                            {
                                id: 204, name: "logo.png", type: "file",
                                deskId: "desk-004", x: 50, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                            },
                            {
                                id: 205, name: "banner.png", type: "file",
                                deskId: "desk-004", x: 150, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                            },
                            {
                                id: 206, name: "Icons", type: "folder",
                                deskId: "desk-004", x: 250, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57",
                                children: [
                                    {
                                        id: 207, name: "home.svg", type: "file",
                                        deskId: "desk-004", x: 50, y: 50,
                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                    },
                                    {
                                        id: 208, name: "settings.svg", type: "file",
                                        deskId: "desk-004", x: 150, y: 50,
                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                    },
                                    {
                                        id: 209, name: "Animated", type: "folder",
                                        deskId: "desk-004", x: 250, y: 50,
                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-002", creatorColor: "#33FF57",
                                        children: [
                                            {
                                                id: 210, name: "spinner.svg", type: "file",
                                                deskId: "desk-004", x: 50, y: 50,
                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                            },
                                            {
                                                id: 211, name: "loader.svg", type: "file",
                                                deskId: "desk-004", x: 150, y: 50,
                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 212, name: "Fonts", type: "folder",
                        deskId: "desk-004", x: 350, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57",
                        children: [
                            {
                                id: 213, name: "primary.ttf", type: "file",
                                deskId: "desk-004", x: 50, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                            },
                            {
                                id: 214, name: "fallback.ttf", type: "file",
                                deskId: "desk-004", x: 150, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                            }
                        ]
                    }
                ]
            },
    
            // BRANCH 2 - Backend (deep single chain, 6 levels)
            {
                id: 300, name: "Backend", type: "folder",
                deskId: "desk-004", x: 200, y: 150,
                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                urlLink: null, accessPassword: null,
                createdBy: "user-002", creatorColor: "#33FF57",
                children: [
                    {
                        id: 301, name: "server.js", type: "file",
                        deskId: "desk-004", x: 50, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                    },
                    {
                        id: 302, name: "API", type: "folder",
                        deskId: "desk-004", x: 150, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57",
                        children: [
                            {
                                id: 303, name: "routes.js", type: "file",
                                deskId: "desk-004", x: 50, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                            },
                            {
                                id: 304, name: "Auth", type: "folder",
                                deskId: "desk-004", x: 150, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57",
                                children: [
                                    {
                                        id: 305, name: "login.js", type: "file",
                                        deskId: "desk-004", x: 50, y: 50,
                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                    },
                                    {
                                        id: 306, name: "register.js", type: "file",
                                        deskId: "desk-004", x: 150, y: 50,
                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                    },
                                    {
                                        id: 307, name: "Middleware", type: "folder",
                                        deskId: "desk-004", x: 250, y: 50,
                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                        urlLink: null, accessPassword: null,
                                        createdBy: "user-002", creatorColor: "#33FF57",
                                        children: [
                                            {
                                                id: 308, name: "checkToken.js", type: "file",
                                                deskId: "desk-004", x: 50, y: 50,
                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                            },
                                            {
                                                id: 309, name: "rateLimit.js", type: "file",
                                                deskId: "desk-004", x: 150, y: 50,
                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                            },
                                            {
                                                id: 310, name: "Guards", type: "folder",
                                                deskId: "desk-004", x: 250, y: 50,
                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                urlLink: null, accessPassword: null,
                                                createdBy: "user-002", creatorColor: "#33FF57",
                                                children: [
                                                    {
                                                        id: 311, name: "adminGuard.js", type: "file",
                                                        deskId: "desk-004", x: 50, y: 50,
                                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                        urlLink: null, accessPassword: null,
                                                        createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                                    },
                                                    {
                                                        id: 312, name: "Deep", type: "folder",
                                                        deskId: "desk-004", x: 150, y: 50,
                                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                        urlLink: null, accessPassword: null,
                                                        createdBy: "user-002", creatorColor: "#33FF57",
                                                        children: [
                                                            {
                                                                id: 313, name: "Deeper", type: "folder",
                                                                deskId: "desk-004", x: 50, y: 50,
                                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                                urlLink: null, accessPassword: null,
                                                                createdBy: "user-002", creatorColor: "#33FF57",
                                                                children: [
                                                                    {
                                                                        id: 314, name: "Deepest", type: "folder",
                                                                        deskId: "desk-004", x: 50, y: 50,
                                                                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                                        urlLink: null, accessPassword: null,
                                                                        createdBy: "user-002", creatorColor: "#33FF57",
                                                                        children: [
                                                                            {
                                                                                id: 315, name: "youFoundMe.txt", type: "file",
                                                                                deskId: "desk-004", x: 50, y: 50,
                                                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                                                urlLink: null, accessPassword: null,
                                                                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
                                                                            },
                                                                            {
                                                                                id: 316, name: "rickroll.txt", type: "file",
                                                                                deskId: "desk-004", x: 150, y: 50,
                                                                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                                                                urlLink: null, accessPassword: null,
                                                                                createdBy: "user-002", creatorColor: "#33FF57", fileData: null
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
            },
    
            // BRANCH 3 - Archive (wide and flat, lots of files at root)
            {
                id: 400, name: "Archive", type: "folder",
                deskId: "desk-004", x: 350, y: 150,
                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                urlLink: null, accessPassword: null,
                createdBy: "user-002", creatorColor: "#33FF57",
                children: [
                    { id: 401, name: "2021.txt", type: "file", deskId: "desk-004", x: 50, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                    { id: 402, name: "2022.txt", type: "file", deskId: "desk-004", x: 150, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                    { id: 403, name: "2023.txt", type: "file", deskId: "desk-004", x: 250, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                    { id: 404, name: "2024.txt", type: "file", deskId: "desk-004", x: 350, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                    { id: 405, name: "2025.txt", type: "file", deskId: "desk-004", x: 450, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                    {
                        id: 406, name: "OldProjects", type: "folder",
                        deskId: "desk-004", x: 550, y: 50,
                        accessUserId: ["user-002"], modifyUserId: ["user-002"],
                        urlLink: null, accessPassword: null,
                        createdBy: "user-002", creatorColor: "#33FF57",
                        children: [
                            { id: 407, name: "project-alpha.txt", type: "file", deskId: "desk-004", x: 50, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                            { id: 408, name: "project-beta.txt", type: "file", deskId: "desk-004", x: 150, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                            { id: 409, name: "project-gamma.txt", type: "file", deskId: "desk-004", x: 250, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                            {
                                id: 410, name: "Deprecated", type: "folder",
                                deskId: "desk-004", x: 350, y: 50,
                                accessUserId: ["user-002"], modifyUserId: ["user-002"],
                                urlLink: null, accessPassword: null,
                                createdBy: "user-002", creatorColor: "#33FF57",
                                children: [
                                    { id: 411, name: "old-api.js", type: "file", deskId: "desk-004", x: 50, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                                    { id: 412, name: "legacy.js", type: "file", deskId: "desk-004", x: 150, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null },
                                    { id: 413, name: "dont-touch.js", type: "file", deskId: "desk-004", x: 250, y: 50, accessUserId: ["user-002"], modifyUserId: ["user-002"], urlLink: null, accessPassword: null, createdBy: "user-002", creatorColor: "#33FF57", fileData: null }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
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
// used at start of pnpm dev to have a set up everytime
export function loadMockData(){
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("desks", JSON.stringify(desks));
    localStorage.setItem("currentUser", JSON.stringify(users[0]));
    localStorage.setItem("currentDesk", JSON.stringify(desks[1]));
}
