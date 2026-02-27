import { getDB } from "./database";

export const insertTripLocal = async (trip) => {
  const db = await getDB();
  if (!db) return false; // Web platform - skip SQLite
  await db.runAsync(
    `INSERT INTO trips (id, title, startDate, endDate, coverImage, isSynced, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      trip.id,
      trip.title,
      trip.startDate,
      trip.endDate,
      trip.coverImage,
      0, // isSynced
      trip.updatedAt,
    ]
  );
  return true;
};

export const getUnsyncedTrips = async () => {
  const db = await getDB();
  if (!db) return []; // Web platform - return empty array
  const result = await db.getAllAsync(`SELECT * FROM trips WHERE isSynced = 0`);
  return result;
};

export const markTripSynced = async (id) => {
  const db = await getDB();
  if (!db) return; // Web platform - skip
  await db.runAsync(`UPDATE trips SET isSynced = 1 WHERE id = ?`, [id]);
};
