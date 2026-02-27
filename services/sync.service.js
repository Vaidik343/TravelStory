import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

import { getUnsyncedBucketlist, markBucketSynced } from "../db/bucket.repo";
import { getUnsyncedStories, markStorySynced } from "../db/story.repo";
import { getUnsyncedTrips, markTripSynced } from "../db/trip.repo";
import { getUnsyncedWishlist, markWishlistSynced } from "../db/wishlist.repo";

export const syncAll = async () => {
  try {
    console.log("🔄 Starting sync...");

    // Trips
    const unsyncedTrips = await getUnsyncedTrips();
    console.log(`📦 Found ${unsyncedTrips.length} unsynced trips`);
    for (const trip of unsyncedTrips) {
      try {
        await api.post(ENDPOINTS.TRIP.CREATE, trip);
        await markTripSynced(trip.id);
        console.log(`✅ Trip ${trip.id} synced`);
      } catch (error) {
        console.error(`❌ Failed to sync trip ${trip.id}:`, error.message);
      }
    }

    // Stories
    const unsyncedStories = await getUnsyncedStories();
    console.log(`📦 Found ${unsyncedStories.length} unsynced stories`);
    for (const story of unsyncedStories) {
      try {
        await api.post(ENDPOINTS.STORY.CREATE, story);
        await markStorySynced(story.id);
        console.log(`✅ Story ${story.id} synced`);
      } catch (error) {
        console.error(`❌ Failed to sync story ${story.id}:`, error.message);
      }
    }

    // Wishlist
    const unsyncedWishlist = await getUnsyncedWishlist();
    console.log(`📦 Found ${unsyncedWishlist.length} unsynced wishlist items`);
    for (const item of unsyncedWishlist) {
      try {
        await api.post(ENDPOINTS.WISHLIST.CREATE, item);
        await markWishlistSynced(item.id);
        console.log(`✅ Wishlist ${item.id} synced`);
      } catch (error) {
        console.error(`❌ Failed to sync wishlist ${item.id}:`, error.message);
      }
    }

    // Bucketlist
    const unsyncedBucketlist = await getUnsyncedBucketlist();
    console.log(`📦 Found ${unsyncedBucketlist.length} unsynced bucketlist items`);
    for (const item of unsyncedBucketlist) {
      try {
        await api.post(ENDPOINTS.BUCKETLIST.CREATE, item);
        await markBucketSynced(item.id);
        console.log(`✅ Bucketlist ${item.id} synced`);
      } catch (error) {
        console.error(`❌ Failed to sync bucketlist ${item.id}:`, error.message);
      }
    }

    console.log("✅ Sync complete");
  } catch (error) {
    console.error("❌ Sync error:", error);
  }
};
