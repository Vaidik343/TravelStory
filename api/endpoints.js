export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    REFRESH: "/user/refresh",
  },
  USER: {
    CREATE: "/me",
    ALL: "/user",
    UPDATE_BY_ID: (id) => `/me/${id}`,
    GET_BY_ID: (id) => `/me/${id}`,
    DELETE: (id) => `/user/${id}`,
  },

  TRIP: {
    CREATE: "/trip",
    ALL: "/trip",
    GET_BY_ID: (id) => `/trip/${id}`,
    UPDATE_BY_ID: (id) => `/trip/${id}`,
    DELETE: (id) => `/trip/${id}`,
  },

  STORY: {
    CREATE: "/stories",
    ALL: "/stories",
    UPDATE_BY_ID: (id) => `/stories/${id}`,
    GET_BY_ID: (id) => `/stories/${id}`,
    DELETE: (id) => `/stories/${id}`,
  },
  WISHLIST: {
    CREATE: "/wishlist",
    ALL: "/wishlist",
    UPDATE_BY_ID: (id) => `/wishlist/${id}`,
    GET_BY_ID: (id) => `/wishlist/${id}`,
    DELETE: (id) => `/wishlist/${id}`,
  },
  BUCKETLIST: {
    CREATE: "/bucketlist",
    ALL: "/bucketlist",
    UPDATE_BY_ID: (id) => `/bucketlist/${id}`,
    GET_BY_ID: (id) => `/bucketlist/${id}`,
    DELETE: (id) => `/bucketlist/${id}`,
  },
};
