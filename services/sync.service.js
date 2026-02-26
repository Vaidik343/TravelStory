import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

import { getUnsyncedBucketlist, markBucketSynced } from "../db/bucket.repo";
import { getUnsyncedStories, markStorySynced } from "../db/story.repo";
import { getUnsyncedTrips, markTripSynced } from "../db/trip.repo";
import { getUnsyncedWishlist, markWishlistSynced } from "../db/wishlist.repo";

export const syncAll = async () => {
  // Trips
  for (const trip of await getUnsyncedTrips()) {
    await api.post(ENDPOINTS.TRIP.CREATE, trip);
    markTripSynced(trip.id);
  }

  // Stories
  for (const story of await getUnsyncedStories()) {
    await api.post(ENDPOINTS.STORY.CREATE, story);
    markStorySynced(story.id);
  }

  // Wishlist
  for (const item of await getUnsyncedWishlist()) {
    await api.post(ENDPOINTS.WISHLIST.CREATE, item);
    markWishlistSynced(item.id);
  }

  // Bucketlist
  for (const item of await getUnsyncedBucketlist()) {
    await api.post(ENDPOINTS.BUCKETLIST.CREATE, item);
    markBucketSynced(item.id);
  }
};
