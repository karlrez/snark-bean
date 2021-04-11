import React from "react";
import "./App.css";
import withTheme from "./Theme";
import NavBar from "./components/navbar/SimpleTabs";
import CustomRouter from "./Router";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./AppContext";

function App() {
  return (
    <Provider>
      <Router>
        <NavBar />
        <CustomRouter />
        <Footer />
      </Router>
    </Provider>
  );
}

export default withTheme(App);
