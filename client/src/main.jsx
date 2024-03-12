import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <AuthContext> */}

    <Provider store={store}>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </Provider>

    {/* </AuthContext> */}
  </React.StrictMode>
);
