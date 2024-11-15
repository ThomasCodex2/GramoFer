import Header from "./compotents/Header/Header";
import MyExchanges from "./compotents/MyExchanges/MyExchanges";
import MyVinyls from "./compotents/MyVinyls/MyVinyls";
import VinylSelect from "./compotents/VinylSelect/VinylSelect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorSite from "./compotents/ErrorSite/ErrorSite";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<VinylSelect />} />
            <Route path="/my-vinyls" element={<MyVinyls />} />
            <Route path="/my-exchanges" element={<MyExchanges />} />
            <Route path="*" element={<ErrorSite />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
