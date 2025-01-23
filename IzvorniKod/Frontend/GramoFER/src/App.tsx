import Header from "./compotents/Header/Header";
import MyExchanges from "./compotents/MyExchanges/MyExchanges";
import MyVinyls from "./compotents/MyVinyls/MyVinyls";
import VinylSelect from "./compotents/VinylSelect/VinylSelect";
import AdminSite from "./compotents/AdminSite/AdminSite";
import ErrorSite from "./compotents/ErrorSite/ErrorSite";
import Register from "./compotents/Register/Register";
import MyWishlist from "./compotents/MyWishlist/MyWishlist";
import ExchangeSite from "./compotents/ExchangeSite/ExchangeSite";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

const TokenHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const uriToken = urlParams.get("token");
    if (uriToken) {
      localStorage.setItem("aToken", uriToken);
      const expiresIn = urlParams.get("expiresIn");
      if (expiresIn) {
        localStorage.setItem("expiresIn", expiresIn.toString());
      }
      const isAdmin = urlParams.get("isAdmin");
      if (isAdmin) {
        localStorage.setItem("isAdmin", isAdmin);
      }
    }
    console.log("isAdmin variable: " + localStorage.getItem("isAdmin"));

    if (localStorage.getItem("aToken")) {
      console.log(
        "aToken stored in localStorage:",
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
    navigate("/");
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
            <Route path="/vinyl/:vinylId" element={<VinylSelect />} />
            <Route path="/my-vinyls" element={<MyVinyls />} />
            <Route path="/my-exchanges" element={<MyExchanges />} />
            <Route path="*" element={<ErrorSite />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-site" element={<AdminSite />} />
            <Route path="/my-wishlist" element={<MyWishlist />} />
            <Route path="/exchange-site" element={<ExchangeSite />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
