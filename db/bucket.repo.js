import { getDB } from "./database";

export const insertBucketListLocal = async (item) => {
  const db = await getDB();
  if (!db) return false; // Web platform - skip SQLite
  await db.runAsync(
    `INSERT INTO bucketlist (id, name, quantity, notes, isSynced, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      item.id,
      item.name,
      item.quantity,
      item.notes,
      0, // isSynced
      item.updatedAt,
    ]
  );
  return true;
};

export const getUnsyncedBucketlist = async () => {
  const db = await getDB();
  if (!db) return []; // Web platform - return empty array
  const result = await db.getAllAsync(`SELECT * FROM bucketlist WHERE isSynced = 0`);
  return result;
};

export const markBucketSynced = async (id) => {
  const db = await getDB();
  if (!db) return; // Web platform - skip
  await db.runAsync(`UPDATE bucketlist SET isSynced = 1 WHERE id = ?`, [id]);
};
