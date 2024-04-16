import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";

export const store = configureStore({
  reducer: { userReducer },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({ serializableCheck: false }),
});
