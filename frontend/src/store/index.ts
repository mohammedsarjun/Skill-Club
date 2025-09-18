import { configureStore, combineReducers } from "@reduxjs/toolkit";
import freelancerReducer from "./slices/freelancerSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const freelancerPersistConfig = {
  key: "freelancerOnboarding",  
  storage,

};

const persistedFreelancerReducer = persistReducer(freelancerPersistConfig, freelancerReducer);

const rootReducer = combineReducers({
  freelancer: persistedFreelancerReducer,
  // other reducers (auth, ui...) - not persisted unless you wrap them too
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
