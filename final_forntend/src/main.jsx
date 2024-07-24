import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { Provider } from 'react-redux';
import store from "./store";
import "./css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <App />
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
