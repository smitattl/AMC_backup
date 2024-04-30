import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";

import store, { persistor } from "./store";

import App from "./App";

const root = createRoot(document.getElementById("root"));

function Root() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  );
}

root.render(<Root />);
