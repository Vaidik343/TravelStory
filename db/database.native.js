import * as SQLite from "expo-sqlite";

let db = null;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("travel.db");
  }
  return db;
};

export const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("travel.db");
  }
  return db;
};
