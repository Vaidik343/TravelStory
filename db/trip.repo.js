import { db } from "./database";

export const insertStoryLocal = (story) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO stories VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          story.id,
          story.tripId,
          story.placeName,
          story.story,
          story.visitDate,
          JSON.stringify(story.images),
          0,
          story.updatedAt,
        ],
        () => resolve(true),
        (_, error) => reject(error)
      );
    });
  });
};

export const getUnsyncedStories = () =>
  new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM stories WHERE isSynced = 0`,
        [],
        (_, { rows }) => resolve(rows._array)
      );
    });
  });

export const markStorySynced = (id) =>
  db.transaction((tx) => {
    tx.executeSql(`UPDATE stories SET isSynced = 1 WHERE id = ?`, [id]);
  });