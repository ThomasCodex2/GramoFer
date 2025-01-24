import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("aToken")
  );
  const location = useLocation();
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("aToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    const token = localStorage.getItem("aToken");
    setIsLoggedIn(!!token);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem("aToken");
    if (localStorage.getItem("expiresIn")) {
      localStorage.removeItem("expiresIn");
    }
    setIsLoggedIn(false);
    alert("You have been logged out.");
    navigate("/");
  };
  const notify_test = false;
  return (
    <div className={styles.header}>
      <div className={[styles.row].join(" ")}>
        <img
          src="/images/logo_reversed_no_bg.png"
          alt=""
          className={styles.logo}
        />
      </div>

      <div className={styles.temp}></div>
      <div className={[styles.row, styles.site_links].join(" ")}>
        <div className={styles.link_contain}>
          <Link to="/" className={styles.link}>
            <h3>Offers</h3>
          </Link>
        </div>
        <div className={styles.link_contain}>
          <Link
            to={isLoggedIn ? "/my-vinyls" : "#"}
            className={`${styles.link} ${!isLoggedIn ? styles.disabled : ""}`}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("You need to log in to access my vinyls.");
              }
            }}
          >
            <h3>My Vinyls</h3>
            {notify_test && <div className={styles.notify}></div>}
          </Link>
        </div>
        <div className={styles.link_contain}>
          <Link
            to={isLoggedIn ? "/my-exchanges" : "#"}
            className={`${styles.link} ${!isLoggedIn ? styles.disabled : ""}`}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("You need to log in to access your exchanges.");
              }
            }}
          >
            <h3>My Exchanges</h3>
            {notify_test && <div className={styles.notify}></div>}
          </Link>
        </div>
        <div className={styles.link_contain}>
          <Link
            to={isLoggedIn ? "/my-wishlist" : "#"}
            className={`${styles.link} ${!isLoggedIn ? styles.disabled : ""}`}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("You need to log in to access your wishlist.");
              }
            }}
          >
            <h3>My Wishlist</h3>
            {notify_test && <div className={styles.notify}></div>}
          </Link>
        </div>
        <div className={styles.google_btn}>
          {isLoggedIn ? (
            <button className={styles.reg_btn} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/register" className={styles.link}>
              <button className={styles.reg_btn}>Register / Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
