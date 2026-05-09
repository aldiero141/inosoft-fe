import { configureStore } from "@reduxjs/toolkit";
import inspectionReducer from "./slices/inspectionSlice";

export const store = configureStore({
  reducer: {
    inspection: inspectionReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;