import Header from "./compotents/Header/Header";
import MyExchanges from "./compotents/MyExchanges/MyExchanges";
import MyVinyls from "./compotents/MyVinyls/MyVinyls";
import VinylSelect from "./compotents/VinylSelect/VinylSelect";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ErrorSite from "./compotents/ErrorSite/ErrorSite";
import Register from "./compotents/Register/Register";
import { useEffect } from "react";

const TokenHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const uriToken = urlParams.get("token");
    if (uriToken) {
      localStorage.setItem("aToken", uriToken);
      console.log(
        "Token stored in localStorage:",
        localStorage.getItem("aToken")
      );
    }
    if (localStorage.getItem("aToken")) {
      console.log(
        "Token stored in localStorage:",
        localStorage.getItem("aToken")
      );
    } else {
      console.log("No aToken in storage");
    }
    if (localStorage.getItem("expiresIn")) {
      console.log(
        "ExpiresIn stored in localStorage:",
        localStorage.getItem("expiresIn")
      );
    } else {
      console.log("No expiresIn in storage");
    }
  }, [location.search]);

  return null;
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <TokenHandler></TokenHandler>
        <div>
          <Routes>
            <Route path="/" element={<VinylSelect />} />
            <Route path="/my-vinyls" element={<MyVinyls />} />
            <Route path="/my-exchanges" element={<MyExchanges />} />
            <Route path="*" element={<ErrorSite />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
