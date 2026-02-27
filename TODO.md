# Offline Save Implementation TODO

## Phase 1: Fix Repository Files

- [x] Fix `db/trip.repo.js` - Replace story functions with trip functions
- [x] Fix `db/wishlist.repo.js` - Replace story functions with wishlist functions
- [x] Fix `db/bucket.repo.js` - Add missing getUnsyncedBucketlist, markBucketSynced

## Phase 2: Update Context Files with Offline Logic

- [x] Update `context/TripContext.jsx` - Add offline save to createTrip()
- [x] Update `context/StoryContext.jsx` - Add offline save to createStory()
- [x] Update `context/WishListContext.jsx` - Add offline save to createWishList()
- [x] Update `context/BucketListContext.jsx` - Add offline save to createBucketList()

## Phase 3: Fix Sync Service

- [x] Fix `services/sync.service.js` - Add error handling and await statements

## Phase 4: Fix Database API (expo-sqlite v2)

- [x] Fix `db/database.js` - Use new async API with openDatabaseAsync
- [x] Fix `db/schema.js` - Use execAsync for table creation
- [x] Fix all repo files - Use runAsync and getAllAsync
- [x] Fix `app/_layout.tsx` - Proper async DB initialization

## Phase 5: Add Web Platform Support

- [x] Add Platform.OS checks to skip SQLite on web
- [x] Update all repo files to handle null db on web
- [x] Update schema.js to skip table creation on web
- [x] App now opens on web without SQLite errors

## Phase 6: Testing

- [ ] Test offline save functionality on mobile
- [ ] Test sync when coming back online on mobile
- [ ] Verify web app opens without errors
