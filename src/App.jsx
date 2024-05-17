import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretSquareUp,
  faCaretSquareDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Admin from "./Admin";
import Customer from "./Customer";

library.add(faCaretSquareUp, faCaretSquareDown, faClose);

function App() {
  return (
    <div>
      <React.Fragment>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <React.Fragment>
          <Header />
          <Routes>
            <Route path="admin/*" element={<Admin />} />
            <Route path="Home/*" element={<Customer />} />
          </Routes>
          <Footer />
        </React.Fragment>
      </React.Fragment>
    </div>
  );
}

export default App;
