import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from './loggedInUser';

// Configure the Redux store
const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;