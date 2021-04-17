import "./App.css";
import withTheme from "./Theme";
import NavBar from "./components/navbar/SimpleTabs";
import CustomRouter from "./Router";
import Footer from "./components/footer/Footer";
import { Provider } from "./AppContext";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <Provider>
      <HashRouter basename="/">
        <NavBar />
        <CustomRouter />
        <Footer />
      </HashRouter>
    </Provider>
  );
}

export default withTheme(App);
