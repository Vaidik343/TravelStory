import { getDB } from "./database";

export const insertStoryLocal = async (story) => {
  const db = await getDB();
  if (!db) return false; // Web platform - skip SQLite
  await db.runAsync(
    `INSERT INTO stories (id, tripId, placeName, story, visitDate, images, isSynced, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      story.id,
      story.tripId,
      story.placeName,
      story.story,
      story.visitDate,
      JSON.stringify(story.images),
      0, // isSynced
      story.updatedAt,
    ]
  );
  return true;
};

export const getUnsyncedStories = async () => {
  const db = await getDB();
  if (!db) return []; // Web platform - return empty array
  const result = await db.getAllAsync(`SELECT * FROM stories WHERE isSynced = 0`);
  return result;
};

export const markStorySynced = async (id) => {
  const db = await getDB();
  if (!db) return; // Web platform - skip
  await db.runAsync(`UPDATE stories SET isSynced = 1 WHERE id = ?`, [id]);
};
