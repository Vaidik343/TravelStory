import { db } from "./database";

export const insertBucketListLocal = (item) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO bucketlist VALUES (?, ?, ?, ?, ?, ?)`,
        [item.id, item.name, item.quantity, item.notes, 0, item.updatedAt],
        () => resolve(true),
        (_, err) => reject(err),
      );
    });
  });
