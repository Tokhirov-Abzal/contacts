import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import contactsReducer from "./slices/contacts-slices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
