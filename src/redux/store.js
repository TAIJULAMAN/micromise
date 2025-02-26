import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { baseApi } from './api/baseApi';
import { authSlice } from './Slice/auth/authSlice';
;

const persistConfig = {
    key: "micromise-app",
    storage,
    blacklist: ["baseApi"], // Prevent persisting API cache
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
