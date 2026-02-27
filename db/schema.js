import { getDB } from "./database";

export const initDB = async () => {
  const db = await getDB();
  if (!db) {
    console.log("📱 Web platform - skipping SQLite table creation");
    return;
  }
  
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS trips (
        id TEXT PRIMARY KEY,
        title TEXT,
        startDate TEXT,
        endDate TEXT,
        coverImage TEXT,
        isSynced INTEGER DEFAULT 0,
        updatedAt TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS stories (
        id TEXT PRIMARY KEY,
        tripId TEXT,
        placeName TEXT,
        story TEXT,
        visitDate TEXT,
        images TEXT,
        isSynced INTEGER DEFAULT 0,
        updatedAt TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id TEXT PRIMARY KEY,
        name TEXT,
        notes TEXT,
        isSynced INTEGER DEFAULT 0,
        updatedAt TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS bucketlist (
        id TEXT PRIMARY KEY,
        name TEXT,
        quantity INTEGER,
        notes TEXT,
        isSynced INTEGER DEFAULT 0,
        updatedAt TEXT
      );
    `);
    
    console.log("✅ SQLite tables initialized");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    throw error;
  }
};
