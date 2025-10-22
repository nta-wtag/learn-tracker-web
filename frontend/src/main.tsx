import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux-toolkit/store"; 
import "./index.css";
import RouteComponent from "./RouteComponent";
import AppInitializer from "components/base-components/AppInitializer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppInitializer>
        <BrowserRouter>
          <RouteComponent />
        </BrowserRouter>
      </AppInitializer>
    </Provider>
  </React.StrictMode>
);
