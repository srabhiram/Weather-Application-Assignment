import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <div className="bg-gradient-to-r  from-blue-200 to-blue-300 h-screen">
        <App />
      </div>
    </React.StrictMode>
  </Provider>
);
