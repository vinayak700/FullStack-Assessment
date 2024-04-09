import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./Redux/store";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ToastContainer
          position="top-center"
          autoclose={2000}
          hideprogressbar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Slide}
        />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
