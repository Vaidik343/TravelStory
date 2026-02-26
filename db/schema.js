import { db } from "./database";

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(`
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

    tx.executeSql(`
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

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id TEXT PRIMARY KEY,
        name TEXT,
        notes TEXT,
        isSynced INTEGER DEFAULT 0,
        updatedAt TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS bucketlist (
        id TEXT PRIMARY KEY,
        name TEXT,
        quantity INTEGER,
        notes TEXT,
        isSynced INTEGER DEFAULT 0,
        updatedAt TEXT
      );
    `);
  });
};