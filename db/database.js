// Web version - SQLite not available, returns null
// Expo automatically uses database.native.js on iOS/Android

export const getDB = async () => {
  console.log("📱 Web platform - SQLite not available");
  return null;
};

export const initDatabase = async () => {
  console.log("📱 Web platform - skipping SQLite init");
  return null;
};
