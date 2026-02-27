import { getDB } from "./database";

export const insertWishlistLocal = async (item) => {
  const db = await getDB();
  if (!db) return false; // Web platform - skip SQLite
  await db.runAsync(
    `INSERT INTO wishlist (id, name, notes, isSynced, updatedAt) VALUES (?, ?, ?, ?, ?)`,
    [
      item.id,
      item.name,
      item.notes,
      0, // isSynced
      item.updatedAt,
    ]
  );
  return true;
};

export const getUnsyncedWishlist = async () => {
  const db = await getDB();
  if (!db) return []; // Web platform - return empty array
  const result = await db.getAllAsync(`SELECT * FROM wishlist WHERE isSynced = 0`);
  return result;
};

export const markWishlistSynced = async (id) => {
  const db = await getDB();
  if (!db) return; // Web platform - skip
  await db.runAsync(`UPDATE wishlist SET isSynced = 1 WHERE id = ?`, [id]);
};
