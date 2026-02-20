// ============================================
// FAKE USERS (EXPORT!)
// ============================================

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
        accessUserId: [],                      // No one can view
        modifyUserId: ["user-003"],            // Only Bob can edit
        urlLink: null,
        accessPassword: null,
        content: []  // EMPTY
    }
];


// Ok now for the fun part. Stringify, then Store, then get it back and parse

// store those data !
export function loadMockData(){
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("desks", JSON.stringify(desks));
    localStorage.setItem("currentUser", JSON.stringify(users[0]));
}
