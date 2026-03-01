debugger.exec(`
    CREATE TABLE IF NOT EXISTS products(
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    price       REAL NOT NULL,
    stock       INTEGER DEFAULT 0,
    category    TEXT CHECK(category IN ('electronics','clothing','food')) DEFAULT 'food',
    sellerId    TEXT,
    createdAt   TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (sellerId) REFERENCES sellers(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS orders(
    id          TEXT PRIMARY KEY,
    customerId  TEXT NOT NULL,
    productId   TEXT NOT NULL,
    quantity    INTEGER NOT NULL DEFAULT 1,
    status      TEXT CHECK(status IN ('pending','shipped','delivered','cancelled')) DEFAULT 'pending',
    totalPrice  REAL NOT NULL,
    createdAt   TEXT NOT NULL,
    address     TEXT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customers(id)
    ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages(
    id          TEXT PRIMARY KEY,
    senderId    TEXT NOT NULL,
    receiverId  TEXT NOT NULL,
    content     TEXT NOT NULL,
    isRead      INTEGER DEFAULT 0,
    sentAt      TEXT NOT NULL,
    editedAt    TEXT,
    roomId      TEXT,
    FOREIGN KEY (senderId) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users(id)
    ON DELETE CASCADE
);`)